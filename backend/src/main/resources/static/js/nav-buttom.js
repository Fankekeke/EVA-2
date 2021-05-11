Vue.component('vue-nav',{
	props:['idx'],
	template:`	<nav class="navbar navbar-default">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="`+NindexUrl+`"><img src="`+STATIC+`/images/header-sprites3.png" class="logo" /></a>
		</div>
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav navcen">
				<li :class="idx==1 ? 'active1' : '' " >
					<a href="`+NindexImgUrl+`">首页</a>
				</li>
				<li :class="idx==2 ? 'active1' : '' ">
					<a href="`+NdestinationUrl+`">目的地</a>
				</li>
				<li :class="idx==3 ? 'active1' : '' ">
					<a href="`+Ntravel_listsUrl+`">旅游游记</a>
				</li>
				<li :class="idx==4 ? 'active1' : '' ">
					<a href="`+NgoodsUrl+`">自由行</a>
				</li>
				<li :class="idx==5 ? 'active1' : '' ">
					<a href="`+NhotelUrl+`" style="position: relative;">订酒店<span class="badge">十一特价</span></a>
				</li>
				<!--仅首页-->
				<li class="busentry">
					<a  href="`+NsalesshowUrl+`">商家入驻</a>
				</li>
				<li class="busplatform" style="display: none;cursor: pointer">
					<a  href="`+Nplatformshow+`">商家平台</a>
				</li>
				<li class="Dividingline1"><span></span></li>
			</ul>
			<!--游客显示-->
			<ul class="nav navbar-nav navbar-right loginout">
						  <li class="qqlogin"><a><img class="img" src="`+STATIC+`/images/qq1.png" /><img class="img1" src="`+STATIC+`/images/qq2.png" /></a></li>

				  <li><a href="`+NloginshowUrl+`">登录</a></li>
				  <li class="Dividingline"><span></span></li>
				<li><a href="`+Nreginshow+`">注册</a></li>
			  </ul>
			<!--登录后显示-->
			<ul class="nav navbar-nav loginse  navbar-right">
				<li>
					<a>
						<button class="btn btn-primary daka">打卡</button>
						<!--打卡成功-->
						<button style="display: none;" class="btn btn-primary daka">已打卡</button>
					</a>
				</li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-bell"></span>消息<span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li>
							<a href="#">私信</a>
						</li>
						<li>
							<a href="#">系统通知</a>
						</li>
						<li>
							<a href="#">回复消息</a>
						</li>
						<li>
							<a href="`+NcenterUrl+`">喜欢与收藏</a>
						</li>
						<li>
							<a href="#">好友动态</a>
						</li>
					</ul>
				</li>
				<li class="dropdown user">
					<a title="头像" href="`+NcenterUrl+`" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
						<img class="logimg" src="" /><span class="caret"></span>
					</a>
					<ul class="dropdown-menu">
						<li class="user-m"><span style="color: #fff;"><a>蜂蜜&nbsp; 0</a>&nbsp;/&nbsp;<a>金币 &nbsp;0</a></span></li>
						<li>
							<a href="`+NcenterUrl+`"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;我的小贝壳</a>
						</li>
						<li>
							<a href="`+NtravelnotesUrl+`"><span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;写游记</a>
						</li>
						<li>
							<a href="`+NcenterUrl+`"><span class="glyphicon glyphicon-flag"></span>&nbsp;&nbsp;我的足迹</a>
						</li>
						<li>
							<a href="`+NcenterUrl+`"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;我的好友</a>
						</li>
						<li>
							<a href="`+NcenterUrl+`"><span class="glyphicon glyphicon-heart"></span>&nbsp;&nbsp;我的收藏</a>
						</li>
						<li>
							<a href="`+NcenterUrl+`"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;我的订单</a>
						</li>
						<li class="goout" style="cursor: pointer">
							<a><span class="glyphicon glyphicon-log-out "></span>&nbsp;&nbsp;退出</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container -->
</nav>`
});
Vue.component('vue-bottom',{
	template:`<footer>
			<div class="container1">
				<div class="phone">
					<ul>
						<li>用户反馈</li>
						<li>加入我们</li>
						<li>注销退出</li>
					</ul>
					<p>© 2019 Mafengwo.cn 京ICP备11015476号 </p>
					<p>北京蚂蜂窝网络科技有限公司 &nbsp;&nbsp;企业营业执照</p>
					<p>马蜂窝客服：+86-10-8341-6888</p>
				</div>
				<div class="comput">
					<dl class="ft-info f-left">
				        <dt>马蜂窝旅游网</dt>
				        <dd>中国年轻一代用得更多的旅游网站</dd>
				        <dd>上亿旅行者共同打造的<strong>"旅行神器"</strong></dd>
				        <dd><strong>60,000</strong> 多个全球旅游目的地</dd>
				        <dd><strong>600,000</strong> 个细分目的地新玩法</dd>
				        <dd><strong>760,000,000</strong> 次攻略下载</dd>
				        <dd><strong>38,000</strong> 家旅游产品供应商</dd>
				    </dl>
					<dl class="ft-info f-center">
				        <dt>关于我们</dt>
				        <dd><a >关于马蜂窝</a> &nbsp; &nbsp;<a >联系我们</a></dd>
				        <dd><a >隐私政策</a> &nbsp; &nbsp;<a >商标声明</a></dd>
				        <dd><a >服务协议</a> &nbsp; &nbsp;<a >游记协议</a></dd>
				        <dd><a >商城平台服务协议</a></dd>
				        <dd><a >网络信息侵权通知指引</a></dd>
				        <dd style="white-space: nowrap;"><a >马蜂窝旅游网服务监督员</a></dd>
				        <dd><a >网站地图</a> &nbsp; &nbsp;<a style="color: #ff9d00;">加入马蜂窝</a></dd>
				    </dl>
				    <dl class="ft-info f-right">
				        <dt style="text-align: center;">旅行服务</dt>
				        <dd>
				            <ul class="clearfix">
				                <li><a >旅游攻略</a></li>
				                <li><a >酒店预订</a></li>
				                <li><a >旅游特价</a></li>
				                <li><a >国际租车</a></li>
				                <li><a >旅游问答</a></li>
				                <li><a >旅游保险</a></li>
				                <li><a >旅游指南</a></li>
				                <li><a >订火车票</a></li>
				                <li><a >旅游资讯</a></li>
				                <li><a >APP下载</a></li>
				                <li style="width: 120px;"><a style="color: #ff9d00;">旅行商城全球商家入驻</a></li>
				            </ul>
				        </dd>
				    </dl>
				    <dl class="ft-info f-img">
				        <dd>
				            <span></span>
				            <img src="`+STATIC+`/images/footrer/mfwapp.png" />
				            <p>马蜂窝良品<br>官方服务号</p>
				        </dd>
				        <dd>
				            <span></span>
				            <img src="`+STATIC+`/images/footrer/mfwapp.png" />
				            <p>马蜂窝旅游<br>订阅号</p>
				        </dd>
				        <dd>
				            <span></span>
				            <img src="`+STATIC+`/images/footrer/mfwapp.png" />
				            <p>马蜂窝APP<br>扫描立即下载</p>
				        </dd>
				    </dl>
				    <dl class="ft-info-b">
				        <dt>旅游之前，先上马蜂窝！</dt>
				        <dd>
				            <img src="`+STATIC+`/images/footrer/weibo1.png"/>
				            <img src="`+STATIC+`/images/footrer/weibo.png"/>
				            <img src="`+STATIC+`/images/footrer/kj.png"/>
				        </dd>
				    </dl>
				    <div class="ft-links">
					    <a>马可波罗</a><a>Onlylady女人志</a><a>艺龙旅游指南</a><a>欣欣旅游网</a><a>户外运动</a><a>365音乐网</a>
					    <a>爱问共享资料</a><a>旅游网</a><a>小说网</a><a>学习啦</a><a>游多多自助游</a><a>问答</a><a>火车时刻表</a>
					    <a>驴妈妈旅游网</a><a>好豆美食网</a><a>二手车</a><a>绿野户外</a><a>途牛旅游网</a><a>图吧</a>
					    <a>SUV联合越野</a><a>手机浏览器</a><a>上海地图</a><a>天气预报查询</a><a>同程旅游</a><a>火车票</a>
					    <a>马蜂窝大学</a><a>马尔代夫旅游</a><a>YunOS</a><a>携程旅游</a><a>锦江旅游</a><a>火车时刻表</a><a>TripAdvisor</a>
					    <a>天巡网</a><a>短租房</a><a>租租车</a><a>五分旅游网</a><a>酒店预订</a><a>爱旅行网</a><a>旅游</a><a>旅游网</a>
					    <a>wed114结婚网</a><a>车讯网</a><a>遨游旅游网</a><a>手机</a><a>更多友情链接&gt;&gt;</a>
					</div>
					<div class="ft-copy">
					    <img style="float: left;margin:5px 20px 0 0;" src="`+STATIC+`/images/footrer/footmfw.png" />
					    <p>© 2019 Mafengwo.cn
					        <a>京ICP备11015476号</a>
					        <a><img src="`+STATIC+`/images/footrer/police_record.png">京公网安备11010502013401号</a>
					        <a>京ICP证110318号</a>
					        <span>违法和不良信息举报电话: 010-83416877 举报邮箱: mfwjubao@mafengwo.com</span>
					    </p>
					    <p>
					        <a>网络出版服务许可证</a>
					        <a>增值电信业务经营许可证</a>
					        <a>营业执照</a>
					        <a>广播电视节目制作经营许可证</a>
					        <a>帮助中心</a>
					        <span class="m_l_10">马蜂窝客服：国内</span><span class="highlight">4006-345-678</span>
					        <span class="m_l_10">海外</span> <span class="highlight">+86-10-8341-6888</span>
					    </p>
					</div>
					<div class="f-imgae" style="text-align: center;">
					    <a><img src="`+STATIC+`/images/footrer/footkx.png"/></a>
					    <a><img src="`+STATIC+`/images/footrer/footcx.png"/></a>
					    <a><img src="`+STATIC+`/images/footrer/footwx.png"/></a>
					    <a><img src="`+STATIC+`/images/footrer/footwxrz.png"/></a>
					</div>
				</div>
					
			</div>
		</footer>`
});
const Loginok = '/lvyou/public/index.php/index/index/login';
const img ='/lvyou/public/static'
function login(){
			document.getElementsByClassName("loginout")[0].style.display="none";
			document.getElementsByClassName("loginse")[0].style.display="block";
		}
function tuichu(){
	document.getElementsByClassName("loginout")[0].style.display="block";
	document.getElementsByClassName("loginse")[0].style.display="none";
}



$('.qqlogin').click(function () {
	var A=window.open("{:url('index/Login/qqlogin')}");
})
$(function () {
	axios.post(Loginok).then(resp=>{
		if(resp.data!==0){
			$('.loginse').show()
			$('.loginout').hide()
			$('.logimg')[0].src=img+resp.data.log.userhimg
		
			if(resp.data.bus.businstatus!='审核中'){
				$('.busplatform').show()
				$('.busentry').hide()
			}
		}
	})
})
	setTimeout(function () {
		$('.load').fadeOut('slow');
	},800)

$('.goout').click(function () {
	layer.open({
		title:"小贝壳提示"
		,content: '是否退出'
		,btn: ['确认', '取消']
		,yes: function(index, layero){
			axios.post(Logingetout).then(resp=>{
				if(resp.data==0)return location.reload()
			})
			layer.close(index);
		}
	});
})


$('.qqlogin').click(function () {
	var childWindow = window.open('{:url("loginlogin")}',"TencentLogin");
})