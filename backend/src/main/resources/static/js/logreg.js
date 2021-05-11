//忘记密码切换
$('.forget').click(function () {
	$('.logreg-box').hide();
	$('.regist-box').show();
	$('.regist').hide();
	$('.newpass').hide();
	$('.forgetbox').show();
	$('title').text('小贝壳找回密码');
});
//注册切换
$('.reg-tip>a').click(function(){
	$('.reg-tip').hide();
	$('.log-tip').show();
	$('.login-go').show();
	$('.regin-go').hide();
	$('title').text('小贝壳注册');
});
//登录切换
$('.log-tip>a').click(function(){
	$('.log-tip').hide();
	$('.reg-tip').show();
	$('.login-go').hide();
	$('.regin-go').show();
	$('title').text('小贝壳登录');
});
//手机号验证
$('.reggo').click(function () {
	var pnum=$('.phonecode').val().trim();
	if(pnum=="")return layer.msg('请输入手机号');
	if(!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(pnum))return layer.msg('请输入正确的手机号');
	axios.post(Rephone,{
		name:pnum
	}).then( resp=>{
		if(resp.data>0)return layer.msg('账号已存在，请重新输入');
		$('.phcodeo').attr('phone',pnum);
		$('.logreg-box').hide();
		$('.regist-box').show();
		$('.regist').show();
		$('.newpass').hide();
		$('.forgetbox').hide();
		$('title').text('小贝壳注册');
	});
});
//获取短信验证码
$('.phcodeo').click(function () {
	var pnum=$(this).attr('phone');
	axios.post(Reginphone,{
		name:pnum
	}).then( resp=>{
		console.log(resp.data.showapi_res_body.remark)
		console.log(resp.data.showapi_res_body.ret_code)
		if(resp.data.showapi_res_body.ret_code==0){
			$(this).attr('disabled',true)
			var a=60;
			var b='秒后重新获取'
			$(this).text('')
			$(this).append(a)
			$(this).append(b)
			var overo=setInterval(()=>{
				$(this).text('')
				a-=1
				$(this).append(a)
				$(this).append(b)
				if(a===0){
					clearInterval(overo)
					$(this).text('')
					$(this).attr('disabled',false)
					$(this).append('重新获取验证码')
				}
			},1000)
		}
	}).catch( err=>{

	});
});
$('.loginpass').focus(function () {
	$(window).keydown(function (e) {
		if(e.keyCode==13){
			$('.loggo').click()
		}
	})
})

