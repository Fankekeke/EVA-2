
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
                  <ul class="pagination" style="float: left;">
                    <li>
                      <a href="#" aria-label="Previous" @click="uppage(nowpage)" >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>

                    <template v-for="val in showpagearr">
                      <li :class=" val === nowpage ? 'active' : '' " >
                        <a href="#" @click="changepage(val)" >{{val}}</a>
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
			perpage:10,    //每页的条数
            total:0,     //总数量
            showpages:5,  //显示的页数
            page:1,
            img:img
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
			window.location.href=getDetaUrl;
			}
		},
		mounted(){
			this.getTravel(1);
		},
	template:`<div>
				<div class="lists_content probootstrap-animate" v-for="val in TravelArr">
					<div class="row ">
						<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
							<img :src="img+val.yImage" class="yImage"/>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
							<div class="row">
								<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 ">
									<h4 @click="loadTarvel(val.yid,val.yuserid)">{{val.title}}</h4>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
									<div class="listapp">
										<img :src="img+'/images/list03.png'" class="ximg"/>
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
										<img :src="img+'/images/hotel-sprites1_03.png'" class="mining"/>
										<span class="glyphicon glyphicon-eye-open">280/35</span>
									</div>
								</div>
								<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
									<div class="list_row2">
										<span>79</span>
										<img :src="img+'/images/dianzan.png'"/>
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
		</div>`
});