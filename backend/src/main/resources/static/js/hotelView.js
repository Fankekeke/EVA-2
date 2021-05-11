// const API_URL = '/lvyou/public/index.php/hotel/hotel/';

var vm = new Vue({
    el:'#app',
    data(){
        return {
            list:[]
        }
    },

    // mounted:function() {
    
    //     this.showList();
    // },

    // methods:{

    //     showList:function () {
            
    //         axios.post(API_URL+'show_list').then( res => {
             
    //             this.list = res.data.data;
                    
    //         })
    //     },

    //     showDetails:function(id) {

    //         location.href = API_URL+'show_details?id='+id;
    //         // axios.post(API_URL+'show_details',{id}).then( res => {
             
    //         //     console.log(1);
                    
    //         // })
    //     },
        
    // }
});