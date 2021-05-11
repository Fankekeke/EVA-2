var vm = new Vue({
		data(){
			return{
				CaoGaoArr:"",
				id:1,
				Num:""
			}
		},
		methods:{
			getCaoGao(){
				var id=this.id;
				axios.post(CaoGaoUrl,{
					id:id
				}).then(resp=>{
					var resp=resp.data;
					this.CaoGaoArr=resp;
				}).catch(err=>{
					console.log(err);
				});
			},
			getCaoGaoNum(){
				var id=this.id;
				axios.post(getNumUrl,{
					id:id
				}).then(resp=>{
					var resp=resp.data;
					this.Num=resp;
				}).catch(err=>{
					console.log(err);
				});
			},
			del(yid){
				if(!confirm('是否删除该条游记草稿')) return;
				var id=this.id;
				axios.post(DelUrl,{
					id:id,
					yid:yid
				}).then(resp=>{
					var resp=resp.data;
					layer.open({
					  title: '提示'
					  ,content: '删除成功'
					}); 
					this.CaoGaoArr=resp;
				}).catch(err=>{
					console.log(err);
				});
			},
			url(yid){
				obj={
					yid:yid,
					id:this.id
				}
				sessionStorage.setItem('caogaoArr',JSON.stringify(obj));
				location.href="writing_notes";
			},
			guanbi(){
				location.href=indexUrl;
			}
		},
		mounted(){
			this.getCaoGao();
			this.getCaoGaoNum();
		}
	}).$mount("#CaoGao");