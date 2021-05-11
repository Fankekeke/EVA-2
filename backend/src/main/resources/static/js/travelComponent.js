//Vue.component('vue-nav',{
//	template:`<nav class="navbar navbar-default">
//			<div class="container">
//  			<div class="navbar-header">
//    				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
//				        <span class="icon-bar"></span>
//				        <span class="icon-bar"></span>
//				        <span class="icon-bar"></span>
//				    </button>
//    				<a class="navbar-brand" href="#"><img src='/lvyou/public/static/images/header-sprites3.png' class="logo" /></a>
//  			</div>
//  			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//    				<ul class="nav navbar-nav navcen">
//				        <li class="active1"><a href="#">首页</a></li>
//				        <li><a href="#">目的地</a></li>
//				        <li><a href="#">旅游攻略</a></li>
//				        <li class="dropdown">
//        					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">去旅行 <span class="caret"></span></a>
//        					<ul class="dropdown-menu">
//					            <li><a href="#">自由行</a></li>
//					            <li><a href="#">跟团游</a></li>
//					            <li><a href="#">当地游</a></li>
//					            <li><a href="#">游轮</a></li>
//					            <li><a href="#">签证</a></li>
//					        </ul>
//      				</li>
//				        <li><a href="#" style="position: relative;">机票<span class="badge">十一特价</span></a></li>
//				        <li><a href="#">订酒店</a></li>
//      				<li class="dropdown">
//          				<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">社区 <span class="caret"></span></a>
//        					<ul class="dropdown-menu">
//					            <li><a href="#">问答</a></li>
//					            <li><a href="#">周边</a></li>
//					            <li><a href="#">俱乐部</a></li>
//        					</ul>
//      				</li>
//      				<!--仅首页-->
//      				<li><a href="#">APP</a></li>
//      				<li class="Dividingline1"><span></span></li>
//    				</ul>
//    				<!--游客显示-->
//    				<ul class="nav navbar-nav navbar-right loginout">
//    					<li>
//    						<ul>
//    							<li><a href="#"><img class="img" src="/lvyou/public/static/images/weibo1.png" /><img class="img1" src="/lvyou/public/static/images/weibo2.png" /></a></li>
//		      					<li><a href="#"><img class="img" src="/lvyou/public/static/images/qq1.png" /><img class="img1" src="/lvyou/public/static/images/qq2.png" /></a></li>
//		      					<li><a href="#"><img class="img" src="/lvyou/public/static/images/weixn1.png"/><img class="img1" src="/lvyou/public/static/images/wxin2.png" /></a></li>
//    						</ul>
//    					</li>
//    					<li onclick="login()"><a href="#">登录</a></li>
//    					<li class="Dividingline"><span></span></li>
//      				<li><a href="#">注册</a></li>
//    				</ul>
//    				<!--登录后显示-->
//    				<ul class="nav navbar-nav loginse  navbar-right">
//    					<li>
//    						<a>
//    							<button class="btn btn-primary daka">打卡</button>
//    						</a>
//    					</li>
//    					 <li class="dropdown">
//        					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-bell"></span>消息<span class="caret"></span></a>
//        					<ul class="dropdown-menu">
//					            <li><a href="#">私信</a></li>
//					            <li><a href="#">小组消息</a></li>
//					            <li><a href="#">系统通知</a></li>
//					            <li><a href="#">问答消息</a></li>
//					            <li><a href="#">回复消息</a></li>
//					            <li><a href="#">喜欢与收藏</a></li>
//					            <li><a href="#">好友动态</a></li>
//					        </ul>
//      				</li>
//    					<li class="dropdown user">
//    						<a  title="头像" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
//    							<img class="logimg" src="/lvyou/public/static/images/logimg.png" /><span class="caret"></span>
//    						</a>
//    						<ul class="dropdown-menu">
//    							<li class="user-m"><span style="color: #fff;"><a>蜂蜜&nbsp; 0</a>&nbsp;/&nbsp;<a>金币 &nbsp;0</a></span></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;我的马蜂窝</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-pencil"></span>&nbsp;&nbsp;写游记</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;预约游记</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-flag"></span>&nbsp;&nbsp;我的足迹</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-question-sign"></span>&nbsp;&nbsp;我的问答</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;我的好友</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-heart"></span>&nbsp;&nbsp;我的收藏</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-map-marker"></span>&nbsp;&nbsp;我的路线</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;我的订单</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-tags"></span>&nbsp;&nbsp;我的优惠券</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-book"></span>&nbsp;&nbsp;创作者开放平台</a></li>
//					            <li><a href="#"><span class="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;设置</a></li>
//					            <li onclick="tuichu()"><a href="#"><span class="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;退出</a></li>
//					        </ul>
//    					</li>
//    				</ul>
//			    </div><!-- /.navbar-collapse -->
//			</div><!-- /.container -->
//		</nav>`
//});
//Vue.component('vue-bottom',{
//	template:`<footer>
//			<div class="container1">
//				<div class="phone">
//					<ul>
//						<li>用户反馈</li>
//						<li>加入我们</li>
//						<li>注销退出</li>
//					</ul>
//					<p>© 2019 Mafengwo.cn 京ICP备11015476号 </p>
//					<p>北京蚂蜂窝网络科技有限公司 &nbsp;&nbsp;企业营业执照</p>
//					<p>马蜂窝客服：+86-10-8341-6888</p>
//				</div>
//				<div class="comput">
//					<dl class="ft-info f-left">
//				        <dt>马蜂窝旅游网</dt>
//				        <dd>中国年轻一代用得更多的旅游网站</dd>
//				        <dd>上亿旅行者共同打造的<strong>"旅行神器"</strong></dd>
//				        <dd><strong>60,000</strong> 多个全球旅游目的地</dd>
//				        <dd><strong>600,000</strong> 个细分目的地新玩法</dd>
//				        <dd><strong>760,000,000</strong> 次攻略下载</dd>
//				        <dd><strong>38,000</strong> 家旅游产品供应商</dd>
//				    </dl>
//					<dl class="ft-info f-center">
//				        <dt>关于我们</dt>
//				        <dd><a >关于马蜂窝</a> &nbsp; &nbsp;<a >联系我们</a></dd>
//				        <dd><a >隐私政策</a> &nbsp; &nbsp;<a >商标声明</a></dd>
//				        <dd><a >服务协议</a> &nbsp; &nbsp;<a >游记协议</a></dd>
//				        <dd><a >商城平台服务协议</a></dd>
//				        <dd><a >网络信息侵权通知指引</a></dd>
//				        <dd style="white-space: nowrap;"><a >马蜂窝旅游网服务监督员</a></dd>
//				        <dd><a >网站地图</a> &nbsp; &nbsp;<a style="color: #ff9d00;">加入马蜂窝</a></dd>
//				    </dl>
//				    <dl class="ft-info f-right">
//				        <dt style="text-align: center;">旅行服务</dt>
//				        <dd>
//				            <ul class="clearfix">
//				                <li><a >旅游攻略</a></li>
//				                <li><a >酒店预订</a></li>
//				                <li><a >旅游特价</a></li>
//				                <li><a >国际租车</a></li>
//				                <li><a >旅游问答</a></li>
//				                <li><a >旅游保险</a></li>
//				                <li><a >旅游指南</a></li>
//				                <li><a >订火车票</a></li>
//				                <li><a >旅游资讯</a></li>
//				                <li><a >APP下载</a></li>
//				                <li style="width: 120px;"><a style="color: #ff9d00;">旅行商城全球商家入驻</a></li>
//				            </ul>
//				        </dd>
//				    </dl>
//				    <dl class="ft-info f-img">
//				        <dd>
//				            <span></span>
//				            <img src="/lvyou/public/static/images/footrer/mfwapp.png" />
//				            <p>马蜂窝良品<br>官方服务号</p>
//				        </dd>
//				        <dd>
//				            <span></span>
//				            <img src="/lvyou/public/static/images/footrer/mfwapp.png" />
//				            <p>马蜂窝旅游<br>订阅号</p>
//				        </dd>
//				        <dd>
//				            <span></span>
//				            <img src="/lvyou/public/static/images/footrer/mfwapp.png" />
//				            <p>马蜂窝APP<br>扫描立即下载</p>
//				        </dd>
//				    </dl>
//				    <dl class="ft-info-b">
//				        <dt>旅游之前，先上马蜂窝！</dt>
//				        <dd>
//				            <img src="/lvyou/public/static/images/footrer/weibo1.png"/>
//				            <img src="/lvyou/public/static/images/footrer/weibo.png"/>
//				            <img src="/lvyou/public/static/images/footrer/kj.png"/>
//				        </dd>
//				    </dl>
//				    <div class="ft-links">
//					    <a>马可波罗</a><a>Onlylady女人志</a><a>艺龙旅游指南</a><a>欣欣旅游网</a><a>户外运动</a><a>365音乐网</a>
//					    <a>爱问共享资料</a><a>旅游网</a><a>小说网</a><a>学习啦</a><a>游多多自助游</a><a>问答</a><a>火车时刻表</a>
//					    <a>驴妈妈旅游网</a><a>好豆美食网</a><a>二手车</a><a>绿野户外</a><a>途牛旅游网</a><a>图吧</a>
//					    <a>SUV联合越野</a><a>手机浏览器</a><a>上海地图</a><a>天气预报查询</a><a>同程旅游</a><a>火车票</a>
//					    <a>马蜂窝大学</a><a>马尔代夫旅游</a><a>YunOS</a><a>携程旅游</a><a>锦江旅游</a><a>火车时刻表</a><a>TripAdvisor</a>
//					    <a>天巡网</a><a>短租房</a><a>租租车</a><a>五分旅游网</a><a>酒店预订</a><a>爱旅行网</a><a>旅游</a><a>旅游网</a>
//					    <a>wed114结婚网</a><a>车讯网</a><a>遨游旅游网</a><a>手机</a><a>更多友情链接&gt;&gt;</a>
//					</div>
//					<div class="ft-copy">
//					    <img style="float: left;margin:5px 20px 0 0;" src="/lvyou/public/static/images/footrer/footmfw.png" />
//					    <p>© 2019 Mafengwo.cn
//					        <a>京ICP备11015476号</a>
//					        <a><img src="/lvyou/public/static/images/footrer/police_record.png">京公网安备11010502013401号</a>
//					        <a>京ICP证110318号</a>
//					        <span>违法和不良信息举报电话: 010-83416877 举报邮箱: mfwjubao@mafengwo.com</span>
//					    </p>
//					    <p>
//					        <a>网络出版服务许可证</a>
//					        <a>增值电信业务经营许可证</a>
//					        <a>营业执照</a>
//					        <a>广播电视节目制作经营许可证</a>
//					        <a>帮助中心</a>
//					        <span class="m_l_10">马蜂窝客服：国内</span><span class="highlight">4006-345-678</span>
//					        <span class="m_l_10">海外</span> <span class="highlight">+86-10-8341-6888</span>
//					    </p>
//					</div>
//					<div class="f-imgae" style="text-align: center;">
//					    <a><img src="/lvyou/public/static/images/footrer/footkx.png"/></a>
//					    <a><img src="/lvyou/public/static/images/footrer/footcx.png"/></a>
//					    <a><img src="/lvyou/public/static/images/footrer/footwx.png"/></a>
//					    <a><img src="/lvyou/public/static/images/footrer/footwxrz.png"/></a>
//					</div>
//				</div>
//					
//			</div>
//		</footer>`
//});
//function login(){
//			document.getElementsByClassName("loginout")[0].style.display="none";
//			document.getElementsByClassName("loginse")[0].style.display="block";
//		}
//function tuichu(){
//	document.getElementsByClassName("loginout")[0].style.display="block";
//	document.getElementsByClassName("loginse")[0].style.display="none";
//}
//Vue.component('vue-percent',{
//	
//	template:`<div class="progress">
//					  <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
//					    <span>60%</span>
//					  </div>
//					</div>`
//});
Vue.component('vue-page',{
    props:{
        total:{  //数据总量
            type:Number
        },
        perPage:{  //每页数量
            type:Number
        },
        showpages:{
            type:Number
        }
    },
    data(){
        return{
            nowpage:1
        }
    },
    methods:{
        changepage(val){
            this.nowpage = val;
            this.$emit('pagechange',val);
        },
        uppage(currentpage){
            if (currentpage-1 <= 0){
                this.nowpage = 1;
                this.$emit('pagechange',1);
            }else {
                this.nowpage = currentpage - 1;
                this.$emit('pagechange',currentpage - 1);
            }
        },
        nextpage(currentpage){
            if (currentpage+1 >= this.showpages){
                this.nowpage = this.showpages;
                this.$emit('pagechange',this.showpages);
            }else {
                this.nowpage = currentpage + 1;
                this.$emit('pagechange',currentpage + 1);
            }
        }
    },
    //计算属性:依赖的其他属性很多个的时候
    computed:{
        //总页数
        pages(){
            return Math.ceil(this.total/this.perPage);
        },
        //需要显示的页码：条件：当前页、需要显示几页、总页数
        showpagearr:function(){
            const arr =[this.nowpage];
            let i=1;
            while(arr.length < this.showpages && this.pages >= this.showpages){
                if(this.nowpage - i > 0){
                    arr.push(this.nowpage - i);
                }
                if(this.nowpage + i <= this.pages){
                    arr.push(this.nowpage + i);
                }
                i++;
            }
            arr.sort((a,b)=>a-b);
            return arr;
        }
    },

    template:`<nav aria-label="Page navigation">
                  <ul class="pagination">
                    <li>
                      <a href="#" aria-label="Previous" @click="uppage(nowpage)" >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>

                    <template v-for="val in showpagearr">
                      <li :class=" val === nowpage ? 'active' : '' " >
                        <a href="###" @click="changepage(val)" >{{val}}</a>
                      </li>
                    </template>

                    <li>
                      <a href="#" aria-label="Next" @click="nextpage(nowpage)" >
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                  <div class="pagination-box">
                    共<span class="pagination-msg">{{total}}</span>条记录 当前 <span class="pagination-msg">{{nowpage}}</span>/<span>{{pages}}</span>页
                  </div>
               </nav>`
});
Vue.component('vue-travel',{
	data(){
		return{
			TravelArr:"",
			perpage:3,    //每页的条数
            total:0,     //总数量
            showpages:5,  //显示的页数
            page:1
		}
	},
	methods:{
		getTravel(page){
			const params={perPage:this.perpage,page:page};
			axios.get(getTravelUrl,{
				params
			}).then(resp=>{
//				console.log(resp.data);
				const data=resp.data;
                if(data.errcode===0){
                  console.log(data);
                    this.TravelArr=data.lists;
                    this.total=data.count;
                    this.showpages = Math.ceil(this.total/this.perpage);
                    if (Math.ceil(this.total/this.perpage) > 7){
                        this.showpages = 7;
                	}
             	}
//				this.TravelArr = data.lists;
			}).catch(err=>{
				console.log(err);
			});
		},
		 changepage(e){
		 	console.log(e);
            this.getTravel(e);
         },
		loadTarvel(yid,yuserid){
//			console.log(yuserid);
			var obj = {
				yid:yid,
				yuserid:yuserid
			}
			sessionStorage.setItem('travelArr',JSON.stringify(obj));
			window.location.href="travel_details";
			}
		},
		mounted(){
			this.getTravel(1);
		},

	template:`<div>
			<div class="container">
				
				<div class="lists_content">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<img src="/lvyou/public/static/images/list01.jpg"/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
									<h4>这个“十一”我在北京当导游</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
									<div class="listapp">
										<img src="/lvyou/public/static/images/list03.png" class="ximg"/>
										<span class="app">App</span>
									</div>
								</div>
							</div>	
							<div class="row">
								<div class="col-xs-12">
									<span>
										今年是祖国70周年的生日 由于工作原因我来了 北京 工作，由于贫穷国庆我没有出去玩耍，而是接待了从大 杭州 来找我玩耍的妹妹。 是滴。你们没有想错，在这七十周年的大日子里我们在全国游客...
									</span>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
									<div class="list_row">
										<span class="glyphicon glyphicon-map-marker">北京，by</span>
										<img src="/lvyou/public/static/images/hotel-sprites1_03.png" class="mining"/>
										<span class="glyphicon glyphicon-eye-open">2380/735</span>
									</div>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
									<div class="list_row2">
										<span>79</span>
										<img src="/lvyou/public/static/images/dianzan.png"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="lists_content" v-for="val in TravelArr">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<img :src='val.yImage' class="yImage"/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
									<h4 @click="loadTarvel(val.yid,val.yuserid)">{{val.title}}</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
									<div class="listapp">
										<img src="/lvyou/public/static/images/list03.png" class="ximg"/>
										<span class="app">App</span>
									</div>
								</div>
							</div>	
							<div class="row">
								<div class="col-xs-12">
									<span>
										{{val.yvideo}}
									</span>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
									<div class="list_row">
										<span class="glyphicon glyphicon-map-marker">{{val.yplace}}，by</span>
										<img src="/lvyou/public/static/images/hotel-sprites1_03.png" class="mining"/>
										<span class="glyphicon glyphicon-eye-open">280/35</span>
									</div>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
									<div class="list_row2">
										<span>79</span>
										<img src="/lvyou/public/static/images/dianzan.png"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row page">
					<div class="col-xs-12">
						 <vue-page @pagechange="changepage" :showpages="showpages"  :per-page="perpage" :total="total">
						 	
						 </vue-page>
					</div>
				</div>
			</div>
		</div>`
});
//Vue.component('vue-dropdown',{
//	 data(){    
//	 	return {     
//	 		datalist:[]    
//	 	}   
//	 },   
//	 props:{    
//	 	'show':{//用于外部控制组件的显示/隐藏     
//	 		type:Boolean,    
//	 		default:true   
//	 	},    
//	 	'itemlist':Array,    
//	 	'placeholder':String,    
//	 	'nodatatext':String   
//	 },   
//	 watch:{    
//	 	itemlist:function(val){     
//	 		this.datalist = val.concat();    
//	 	}   
//	 },   
//	 directives:{    
//	 	'show-extend':function(el,binding,vnode){//bind和 update钩子     
//	 		let value = binding.value,searchInput = null;     
//	 		if(value){      el.style.display='block';     
//	 		}else{//隐藏后，恢复初始状态      
//	 			el.style.display='none';      
//	 			searchInput = el.querySelector(".search-text");      
//	 			searchInput.value = '';      
//	 			vnode.context.datalist = vnode.context.itemlist;//还原渲染数据     
//	 			}    
//	 	}   
//	 },   
//	 methods:{    
//	 	appClick:function(data){     
//	 		this.$emit('item-click',data);    
//	 	},    search:function(e){     
//	 		let vm = this,searchvalue = e.currentTarget.value;     
//	 		vm.datalist = vm.itemlist.filter(function(item,index,arr){      
//	 			return item.name.indexOf(searchvalue) != -1;     
//	 		});    
//	 	}   
//	 },   
//	 computed:{    
//	 	length:function(){     
//	 		return this.datalist.length;   
//	 	}   
//	 }  
//	}
//	
//});
