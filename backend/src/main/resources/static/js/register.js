/**
 * Created by F117 on 2019/1/23.
 */
$(".login-btn").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var verify = $("#verify").val();

});
var isEmail=false;
var isPhone=false;

var addressSuc=false;
var userSuc=false;
var passSuc=false;
var codeSuc=false;
var idcard=false;


/*根据用户输入的手机号码或邮箱发送验证码   前提：手机号码或邮箱地址不能重复或错误*/
$("#verifyCode-saber").on("click","#verifyCode",function(){
    /*发送手机验证码*/
    if(isPhone==true){
        wait();
        var params = {userName:$("#email").val()};  //参数，注意参数名要注意和后台方法参数名要一致
        $(function(){
                $.ajax({
                    type:"GET",  //请求方式
                    url:"sendSms",  //请求路径：页面/方法名字
                    data: params,     //参数
                    dataType:"text",
                    contentType:"application/json; charset=utf-8",
                    beforeSend:function(XMLHttpRequest){
                        $(".sub-title").text("正在发送验证码,请等待");
                    },
                    success:function(msg){  //成功
                        if(msg=="missnum"){
                            $(".sub-title").text("您所输入的验证码不正确");
                        }else{
                            $(".sub-title").text("送信完了");
                        }
                    },
                    error:function(obj, msg, e){   //异常
                        $(".sub-title").text("服务器正忙 请稍后再试");
                    }
                });
        });
    }
    /*发送邮箱验证码*/
    if(isEmail==true){
        var params = {userName:$("#email").val()};  //参数，注意参数名要注意和后台方法参数名要一致
        wait();
        $(function(){
                $.ajax({
                    type:"GET",  //请求方式
                    url:"/web/sendEmail",  //请求路径：页面/方法名字
                    data: params,     //参数
                    dataType:"text",
                    contentType:"application/json; charset=utf-8",
                    beforeSend:function(XMLHttpRequest){
                        $(".sub-title").text("正在发送验证码,请等待");
                    },
                    success:function(msg){  //成功
                        $(".sub-title").text("送信完了");
                    },
                    error:function(obj, msg, e){   //异常
                        $(".sub-title").text("服务器正忙 请稍后再试");
                    }
                });
        });
    }
    if(isEmail==false && isPhone==false){
        $(".sub-title").html("阿勒 邮箱地址错误");
    }

});

$("#button").click(function(){
    register();
});

/*根据用户输入的手机号码或邮箱判断是否重复或错误*/
$("#email").blur(function(){
    var strEmail=pattern.test($("#email").val());
    if(strEmail==true){
        isEmail=true;
    }
    var strPhone=isPoneAvailable($("#email").val());
    if(strPhone==true){
        isPhone=true;
    }
});

/*根据用户输入的用户名判断是否重复或错误*/
$("#user").blur(function(){

});

/*判断是否为手机号码*/
function isPoneAvailable($poneInput) {
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test($poneInput)) {
        return false;
    } else {
        return true;
    }
}

/*判断是否为邮箱地址*/
var pattern= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

/*一切完成准备注册*/
function register() {
    if(idcard==true){
        if($("#verify").val()!=""){
            var form = document.getElementById('register-form');
            //再次修改input内容
            form.submit();
        }else{
            $(".sub-title").html("阿勒 请填写验证码");
        }

    }else{
        $(".sub-title").html("阿勒 请全部写完整");
    }
}

   function wait() {
       //定时执行
       var t1=window.setInterval(refreshCount, 1000);
       var wait=60;
       //循环执行，每隔1秒钟执行一次 1000
       function refreshCount() {
           wait--;
           if(wait>1){
               $("#verifyCode-saber").html('<a style="width:30%;font-size: 12px;color: #0f88eb">'+wait+'秒后可重发</a>');
           }else{
               window.clearInterval(t1);
               $("#verifyCode-saber").html('<a href="#" style="width:30%;font-size: 12px;color: #0f88eb" id="verifyCode">获取验证码</a>');
           }
       }
   }

// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
// 详情查看javascript的数值范围
function checkIDCard(idcode){
    // 加权因子
    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    // 校验码
    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];

    var code = idcode + "";
    var last = idcode[17];//最后一个

    var seventeen = code.substring(0,17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for(var i = 0; i < len; i++){
        num = num + arr[i] * weight_factor[i];
    }

    // 获取余数
    var resisue = num%11;
    var last_no = check_code[resisue];

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    var format = idcard_patter.test(idcode);

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format ? true : false;
}

$("#password1").blur(function(){
    if(!checkIDCard($("#password1").val())){
        $(".sub-title").html("身份证号码不对");
    }else{
        idcard=true;
    }
});

