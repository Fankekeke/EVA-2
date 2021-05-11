
$(document).ready(function(){
    var $backToTop = $(".back-to-top");
    $backToTop.hide();
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $backToTop.fadeIn();
        } else {
            $backToTop.fadeOut();
        }
    });
    // $backToTop.on('click', function(e) {
    //     $("html, body").animate({scrollTop: 0}, 1000);
    // });
})
// $('.xieyouji').click(function () {
//     location.href=getDetailsUrl
// })
$(function () {
    // axios.post(Loginok).then(resp=>{
    //     if(resp.data!==0){
    //         $('.loginse').show()
    //         $('.loginout').hide()
    //         if(resp.data.qq!==0){
    //             $('.logimg')[0].src=resp.data.log.userhimg
    //         }else {
    //             $('.logimg')[0].src=img+resp.data.log.userhimg
    //         }
    //         if(resp.data.bus.length===0)return
    //         if(resp.data.bus[0].businstatus!='审核中'){
    //             $('.busplatform').show()
    //             $('.busentry').hide()
    //         }
    //     }
    // })
})
setTimeout(function () {
    $('.load').fadeOut('slow');
},800)

laydate.render({
    elem: '#test10',
    type: 'date',
    range: true
});
$('.goout').click(function () {
    layer.open({
        title:"小贝壳提示"
        ,content: '是否退出'
        ,btn: ['确认', '取消']
        ,yes: function(index, layero){
            axios.post(Logingetout).then(resp=>{
                if(resp.data==0)return location.href=Goindex
            })
            layer.close(index);
        }
    });
})