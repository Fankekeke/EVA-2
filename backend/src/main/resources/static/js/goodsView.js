var vm = new Vue({
    el:'#app',
    data(){
        return {
            list:[], nowPage:1, details:[], type:'0', perpage:5, total:0, showPage:7, keywork:'', img :img
        }
    },
    mounted:function(){
     this.showList();
    },
    computed:{
        totalPage:{
            get:function () {
                this.showPage = 7;
                let total = Math.ceil(this.total/this.perpage) ;
                if(total < this.showPage && total != 0)  this.showPage = total;
                return total
            },
            set:function(){
                return false;
            }
        }
    },
    methods:{//搜索
        search:function(e){
           if(e.keyCode === 13){
               this.keywork = e.target.value;
               this.nowPage=1;
               let listLoad = layer.load(1);
               this.showList();
               layer.close(listLoad);
           }
        },
        search1:function(){
            this.keywork = $(".ssnrz").val();
            this.nowPage=1;
            let listLoad = layer.load(1);
            this.showList();
            layer.close(listLoad);
        },
        //分页
        changpage:function (e) {
            this.nowPage = e;
            this.showList()
        },
        //列表渲染
        showList: function(){
            //let listLoad = layer.load(1);
            axios.post(Recomsea+'?type='+this.type+'&keyword='+this.keywork,{
                page: this.nowPage,
                perpage:this.perpage
            }).then( res => {
                this.total = res.data.total;
                if(res.data.total == undefined) this.total = 0;
                if(res.data.errcode == '0'){
                    this.list = res.data.data;
                }
                if(res.data.errcode == '4444'){
                    if( this.nowPage > 0){
                        this.nowPage --;
                        this.list = res.data.data;
                        this.changpage(this.nowPage);
                    }
                }
                // layer.close(listLoad);
            })
        },
        //上架
        shelf: function(businid){
            layer.confirm('是否上架该商品?', {
                resize:false,
                btn: ['确认','取消'],
              }, () => {
                let loading = layer.load(1);
                this.eadGoods('0',businid,() => {
                    layer.close(loading);
                    layer.msg('商品已上架',{icon:1});
                });
              }, () => {
            });
        },
        //下架
        obtained:function(businid){
            layer.confirm('是否下架该商品?', {
                resize:false,
                btn: ['确认','取消'],
              }, () => {
                let loading = layer.load(1);
                this.eadGoods('1',businid,() => {
                    layer.close(loading);
                    layer.msg('商品已下架',{icon:1});
                });
              });
        },
        //上架/下架 数据传输
        eadGoods:function(ead,id,callback){
            axios.post(Goodead,{ead,id}).then( res => {
               if(res.data.errcode == '0'){
                   this.showList();
                    return callback();
               }
            })
        },
       //删除
       delGoods:function(id){
        layer.confirm('删除后无法恢复，是否继续？',{
            resize:false,
            btn: ['确认','取消'],
        },() => {
            axios.post(Gooddel,{id}).then( res => {
                if(res.data.errcode == '0'){
                    this.showList();
                     layer.msg('删除成功',{icon:1});
                }
             });
        });
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
        getDetails:function(id,callback){
            axios.post(Goodxqing,{
                id
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
            let str = '<ul><li><span>商品名称：<span>'+this.details.goods_name+'</li>'+
            '<li><span>商品价格：<span>'+this.details.goods_price+'</li>'+
            '<li><span>目的地：<span>'+this.details.c_name+'</li>'+
            '<li><span>剩余数量：<span>'+this.details.goods_stock+'</li>'+
            '<li><span>商品状态：<span>'+this.details.goods_state+'</li>'+
            '<li><span>发出时间：<span>'+this.details.goods_departure_time+'</li>'+
            '<li><span>商品类型：<span>'+this.details.goods_type+'</li>'+
            '<li><span>商家名称：<span>'+this.details.busname+'</li>'+
            '<li><span>商家电话：<span>'+this.details.bustel+'</li>'+
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

var vm = new Vue({
    el:'#app1',
    data(){
        return {
            list:[], nowPage:1, details:[], type:'0', perpage:5, total:0, showPage:7, keywork:'', img :img
        }
    },
    mounted:function(){
        this.showList();
    },
    computed:{
        totalPage:{
            get:function () {
                this.showPage = 7;
                let total = Math.ceil(this.total/this.perpage) ;
                if(total < this.showPage && total != 0)  this.showPage = total;
                return total
            },
            set:function(){
                return false;
            }
        }
    },
    methods:{//搜索
        search2:function(e){
            if(e.keyCode === 13){
                this.keywork = e.target.value;
                this.nowPage=1;
                let listLoad = layer.load(1);
                this.showList();
                layer.close(listLoad);
            }
        },
        search12:function(){
            this.keywork = $(".ssnrz1").val();
            this.nowPage=1;
            let listLoad = layer.load(1);
            this.showList();
            layer.close(listLoad);
        },
        //分页
        changpage:function (e) {
            this.nowPage = e;
            this.showList()
        },
        //列表渲染
        showList: function(){
            //let listLoad = layer.load(1);
            axios.post(Recomseadity+'?type='+this.type+'&keyword='+this.keywork,{
                page: this.nowPage,
                perpage:this.perpage
            }).then( res => {
                this.total = res.data.total;
                if(res.data.total == undefined) this.total = 0;
                if(res.data.errcode == '0'){
                    this.list = res.data.data;
                }
                if(res.data.errcode == '4444'){
                    if( this.nowPage > 0){
                        this.nowPage --;
                        this.list = res.data.data;
                        this.changpage(this.nowPage);
                    }
                }
                //layer.close(listLoad);
            })
        },
        //上架
        shelf: function(businid){
            layer.confirm('是否上架该商品?', {
                resize:false,
                btn: ['确认','取消'],
            }, () => {
                let loading = layer.load(1);
                this.eadGoods('0',businid,() => {
                    layer.close(loading);
                    layer.msg('商品已上架',{icon:1});
                });
            }, () => {
            });
        },
        //下架
        obtained:function(businid){
            layer.confirm('是否下架该商品?', {
                resize:false,
                btn: ['确认','取消'],
            }, () => {
                let loading = layer.load(1);
                this.eadGoods('1',businid,() => {
                    layer.close(loading);
                    layer.msg('商品已下架',{icon:1});
                });
            });
        },
        //上架/下架 数据传输
        eadGoods:function(ead,id,callback){
            axios.post(Goodead,{ead,id}).then( res => {
                if(res.data.errcode == '0'){
                    this.showList();
                    return callback();
                }
            })
        },
        //删除
        delGoods:function(id){
            layer.confirm('删除后无法恢复，是否继续？',{
                resize:false,
                btn: ['确认','取消'],
            },() => {
                axios.post(Gooddel,{id}).then( res => {
                    if(res.data.errcode == '0'){
                        this.showList();
                        layer.msg('删除成功',{icon:1});
                    }
                });
            });
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
        getDetails:function(id,callback){
            axios.post(Goodxqing,{
                id
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
            let str = '<ul><li><span>商品名称：<span>'+this.details.goods_name+'</li>'+
                '<li><span>商品价格：<span>'+this.details.goods_price+'</li>'+
                '<li><span>目的地：<span>'+this.details.c_name+'</li>'+
                '<li><span>剩余数量：<span>'+this.details.goods_stock+'</li>'+
                '<li><span>商品状态：<span>'+this.details.goods_state+'</li>'+
                '<li><span>发出时间：<span>'+this.details.goods_departure_time+'</li>'+
                '<li><span>商品类型：<span>'+this.details.goods_type+'</li>'+
                '<li><span>商家名称：<span>'+this.details.busname+'</li>'+
                '<li><span>商家电话：<span>'+this.details.bustel+'</li>'+
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
var vm = new Vue({
    el:'#app2',
    data(){
        return {
            list:[],
            nowPage:1,
            details:[],
            type:'0',
            perpage:10,
            total:0,
            showPage:7,
            keywork:'',
            img :img
        }
    },
    mounted:function(){
        this.showList();
    },
    computed:{
        totalPage:{
            get:function () {
                this.showPage = 7;
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
            axios.post(Reorder+'?type='+this.type+'&keyword='+this.keywork,{
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
        shelf:function(id){
            axios.post(Orderok,{

            }).then(res=>{

            })
        },
        changeType:function(e) {
            this.type = $('#busines-type option:selected') .val();
            this.nowPage = 1;
            this.showList();
        }
    }
});

var vm = new Vue({
    el:'#app3',
    data(){
        return {
            list:[],
            nowPage:1,
            details:[],
            type:'0',
            perpage:10,
            total:0,
            showPage:7,
            keywork:'',
            img :img
        }
    },
    mounted:function(){
        this.showList();
    },
    computed:{
        totalPage:{
            get:function () {
                this.showPage = 7;
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
        //分页
        changpage:function (e) {
            this.nowPage = e;
            this.showList()
        },
        //列表渲染
        showList: function(){
            let listLoad = layer.load(1);
            axios.post(Readvertall,{
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
        }
    }
});