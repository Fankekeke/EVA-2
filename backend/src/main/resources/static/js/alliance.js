$(function () {
    axios.post(Allogin).then(resp=>{
        if(resp.data===0)return location.href=Alindex
        if (resp.data.length!=0)return location.href=Alindex
    })
})
$('.yul').click(function () {
    var formData = new FormData();
    formData.append("upImg",$('.pre')[0].files[0]);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    axios.post(Alliance,formData,config).then(resp=>{
        if(resp.data==2)return layer.msg("不是通过HTTP POST上传的")
        if(resp.data==3)return layer.msg("图片大小不能超过1M！")
        console.log(resp.data)
        $('.preview').show()
        $('.preview').attr('src',imgurl+resp.data)
        $('.preview').attr('srcc',resp.data)
        layer.msg("图片上传成功！")
    })
})
$('.allok').click(function () {
    $('.perr').empty();
    var cont=$('.exactsm').val().trim(),bname=$('.exabuname').val().trim(),name=$('.exaname').val().trim(),type=$('.exatype').val().trim(),mail=$('.examail').val().trim(),phone=$('.exaphone').val().trim(),add=$('.exaadd').val().trim(),img=$('.preview').attr('srcc')
    if(bname==''||name==''||type==''||mail==''||phone==''||add==''||img=='')return $('.perr').append('<span class="glyphicon glyphicon-remove-sign"></span>审核信息不完整！');
    var engli = pinyin(bname,2, false, true,'');
    axios.post(Almsg,{
        bname:bname,name:name,type:type,mail:mail,phone:phone,add:add,img:img,cont:cont,engli:engli
    }).then(resp=>{
        if(resp.data===1)layer.msg('上传成功！工作人员将在24小时内完成审核！')
        setTimeout(function () {
            location.href=Alsale
        })
    })
})