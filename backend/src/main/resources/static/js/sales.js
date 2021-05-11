
setTimeout(function () {
    $('.load').fadeOut('slow');
},800)
$('.entry').click(function () {
    axios.post(Bustest).then(resp=>{
        console.log(resp.data.length)
        if(resp.data===0){
            return  layer.open({
                title:"小贝壳提示"
                ,content: '请登录后操作'
                ,btn: ['去登录', '取消']
                ,yes: function(index, layero){
                    location.href=indexout;
                    layer.close(index);
                }
            });
        }
        if (resp.data.length!=0)return layer.msg('您的商家平台正在审核中或您已注册商家！')
        location.href=Alliance;
    })
})
$(function () {
    axios.post(Loginok).then(resp=>{
        if(resp.data!=0){
            if (resp.data[0].businstatus!='审核中')return layer.msg('您已注册商家！')
            $('.loginse').show()
            $('.loginout').hide()
            if(resp.data.qq!=0){
                $('.logimg')[0].src=resp.data.log.userhimg
            }else {
                $('.logimg')[0].src=Limg+resp.data.log.userhimg
            }
        }
    })
})
$('.goout').click(function () {
    layer.open({
        title:"小贝壳提示"
        ,content: '是否退出'
        ,btn: ['确认', '取消']
        ,yes: function(index, layero){
            axios.post(Logingetout).then(resp=>{
                if(resp.data==0)return location.reload()
            })
            layer.close(index);
        }
    });
})