


Vue.component('hothotel',{

    props:['cid'],

    data(){
        return {
            list:[]
        }
    },
    
    mounted:function() {
    
        this.showList();
    },

    methods:{

        showList:function () {
            
            axios.post(HOTEL_API+'?cid='+this.cid).then( res => {
             
                this.list = res.data.data;
                    
            })
        },

        showDetails:function(id) {

            location.href = SHOWDETAILS_API+'?id='+id;
            // axios.post(API_URL+'show_details',{id}).then( res => {
             
            //     console.log(1);
                    
            // })
        },
        
    },
	
	
	template: `<ul class="row hot-list">
    <li v-for="val in list" v-if="val.c_id == cid " @click="showDetails(val.businid)" class="col-xs-6 col-sm-3">
        <img :src="val.busimage" alt="">
        <div class="h-img-shield">
            <div class="h-shield"> </div>
            <div class="h-score">{{val.h_fraction}}分</div>
            <div class="h-info">
                <p class="h-name">{{val.busname}}</p>
                <p class="h-en-name">{{val.h_en_name}}</p>
            </div>
        </div>
    </li>
</ul>`
});
