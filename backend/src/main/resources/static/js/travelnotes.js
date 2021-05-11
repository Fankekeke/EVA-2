var vm = new Vue({
		data(){
			return{
				num:""
			}
		},
		methods:{
			oldTravel(){
				layer.open({
				  title: '提示'
				  ,content: '经典游记维护中，敬请期待！！'
				});    
			},
			getCaogaoNum(){
//				var id = this.id;
				axios.post(getNumUrl,{
//					id:id
				}).then(resp=>{
					var resp = resp.data;
					this.num=resp;
				}).catch(err=>{
					console.log(err);
				});
			},
			tiaozhuan(){
				location.href="writing_notes";
			},
			chat(){
				$("#chat").show();
			}
		},
		mounted(){
			this.getCaogaoNum();
		}
	}).$mount("#travel");