//用户注册
$('.reg-ok').click(function () {
	$('.orr').empty();
	var pass=$('.regpass').val().trim(),pass1=$('.passok').val().trim(),name=$('.regname').val().trim(),code=$('.pcodeok').val().trim(),phone=$('.phcodeo').attr('phone');
	//密码正则：
	var reg= /^((?=.*\d)(?=.*[a-z]))|((?=.*\d)(?=.*[A-Z]))|((?=.*\d)(?=.*_))|((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*_))|((?=.*[A-Z])(?=.*_))\w{6,}$/
	if(name=='')return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>请输入你的名号！');
	if(pass=='')return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>请输入你的密码！');
	if(pass.length<7)return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>密码必须大等于7位！');
	if(!reg.test(pass))return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>密码须包含字母，数字，下划线中两种或以上！');
	if(pass1=='')return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>请输入确认密码！');
	if(pass!=pass1)return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>两次密码不相同！');
	if(code=='')return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>请输入短信验证码！');
	axios.post(Recode,{
		code:code,
		name:name,
		pass:pass,
		phone:phone
	}).then(resp=>{
		if(resp.data==2)return $('.orr').append('<span class="glyphicon glyphicon-remove-sign"></span>请输入正确验证码！');
		if(resp.data==1){
			$(this).attr('disabled',true)
			var a=layer.load(1)
			setTimeout( ()=> {
				layer.close(a)
				layer.msg('注册成功')

			},700)
			setTimeout( ()=> {
				$('.regpass').val("")
				$('.passok').val("")
				$('.regname').val("")
				$('.pcodeok').val("")
				$('.phcodeo').attr('phone','')
			},1300)
			setTimeout( ()=> {
				$(this).attr('disabled',false)
				$('.regist-box').hide()
				$('.logreg-box').show()
				$('title').text('小贝壳找回密码');
			},1400)
		}
	})
});
//找回手机，发送验证码
$('.forget-ok').click(function () {
	var pnum=$('.uphone').val().trim();
	if(pnum=="")return layer.msg('请输入手机号');
	if(!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(pnum))return layer.msg('请输入正确的手机号');
	axios.post(Rephone,{
		name:pnum
	}).then( resp=>{
		if(resp.data==0)return layer.msg('该手机号未注册！');
		axios.post(Reginphone,{
			name:pnum
		}).then( resp=>{
			if(resp.data==2)return layer.msg('请不要频繁请求验证码，一分钟后再试！')
			$('.uphone').val("")
			$('.againm').attr('phone',pnum)
			$('.logreg-box').hide();
			$('.regist-box').show();
			$('.regist').hide();
			$('.newpass').show();
			$('.forgetbox').hide();
			$('title').text('小贝壳找回密码');
		});
	});
});
//找回密码，重发验证码
$('.againm').click(function () {
	$('.logreg-box').hide();
	$('.regist-box').show();
	$('.regist').hide();
	$('.newpass').hide();
	$('.forgetbox').show();
	$('title').text('小贝壳找回密码');
});
//找回密码成功
$('.new-ok').click(function () {
	var pass=$('.usernewpass').val().trim(),pass1=$('.passag').val().trim(),code=$('.newcode').val().trim(),phone=$('.againm').attr('phone');
	//密码正则：
	var reg= /^((?=.*\d)(?=.*[a-z]))|((?=.*\d)(?=.*[A-Z]))|((?=.*\d)(?=.*_))|((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*_))|((?=.*[A-Z])(?=.*_))\w{6,}$/;
	if(pass=='')return layer.msg('请输入新的密码！');
	if(pass.length<7)return layer.msg('密码必须大等于7位！');
	if(!reg.test(pass))return layer.msg('密码须包含字母，数字，下划线中两种或以上！');
	if(pass1=='')return layer.msg('请输入确认密码！');
	if(pass!=pass1)return layer.msg('两次密码不相同！');
	if(code=='')return layer.msg('请输入短信验证码！');
	axios.post(Repass,{
		pass:pass,
		code:code,
		phone:phone
	}).then(resp=>{
		if(resp.data!=1)return layer.msg('密码格式不正确或者验证码错误，超时失效，请重新获取输入！');
		// if(resp.data==3)return layer.msg('验证码超时失效，请重新获取！');
		// if(resp.data==2)return layer.msg('请输入正确验证码！');
		if(resp.data==1){
			layer.open({
				title: '找回密码'
				,content: '找回密码成功，请记住你的新密码:'+pass+'！'
			});
			$('.usernewpass').val("");
			$('.passag').val("");
			$('.newcode').val("");
			$('.againm').attr('phone','');
			$('.logreg-box').show();
			$('.regist-box').hide();
		}
	})
});
//登录功能

$('.loggo').click(function () {
	var phone=$('.userphone').val().trim(),pass=$('.loginpass').val().trim();
	if(phone=='')return layer.msg('请输入您的手机号！');
	if(pass=='')return layer.msg('请输入您的登录密码！');
	axios.post(Login,{
		phone:phone,
		pass:pass
	}).then(resp=>{
		console.log(resp)
		if(resp.data.length===0)return layer.msg('手机号或密码错误！');
		if(resp.data.length===1){
			if(resp.data[0].userzt=='锁定')return layer.msg('您的账号已被封，请联系客服！！')
			location.href=error
		}
		console.log(resp.data)
	})
})
