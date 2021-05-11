/**
 * Created by Administrator on 2019\10\4 0004.
 */
//分页组件
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
                  <ul class="pagination">
                    <li>
                      <a href="#" aria-label="Previous" @click="uppage(nowpage)" >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>

                    <template v-for="val in showpagearr">
                      <li :class=" val === nowpage ? 'active' : '' " >
                        <a href="###" @click="changepage(val)" >{{val}}</a>
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

//获取列表组件
Vue.component('vue-lists',{
    props:{
        list:{
            type:Object
        }
    },
    methods:{
        /*修改*/
        update(id){
            //点击获取当前的id
            var that = this;
            axios.post('getsceneryinfo',{
                id
            }).then(function (response) {
                const info = response.data;
                if (info.errcode == 0){
                    const sceneryinfo = info.sceneryinfo;
                    layer.open({
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['500px', '550px'], //宽高
                        content: `<!--修改-->
                        <form action="upload" enctype="multipart/form-data" method="post" οnsubmit="return saveReport();">
                                <div class="update" id="update-box">
                                    <h3>景点修改</h3>
                                    <div class="update-box">
                                        <div class="left">景点编号：</div>
                                        <div class="right">
                                            <span class="id">${sceneryinfo[0].s_id}</span>
                                        </div>
                                    </div>
                                    <div class="update-box">
                                        <div class="left">景点图片：</div>

                                        <div class="right">
                                            <img src="${sceneryinfo[0].s_img}" style="width:50px;height:50px" class="previewImg" id="puTong_img" >

                                            <input type="file" accept="" onchange="showPreview(this)" id="puTong_file">

                                        </div>




                                    </div>
                                    <div class="update-box">
                                        <div class="left">景点名称：</div>
                                        <div class="right">
                                            <input class="sceneryname" type="text" value="${sceneryinfo[0].s_name}" >
                                        </div>
                                    </div>
                                    <div class="update-box">
                                        <div class="left">景点简介：</div>
                                        <div class="right">
                                            <div class="sceneryintro" contenteditable="true">${sceneryinfo[0].s_intro}</div>
                                        </div>
                                    </div>
                                    <div class="update-box">
                                        <div class="left">景点地址：</div>
                                        <div class="right">
                                            <input class="sceneraddress" type="text" value="${sceneryinfo[0].s_site}" >
                                        </div>
                                    </div>
                                    <div class="update-box">
                                        <div class="left">联系电话：</div>
                                        <div class="right">
                                            <input type="text" class="phone" blur="blurTel()" value="${sceneryinfo[0].s_phone}">
                                        </div>
                                    </div>
                                    <div class="update-box">
                                        <div class="left">景点收藏数：</div>
                                        <div class="right">
                                            <span>7</span>
                                        </div>
                                    </div>
                                    <div class="update-box">
                                        <div class="left">状态：</div>
                                        <div class="right">
                                            <span>${sceneryinfo[0].s_status}</span>

                                            <select id="up-down">
                                                <option>下架</option>
                                                <option>上架</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="update-btn">
                                <button type="button" class="btn btn-info confirm" >确认修改</button>
                            </div>`
                    });

                    function blurTel() {
                        var val = $('.phone').val();
                        var res = checkTel(val);
                        if(res !== true) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    /*确认修改按钮*/
                    $('.confirm').click(function () {
                        //formData上传数据
                        var formData = new FormData();
                        //获取数据
                        var id = $('.id').html();
                        var name = $('.sceneryname').val();
                        var intro = $('.sceneryintro').html();
                        var address = $('.sceneraddress').val();
                        var tel = $('.phone').val();
                        var updown = $('#up-down').val();

                        formData.append("id",id);
                        formData.append("name",name);
                        formData.append("intro",intro);
                        formData.append("address",address);
                        formData.append("tel",tel);
                        formData.append("updown",updown);
                        //图片
                        formData.append("upImg",$('#puTong_file')[0].files[0]);

                        if(!blurTel()) {
                            layer.msg('手机号码格式不正确!');
                            return false;
                        }
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        };
                        axios.post('scenerychange',formData,config)
                            .then(function (resp) {
                                layer.alert('修改成功', {
                                    skin: 'layui-layer-lan' //样式类名
                                    ,closeBtn: 0
                                    ,anim: 4
                                }, function(){
                                    location.href = 'sceneryManage';
                                });
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    });

                }else {
                    layer.msg(info.errmsg);
                }
            })
        },
        /*删除*/
        deletescenery(key){

            layer.confirm('确认删除？', {
                btn: ['确认','取消'] //按钮
            }, function(){
                axios.post('delete',{key})
                    .then(function(resp){
                        const res = resp.data;
                        console.log(res);
                        if(res.errcode == 0){
                            layer.alert('删除成功', {
                                skin: 'layui-layer-lan' //样式类名
                                ,closeBtn: 0
                                ,anim: 4
                            }, function(){
                                location.href = 'sceneryManage';
                            });
                        }else {
                            layer.msg('删除失败');
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            }, function(){

            });
        }
    },
    template:`<tr>
                <td>{{list.s_id}}</td>
                <td>{{list.s_name}}</td>
                <td>
                <!--<img src="../../../../public/static/images/month1-img1.jpg" style="width: 50px;height: 50px;">-->
                    <input type="image" id="scenery-img" :src="list.s_img" >
                </td>
                <td>{{list.s_intro}}</td>
                <td>{{list.s_site}}</td>
                <td>{{list.s_status}}</td>
                <td>{{list.c_name}}</td>
                <td>
                    <input type="button" class="btn btn-info" @click="update(list.s_id)" value="修改">
                    <input type="button" class="btn btn-danger" value="删除" @click="deletescenery(list.s_id)">
                </td>
            </tr>`
});
//图片 进行预览
function showPreview(source){
    //console.log(source);
    var file = source.files[0];//图片源文件
    if (window.FileReader ){//FileReader 全局对象  IE BOM
        var fr = new FileReader();
        fr.onload = function(event){
            document.getElementById("puTong_img").src = event.target.result;
        };
        fr.readAsDataURL(file);//将文件读取为DataURL
//                $('#puTong_img').attr("src",$imgPath);
    }else {
        alert("浏览器不兼容");
    }
}
function checkTel(tel) {
    if(tel === null) return '手机号码不能为空!';
    tel = tel.trim();
    if(tel == '') return '手机号码不能为空!';
    var reg = /^1[34578]\d{9}$/;
    if(!reg.test(tel)) return '手机号码格式不正确!';
    return true;
}
function checkName(name) {
    if(name === null) return '手机号码不能为空!';
    name = name.trim();
    if(name == '') return '手机号码不能为空!';
    return true;
}
function checkAddress(name) {
    if(name === null) return '手机号码不能为空!';
    name = name.trim();
    if(name == '') return '手机号码不能为空!';
    return true;
}