var arr =[
        {id:0,value:"北京"},
    	{id:1,value: "北"},
    	{id:2,value: "北方有佳人"}
	];

var vm = new Vue({
	data(){
		return{
			TravelArr:"",
			perpage:5,    //每页的条数
            total:0,     //总数量
            showpages:5,  //显示的页数
            page:1,
            keyword:"",
            myData:[],            
	 		now:-1
	 		
		}
	},
	methods:{
		getTravel(page){
			const params={perPage:this.perpage,page:page};
			if(this.keyword) params.keyword = this.keyword;
			axios.get(getTravelUrl,{
				params
			}).then(resp=>{
				const data=resp.data;
                if(data.errcode===0){
                    this.TravelArr=data.lists;
                    this.total=data.count;
                    this.showpages = Math.ceil(this.total/this.perpage);
                    if (Math.ceil(this.total/this.perpage) > 7){
                        this.showpages = 7;
                	}
             	}
			}).catch(err=>{
				console.log(err);
			});
		},
		 changepage(e){
            this.getTravel(e);
         },
         search(){
				this.getTravel(1);
			},
		loadTarvel(yid,yuserid){
			var obj = {
				yid:yid,
				yuserid:yuserid
			}
			sessionStorage.setItem('travelArr',JSON.stringify(obj));
			window.location.href="travel_details";
		},
		get:function(event) {
			console.log(event.keyCode);
	 		if(event.keyCode==38||event.keyCode==40)return;        
	 		if(event.keyCode==13){                    
	 			this.keyword=''       
	 		}
	 		if(event.keyCode==32){
	 			$(".baidu").show(1000);
	 		}
	 		this.myData=arr;
	 	},      
	 	selectDown(){        
	 		this.now++;        
	 		if(this.now==this.myData.length)this.now=-1;        
	 		this.keyword=this.myData[this.now];      
	 	},      
	 	selectUp(){        
	 		this.now--;        
	 		if(this.now==-2)this.now=this.myData.length-1;        
	 		this.keyword=this.myData[this.now];      
	 	},
	 	changeKey(value){
	 		this.keyword=value ;
	 	}
	},
	mounted(){
		this.getTravel(1);
	}
}).$mount("#travel_lists");