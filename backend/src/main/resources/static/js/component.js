Vue.component('page-box',{
	props:['showpage','totalpage','nowpage'],

	data(){
		return {
			nowpageA:null,
			page:[],
		}
	},
	computed: {
		// totalpage: function () {
		// 	this.showPageBox();
		// },
		nowpageB:{
			get:function () {
				
				return this.nowpage;
			},
			
			set:function (value) {
				console.log(value)
				this.nowpageA = value;
			}
		},
		showPageBox:function(){
			
			let i=1;
			
			let arr=[this.nowpage];
			this.page.push(this.nowpage);
			console.log( this.showpage);
			while(arr.length < this.showpage && this.showpage<=this.totalpage){
				if(this.nowpage-i >0){
					arr.push(this.nowpage-i);
				}
				if(this.nowpage+i <= this.totalpage){
					arr.push(this.nowpage+i);
				}
				i++;
			}
			arr.sort((a,b)=>{return a-b});
			return arr;
		}
	},
	mounted:function(){

	},


	methods:{

		cliPage:function(nowpage,index){

			this.nowpageB=nowpage;
			this.$emit('changpage',nowpage);
		},
		previousPage:function() {
			if(this.nowpageB > 1 ){
				this.nowpageB --;
				
				this.$emit('changpage',this.nowpageA);
			}
		},
		nextPage:function() {
		
			if(this.nowpageB < this.totalpage){
				this.nowpageB++;
				this.$emit('changpage',this.nowpageA);
			}
		}
	},
	template:` <div>
    <div aria-label="Page navigation">
      <ul class="pagination page-box">
        <li >
          <a @click="previousPage"  aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="(val,index) in showPageBox" :key="index" :class="val==nowpage ? 'active':''">
          <a  @click="cliPage(val,index)">{{val}}</a>
        </li>
        <li>
          <a @click="nextPage"aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
	  </ul>
	  <div class="pagination-box">
			 第 <span class="pagination-msg">{{nowpage}}</span>/<span>{{totalpage}}</span>页
		</div>
    </div>
  </div>`
});
