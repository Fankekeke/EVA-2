const API_URL = '/svnrepos/public/index.php/business/business/';
var vm = new Vue({
    el:'#app',
    data(){
        return {
            list:[],
            nowPage:1,
            details:[],
            type:'0',
            perpage:10,
            total:0,
            showPage:7,
            keywork:''
           
        }
    },

    mounted:function(){
     this.showList();
        
    },
    computed:{
        
        totalPage:{
            get:function () {

                let total = Math.ceil(this.total/this.perpage) ;
                if(total < this.showPage && total != 0)  this.showPage = total;
               
                return total
            },
            set:function(){
                return false;
            }

        }

    },

    methods:{
        //搜索
        search:function(e){
           if(e.keyCode === 13){
               this.keywork = e.target.value;
               this.nowPage=1;
               this.showList();
           }
            
        },

        //分页
        changpage:function (e) {
            this.nowPage = e;
         
            this.showList()
        },
        //列表渲染
        showList: function(){
            let listLoad = layer.load(1);
            axios.post(API_URL+'showMerchant'+'?type='+this.type+'&keyword='+this.keywork,{
                page: this.nowPage,
                perpage:this.perpage
            }).then( res => {
                this.total = res.data.total;
              
                if(res.data.total == undefined) this.total = 0;
                
                if(res.data.errcode == '0'){
                    this.list = res.data.data;
                }
                if(res.data.errcode == '444'){
                    if( this.nowPage > 0){
                        this.nowPage --;
                        this.changpage(this.nowPage);
                    }
                }
                
                
                layer.close(listLoad);
            })
        },
        
        //启用
        enable: function(businid){

            layer.confirm('是否启用该商家?', {
                resize:false,
                btn: ['确认','取消'],
               
                
              }, () => {
                let loading = layer.load(1);
                this.eadBusiness('0',businid,() => {
                    layer.close(loading);
                    layer.msg('商家已启用',{icon:1});
                });

              }, () => {

            });      



          
        },
        //禁用
        disable:function(businid){

            layer.confirm('是否禁用该商家?', {
                resize:false,
                btn: ['确认','取消'],
               
                
              }, () => {
                let loading = layer.load(1);
                this.eadBusiness('1',businid,() => {
                    layer.close(loading);
                    layer.msg('商家已禁用',{icon:1});
                });

              });      

        },
        //启用/禁用 数据传输
        eadBusiness:function(ead,id,callback){
            axios.post( API_URL+'eadBusiness',{ead,id}).then( res => {
               if(res.data.errcode == '0'){
                   this.showList();
                    return callback();
               }
              
            })
        },
       
      

        //查看详情按钮
        showDetails:function(businid){
            let loading = layer.load(1);
            this.getDetails(businid,() => {
                layer.close(loading);
                layer.alert(this.detailsCentent());
            });
            
        },

        //获取详情
        getDetails:function(businid,callback){

            axios.post(API_URL+'details',{
                businid
            }).then( res => {
                if(res.data.errcode == 0){

                    this.details = res.data.data;
                    return callback();

                }else{
                    layer.msg(res.data.errmsg,{icon: 2});
                }
                
                
            });
        },
        //详情页面
        detailsCentent:function(){
            let str = '<ul><li><span>商家名称：<span>'+this.details.busname+'</li>'+
            '<li><span>商家类型：<span>'+this.details.busleix+'</li>'+
            '<li><span>申请人姓名：<span>'+this.details.businame+'</li>'+
            '<li><span>当前状态：<span>'+this.details.businstatus+'</li>'+
            '<li><span>联系方式：<span>'+this.details.bustel+'</li>'+
            '<li><span>邮箱：<span>'+this.details.buseml+'</li>'+
            '<li><span>商家地址：<span>'+this.details.busadd+'</li>'+
            '<li><span>申请时间：<span>'+this.details.startTime+'</li>'+
            '</ul>';
            return str;
        },


        changeType:function(e) {
            this.type = $('#busines-type option:selected') .val();
            this.nowPage = 1;
            this.showList();

        }
     

 
    }

});