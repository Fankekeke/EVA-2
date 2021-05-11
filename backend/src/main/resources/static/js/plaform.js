$(function () {
    axios.post(Loginok).then(resp=>{
        console.log(resp.data)
        if(resp.data!==0){
            $('.loginse').show()
            $('.loginout').hide()
            if(resp.data.qq!=0){
                $('.logimg')[0].src=resp.data.log.userhimg
            }else {
                $('.logimg')[0].src=img+resp.data.log.userhimg
            }
            if(resp.data.bus.length===0){
                return location.href=error
            }else {
                if(resp.data.bus[0].businstatus=='审核中'){
                    return location.href=error
                }else {
                    $('.busuname').text(resp.data.bus[0].busname)
                }
            }
        }else{
            return location.href=error
        }
    })
})
setTimeout(function () {
    $('.load').fadeOut('slow');
},800)
laydate.render({
    elem: '#test9',
    type: 'date'
});
laydate.render({
    elem: '#test8',
    type: 'date'
});
$('.goout').click(function () {
    layer.open({
        content: '是否退出'
        ,btn: ['确认', '取消']
        ,yes: function(index, layero){
            axios.post(Logingetout).then(resp=>{
                if(resp.data==1)return location.href=indexout
            })
            layer.close(index);
        }
    });
})
$('.yul').click(function () {
    var formData = new FormData();
    formData.append("upImg",$('.pre')[0].files[0]);
    let config = {headers: {'Content-Type': 'multipart/form-data'}};
    axios.post(Alliance,formData,config).then(resp=>{
        if(resp.data==2)return layer.msg("不是通过HTTP POST上传的")
        if(resp.data==3)return layer.msg("图片大小不能超过1M！")
        $('.preview').show()
        $('.preview').attr('src',img+resp.data)
        $('.preview').attr('srcc',resp.data)
        layer.msg("图片上传成功！")
    })
})
$('.yul1').click(function () {
    var formData = new FormData();
    formData.append("upImg",$('.pre1')[0].files[0]);
    let config = {headers: {'Content-Type': 'multipart/form-data'}};
    axios.post(Alliance1,formData,config).then(resp=>{
        if(resp.data==2)return layer.msg("不是通过HTTP POST上传的")
        if(resp.data==3)return layer.msg("图片大小不能超过1M！")
        $('.preview1').show()
        $('.preview1').attr('src',img+resp.data)
        $('.preview1').attr('srcc',resp.data)
        layer.msg("图片上传成功！")
    })
})
function clear(){
    $('.spm1').val("");$(".spj1").val("");$('.kcsl1').val("");$('.preview').attr('srcc',"");$('.time').val("");$('.spxmz1').val("");$('.pre').val("");$('.preview').hide()
}
$('.pt').click(function(){
    clear()
    layer.open({
        type: 1,
        area: ['500px', '450px'],
        title: "发布普通商品",
        anim: 4,
        btn: ['确认', '取消'],
        content: $('.tkc1'),
        yes: function (index, layero) {
            //   商品名                       商品价格                  商品库存                      商品状态                 商品图片
            var name=$('.spm1').val().trim(),spi=$(".spj1").val().trim(),numb=$('.kcsl1').val().trim(),zt=$('.sxj1').val().trim(),img=$('.preview').attr('srcc'),time=$('.time').val().trim(),spsm=$('.spxmz1').val().trim();
            if(name!=='' && spi!=='' && numb!==""&& time!=="" && img!==''){
                axios.post(Recommodity,{
                    name,spi,numb,zt,img,time,spsm
                }).then(res=>{
                    if(res.data===1){
                        clear()
                        layer.msg('发布成功！');
                    }
                })
            }else{
                return layer.msg('请完善商品信息！');
            }
            layer.close(index);
        },
        btn2: function (index, layero) {
            clear()
            layer.close(index);
        },
        cancel:function (index, layero) {
            clear()
            layer.close(index);
        }
    });
})
$('.cx').click(function(){
    clear()
    layer.open({
        type: 1,
        offset:'120px',
        area: ['500px', '450px'],
        title: "发布活动商品",
        anim: 4,
        btn: ['确认', '取消'],
        content: $('.tkc1'),
        yes: function (index, layero) {
            //   商品名                       商品价格                  商品库存                      商品状态                 商品图片
            var name=$('.spm1').val().trim(),spi=$(".spj1").val().trim(),numb=$('.kcsl1').val().trim(),zt=$('.sxj1').val().trim(),img=$('.preview').attr('srcc'),time=$('.time').val().trim(),spsm=$('.spxmz1').val().trim();
            if(name!=='' && spi!=='' && numb!==""&& time!=="" && img!==''){
                axios.post(Reaccommodity,{
                    name,spi,numb,zt,img,time,spsm
                }).then(res=>{
                    if(res.data===1){
                        clear()
                        layer.msg('发布成功！');
                    }
                })
            }else{
                return layer.msg('请完善商品信息！');
            }
            layer.close(index);
        },
        btn2: function (index, layero) {
            clear()
            layer.close(index);
        },
        cancel:function (index, layero) {
            clear()
            layer.close(index);
        }
    });
})
$('.ggao').click(function(){
    axios.post(Readvertnum).then(res=>{
        if(res.data>5)return layer.msg('每个商家最多发送5条广告！');
        $('.spm').val("");$(".spj").val("");$('.preview1').attr('srcc','');$('.pre1').val("");$('.preview1').hide()
        layer.open({
            type: 1,
            offset:'100px',
            area: ['300px', '480px'],
            title: "发布广告",
            anim: 3,
            btn: ['确认', '取消'],
            content: $('.tkc'),
            yes: function (index, layero) {
                //   广告标题                       广告内容                 广告图片
                var name=$('.spm').val().trim(),spi=$(".spj").val().trim(),img=$('.preview1').attr('srcc');
                if(name!=='' && spi!=='' && img!==''){
                    axios.post(Readvert,{
                        name,spi,img
                    }).then(res=>{
                        if(res.data===1){
                            $('.spm').val("");$(".spj").val("");$('.preview1').attr('srcc','');$('.pre1').val("");$('.preview1').hide()
                            layer.msg('发布成功！');
                        }
                    })
                }else{
                    return layer.msg('请完善商品信息！');
                }
                layer.close(index);
            },
            btn2: function (index, layero) {
                $('.spm').val("");$(".spj").val("");$('.preview1').attr('srcc','');$('.pre1').val("");$('.preview1').hide()
                layer.close(index);
            },
            cancel:function (index, layero) {
                $('.spm').val("");$(".spj").val("");$('.preview1').attr('srcc','');$('.pre1').val("");$('.preview1').hide()
                layer.close(index);
            }
        });
    })
})