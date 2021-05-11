var vm = new Vue({
	data(){
		return{
			TravelArr:"",
			perpage:10,    //每页的条数
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
			location.href=getDetaUrl;
		}
	},
	mounted(){
		this.getTravel(1);
	}
}).$mount("#travel_lists");
var vm = new Vue({
	data(){
		return{
			TravelArr:"",
			perpage:10,    //每页的条数
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
			location.href=getDetaUrl;
		}
	},
	mounted(){
		this.getTravel(1);
	}
}).$mount("#travel_lists1");