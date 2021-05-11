var guo	= [
		{id:0,name:"请选择国家"},
		{id:1,name:"中国"},
		{id:2,name:"新加坡"},
		{id:3,name:"日本"}
	];
var	sheng = [
		{id:0,name:"请选择省份",pid:0},
		{id:1,name:"福建",pid:1},
		{id:2,name:"北京",pid:1},
		{id:3,name:"新加坡",pid:2},
		{id:4,name:"日本",pid:3}
	];
var shi = [
		{id:0,name:"请选择城市",pid:0},
		{id:1,name:"福州",pid:1},
		{id:2,name:"厦门",pid:1},
		{id:3,name:"北京",pid:2},
		{id:4,name:"新加坡",pid:3},
		{id:5,name:"东京",pid:4}
	];
var vm = new Vue({
//	delimiters: ['{[', ']}'],
	data(){
		return{
			country:"",
			province:"",
			city:"",
			countryName:"",
			provinceName:"",
			cityName:"",
			countryArr:[],
			provinceArr:[],
			cityArr:[],
			contentArr:[],
			Nextid:1,
			title:[],
			content:[],
			photo:"",
			music:[],
			yulanArr:[],
			Title:"",
			backImg:"",
			imgUrl:[],
			imgid:"",
			userid:"",
			imgArr:[],
			contArr:[],
		}
	},
	methods:{
		addContent(type){
			var obj={
				type:type,
				Nextid:this.Nextid++,
				title:"",
				content:"",
				music:"",
				photo:""
			}
			this.contentArr.push(obj);
			this.contArr.push(obj);
		},
		addPhoto(type){
			var obj={
				type:type,
				imgid:this.imgid++,
				photo:"",
				title:"",
				content:""
			}
			this.contentArr.push(obj);
			this.contArr.push(obj);
		},
		yulan(){
				var obj={
					Title:this.Title,
					backImg:headImg,
					country:this.countryName['name'],
					province:this.provinceName['name'],
					city:this.cityName['name'],
				} 
				this.yulanArr.push(obj);
				sessionStorage.setItem('contArr',JSON.stringify(this.contArr));
				sessionStorage.setItem('heanArr',JSON.stringify(this.yulanArr));
				window.location.href="yulan_travel";
		},
		caogao(){
			console.log(this.contentArr);
			var params = new URLSearchParams();
				params.append('contentArr',JSON.stringify(this.contentArr));
				params.append('userid',this.userid);
				params.append('Title',this.Title);
				params.append('backImg',headImg);
				params.append('country',this.countryName['name']);
				params.append('province',this.provinceName['name']);
				params.append('city',this.cityName['name']);
			axios.post(CaoGaoUrl,
				params
			).then(resp=>{
				console.log(resp);
				layer.open({
				    title: '提示',
				    content: '成功保存到草稿'
				});
			}).catch(err=>{
				console.log(err);
			});
		},
		fabiao(){
//			if(confirm("你真的要发表吗？")) return;
			console.log(this.contArr);
			var params = new URLSearchParams();
				params.append('contentArr',JSON.stringify(this.contArr));
				params.append('userid',this.userid);
				params.append('Title',this.Title);
				params.append('backImg',headImg);
				params.append('country',this.countryName['name']);
				params.append('province',this.provinceName['name']);
				params.append('city',this.cityName['name']);
			axios.post(FaBiaoUrl,
				params
			).then(resp=>{
				console.log(resp);
				var resp = resp.data;
				layer.open({
				    title: '提示',
				    content: '发表成功'
				});
				var obj={
					yid:resp,
					yuserid:this.userid
				}
				sessionStorage.setItem('travelArr',JSON.stringify(obj));
				window.location.href="travel_details";
			}).catch(err=>{ 
				console.log(err);
			});
		},
		changeimg(id){
			var files = $('.contentImg')[id].files[0];//获取文件信息
			var formData = new FormData();
			 	formData.append("backImage",files);
			 	$.ajax({
			 		type:"post",
			 		url:ImgUrl,
			 		data:formData,
			 		dataType:"text",
			 		async: false,
	                processData : false, // 使数据不做处理
	                contentType : false, // 不要设置Content-Type请求头
	                success:function(res){
	                	backImg = STATIC+'/uploads/'+res;
	                	console.log(backImg);
	                },
	                error:function(err){}
			 	});
				for(var i=0;i<this.contArr.length;i++){
					if(this.contArr[i].type == 'photo'){
						this.contArr[id].photo = backImg;
					}
				}
				var obj={
					imgid:id,
					Url:backImg
				}
				if(obj['imgid'] == id){
					this.imgUrl.push(obj);
				}
			
			this.contentArr.push(this.imgUrl);
		},
		headImg(){
			var formData = new FormData();
			 	formData.append("backImage",$('#crowd_file')[0].files[0]);
			
			 	$.ajax({
			 		type:"post",
			 		url:ImgUrl,
			 		data:formData,
			 		dataType:"text",
			 		async: false,
	                processData : false, // 使数据不做处理
	                contentType : false, // 不要设置Content-Type请求头
	                success:function(res){
	                	
	                	headImg = STATIC+'/uploads/'+res;
	                	
	                	 $("#Img").attr("src", headImg);
	                },
	                error:function(err){
	                	console.log(err);
	                }
			 	});
		},
		getObjectURL(file) {
	        var url = null;
	        if (window.createObjectURL!=undefined) {
	            url = window.createObjectURL(file) ;
	        } else if (window.URL!=undefined) { // mozilla(firefox)
	            url = window.URL.createObjectURL(file) ;
	        } else if (window.webkitURL!=undefined) { // webkit or chrome
	            url = window.webkitURL.createObjectURL(file) ;
	        }
	        return url ;
    	},
    	delInput(key){
    		this.contentArr.splice(key,1);
    	},
    	Edit(){
			var caogaoArr = JSON.parse(sessionStorage.getItem('caogaoArr'));
    		var yid = caogaoArr['yid'];
    		if(yid == null) return;
    		var yuserid = caogaoArr['id'];
    		axios.post(EditUrl,{
    			yid:yid,
    			yuserid:yuserid
    		}).then(resp=>{
    			var res = resp.data;
    			console.log(res);
    			this.Title = res[0]['title'];
    			$("#Img").attr("src",res[0]['backImage']);
    			headImg=res[0]['backImage'];
    			console.log(headImg);
    		}).catch(err=>{
    			console.log(err);
    		});
    	}
	},
	created:function(){
			this.countryArr = guo;
			this.country = this.countryArr.length>0 ? this.countryArr[0].id : "";
			
			var val = this.country;
			this.provinceArr = sheng.filter(function (x){ return x.pid == val })
	        this.province = this.provinceArr.length>0 ? this.provinceArr[0].id : "";
	        
	        var val = this.city;
	        this.cityArr = shi.filter(function (x){ return x.pid == val })
	        this.city = this.cityArr.length>0 ? this.cityArr[0].id : "";			
	},
	watch:{
		country:function (val) {	
			//获取国家
			this.countryName = guo.find(function(x){return x.id == val});
		
            this.provinceArr = sheng.filter(function (x){ return x.pid == val });
    		this.province = this.provinceArr.length>0 ? this.provinceArr[0].id : "";
		},
        province:function (val) {
			//获取省份
			this.provinceName = sheng.find(function(x){return x.id == val});
    		
            this.cityArr = shi.filter(function (x){ return x.pid == val })
	        this.city = this.cityArr.length>0 ? this.cityArr[0].id : "";	
        },
        city:function(val){
			//获取城市
			this.cityName = shi.find(function(x){return x.id == val});
        }
	},
	mounted(){
//		this.Edit();
//		sessionStorage.clear();
		axios.get(getUidUrl,{
			
		}).then(resp=>{
			var resp = resp.data;
			this.userid = resp;
			console.log(this.userid);
		});
	}
}).$mount("#writing_notes");