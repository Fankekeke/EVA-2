var travelArr = JSON.parse(sessionStorage.getItem("travelArr"));
var yid = travelArr['yid'];
var yuserid = travelArr['yuserid'];
var vm = new Vue({
	data(){
		return{
			yid:yid,
			yuserid:yuserid,
			headArr:"",
			contentArr:"",
			userName:"",
			userImg:""
		}
	},
	methods:{
		getTravelNotes(){
			axios.post(TravleUrl,{
				yid:this.yid,
				yuserid:this.yuserid
			}).then(resp=>{
//				console.log(resp);
				var resp = resp.data;
				this.headArr = [resp['headArr']];
//				console.log(this.headArr);
				this.contentArr = [resp['contentArr']][0];
//				console.log(this.contentArr);
			}).catch(err=>{
				console.log(err);
			});
		},
		getUserName(){
//			console.log(this.yuserid);
			axios.post(UserUrl,{
				yuserid:this.yuserid
			}).then(resp=>{
//				console.log(resp);
				var resp = resp.data;
				this.userName = resp.usenick;
				this.userImg = '/lvyou/public/static'+resp.userhimg
			}).catch(err=>{
				console.log(err);
			});
		}
	},
	mounted(){
		this.getTravelNotes();
		this.getUserName();
	}
}).$mount("#tap");