ws = new WebSocket("ws://120.76.131.127:8282");
ws.onopen = function() {
	remove();
	console.log("连接成功");
};
ws.onmessage = function(e) {
	var received = e.data;
	var msg = JSON.parse(received);
//	console.log(msg);
	switch(msg.type){
		case 'init':
			var bild = '{"type":"bild","formid":"'+formid+'","typeid":"userid"}';
			ws.send(bild);	
			get_head(formid,touid);
			get_name(touid);
			message_load();
			get_lists(formid);
			var online = '{"type":"online","touid":"'+touid+'","formid":"'+formid+'"}';
			ws.send(online);
			break;
		case "text":
			$(".right_content").html(" ");
			get_lists(formid);
			console.log(msg);
			if(touid == msg.formid){
				var left_msg = '<div>'+'<img src="'+sta+touidimg+'"/>'+msg.data+'</div>';
				$('.msg_left').append(left_msg);
			}
			break;
		case "save":
			save_message(msg);
			if(msg.isread == 1){
				var msg ='在线';
				online=1;
				$(".left_top_online").text(msg);
			}else{
				var msg ='不在线';
				online=0;
				$(".left_top_online").text(msg);
			}
			break;
		case "online":
			if(msg.status == 1){
				var msg ='在线';
				online=1;
				$(".left_top_online").text(msg);
			}else{
				var msg ='不在线';
				online=0;
				$(".left_top_online").text(msg);
			}
			break;
	}
} 
//获取用户ID或者商家ID一对多聊天
function Send(){
	//console.log(formidimg);
    var msg = $('#textarea').html();
    var data = '{"data":"'+msg+'","type":"say","formid":"'+formid+'","touid":"'+touid+'"}';
    	var right_msg = '<div  class="right101">'+'<img src="'+sta+formidimg+'"/>'+msg+'</div>';
    $('.msg_right').append(right_msg);
   ws.send(data);
  $('#textarea').html(" ");
}
//发送到后台进行聊天长连接
function save_message(msg){
	console.log(msg);
	var data={"msg":msg};
	console.log(data);
	$.ajax({
		type:"post",
		url:save_messageUrl,
		dataType:"json",
		data:data,
		success:function(res){
			console.log("成功");
		},
		error:function(){
		//	console.log("长连接错误");
		}
	});
}
//获取头像
function get_head(formid,touid){
	var formid=formid;
	var touid= touid;
	$.post(
		headUrl,
		{'formid':formid,'touid':touid},
		function(e){
			//console.log(e);
			formidimg = e.formidimg;
			console.log(formidimg);
			touidimg = e.touidimg;
			console.log(touidimg);
		},'json'
	);
}
//获取昵称
function get_name(touid){
	$.post(
		get_nameUrl,
		{'touid':touid},
		function(e){
			//console.log(e);
			touidName = e.touidName;
			if(touidName){
				var msg = '<span>'+'与'+touidName+'聊天中'+'</span>';
				$(".left_top_text").append(msg);
			}
		},'json'
	);
}
//显示聊天记录
function message_load(){
	$.post(
		messageUrl,
		{'formid':formid,'touid':touid},
		function(e){
			$.each(e, function(index,val) {
				if(formid == val.fromid){
				var left_msg = '<div >'+'<img src="'+sta+formidimg+'"/>'+val.content+'</div>';
				$('.msg_right').append(left_msg);
			}else {
				var right_msg = '<div >'+'<img src="'+sta+touidimg+'"/>'+val.content+'</div>';
    			$('.msg_left').append(right_msg);
			}
			});
		},'json'
	);
}
//发送图片
$(".image_up").click(function(){
	$("#file").click();
});
$("#file").change(function(){
	formdata = new FormData();
	formdata.append('formid',formid);
	formdata.append('touid',touid);
	formdata.append("online",online);
	formdata.append("file",$("#file")[0].files[0]);
	$.ajax({
		type:"post",
		url:uploadimgUrl,
		dataType:"json",
		data:formdata,
		cache:false,
		processData:false,
		contentType:false,
		success:function(res){
			if(res.status=="ok"){
				var right_msg = '<div  class="right101">'+'<img src="/lvyou/public/static'+formidimg+'"/>'+'<img src="/lvyou/public/static'+res.img_name+'">'+'</div>';
    			$('.msg_right').append(right_msg);
			}else{
				console.log(res.status)
			}
		},
		error:function(){
			console.log("错误");
		}
	});
});

//聊天列表加载
function get_lists(formid){
	$.post(
       get_listsUrl,
        {id:formid},
        function(res){
         //   console.log(res);
             $.each(res,function(index,content){
			//	 console.log(content);
//         	console.log(content.touid);
//         	console.log(content.formid);
//         	var toid = content.last_message.formid;
//         	var fromid = content.last_message.content.toid;
                    if(content.countNoread==0){
             			$(".right_content").append('<p onclick=redi('+content.formid+')><img src="/svnrepos/public/static'+content.head_url+'"/><span class=" t-28">'+'平台客服'+'</span><span ></span><br/><span class="time">'+mydate(content.last_message.startTime)+'</span></p>');
                    }else{
             			$(".right_content").append('<p onclick=redi('+content.formid+')><img src="/svnrepos/public/static'+content.head_url+'"/><span class=" t-28">'+'平台客服'+'</span><span ></span><br/><span class="time">'+mydate(content.last_message.startTime)+'</span></p>');
                    }

                })
        },'json'
    )	
}
 /**
     *根据时间戳格式化为日期形式
     */
function mydate(nS){
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}
function remove(){
	$(".msg_left div").remove();
	$(".msg_right div").remove();
	$(".right_content p").remove();
	$(".left_top_text span").remove();	
	
}

function redi(toid){
	console.log(toid);
	$(".msg_left div").remove();
	$(".msg_right div").remove();
	$(".right_content p").remove();
	$(".left_top_text span").remove();
	formid=formid;
//	console.log(formid)
	touid=toid;
//	console.log(touid);
	get_head(formid,touid);
	get_name(touid);
	message_load();
	get_lists(formid);
}

//关闭聊天框
function guanbi(){
	$("#chat").hide();
}

//页面一加载就显示QQ表情
//$(function(){
//	$('.emotion').qqFace({
//		assign:'saytext', 
//		path:'__STATIC__/qqFace/arclist/'	//表情存放的路径
//	});
//	$("#send").click(function(){
//		console.log(111);
//		var str = $("#saytext").val();
//		console.log(str);
//		$("#show").html(str);
//	});

//});

////QQ图片
////关闭QQ图片
//$(".x").click(function(){
//	$("#QQ").hide(500);
//});
////显示qq图片
//$(".QQimg").click(function(){
//	$("#QQ").show(500);
//});
////循环打印qq图片
// QQImage();
//function QQImage(){
//	for(var i=1;i<=75;i++){
////		$("#QQ").append(`<img src='imgqq/expression/${i}.gif'/>`);
//		var img ='<img src="__STATIC__/imgqq/expression/'+i+'.gif"/>';
////		console.log(img);
//		$("#QQ").append(img);
//	}
//	$("#QQ").on("click","img",function(){
////		console.log(123);
//		$("#textarea").append($(this).clone());
//	});	
//}