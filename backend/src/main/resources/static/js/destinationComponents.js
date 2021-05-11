/**
 * Created by Administrator on 2019\10\6 0006.
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
        updatedestination: function (key) {
            axios.post('getdetailinfo',{key})
                .then(function (resp) {
                    const res = resp.data;
                    const detailinfo = res.detailinfo;
                    layer.open({
                        type: 1,
                        skin: 'layui-layer-rim', //加上边框
                        area: ['500px', '400px'], //宽高
                        content: `<!--目的地修改-->
                                    <form action="upload" enctype="multipart/form-data" method="post" οnsubmit="return saveReport();">
                                        <div class="update" id="update-box">
                                            <h3>目的地修改</h3>
                                            <div class="update-box">
                                                <div class="update-left">目的地编号：</div>
                                                <div class="update-right">
                                                    <span class="id">${detailinfo[0].c_id}</span>
                                                </div>
                                            </div>
                                            <div class="update-box">
                                                <div class="update-left">目的地城市名称：</div>
                                                <div class="update-right">
                                                    <span class="id">${detailinfo[0].c_name}</span>
                                                </div>
                                            </div>
                                            <div class="update-box">
                                                <div class="update-left">目的地图片：</div>
                                                <div class="update-right">
                                                    <img src="${detailinfo[0].c_img}" style="width:50px;height:50px" class="previewImg" id="puTong_img" >
                                                    <input type="file" accept="" onchange="showPreview(this)" id="puTong_file">
                                                </div>
                                            </div>
                                            <div class="update-box">
                                                <div class="update-left">所属省份：</div>
                                                <div class="update-right">
                                                    <span class="id">${detailinfo[0].p_name}</span>
                                                </div>
                                            </div>
                                            <div class="update-box">
                                                <div class="update-left">目的地归类：</div>
                                                <div class="update-right">
                                                    <div class="name-div">${detailinfo[0].dc_name}</div>
                                                    <select name="classify" id="classify1">
                                                        <option value="1">热门目的地</option>
                                                        <option value="2">月份</option>
                                                        <option value="3">精选热门</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="update-box">
                                                <div class="update-left">目的地归类：</div>
                                                <div class="update-right">
                                                    <div class="name-div">${detailinfo[0].c_status}</div>
                                                    <select name="classify" id="status">
                                                        <option value="上架">上架</option>
                                                        <option value="下架">下架</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>`
                        ,btn:['确认修改']
                        ,btn1:function(){
                            var formData = new FormData();

                            var classify = $('#classify1').val();
                            var stute = $('#status').val();

                            formData.append('classify',classify);
                            formData.append('stute',stute);
                            formData.append('key',key);
                            //图片
                            formData.append("upImg",$('#puTong_file')[0].files[0]);
                            let config = {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            };
                            //{classify,key,stute}
                            axios.post('updatedestination',formData,config)
                                .then(function(resp){
                                    const res = resp.data;
                                    if(res.errcode == 0){
                                        layer.alert('修改成功', {
                                            skin: 'layui-layer-lan' //样式类名
                                            ,closeBtn: 0
                                            ,anim: 4
                                        }, function(){
                                            location.href = 'destinationView';
                                        });
                                    }else {
                                        layer.msg = (res.errmsg);
                                    }
                                })
                        }
                    });
                })
                .catch(function(err){
                    console.log(err);
                });
            axios.get('getarea')
                .then(function(resp) {
                    const res = resp.data;
                    if (res.errcode == 0) {
                        var updatebox = new Vue({
                            el: "#update-box",
                            data: {
                                updateclassify: res.classify
                            }
                        });
                    }else {
                        layer.msg(res.errmsg);
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        /*删除*/
        deletedestination: function (key) {
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
                                location.href = 'destinationView';
                            });
                        }else {
                            layer.msg('删除失败');
                        }
                    })
            }, function(){

            });
        }
    },
    template:`<tr>
                <td>{{list.c_name}}</td>
                <td>
                    <img :src="list.c_img" style="width: 50px;height: 50px;">
                </td>
                <td>{{list.p_name}}</td>
                <td>{{list.dc_name}}</td>
                <td>{{list.c_status}}</td>
                <td>
                    <input type="button" :jsh="key"  class="btn btn-info" @click="updatedestination(list.c_id)" value="修改">
                    <input type="button" class="btn btn-danger" value="删除" @click="deletedestination(list.c_id)">
                </td>
             </tr>`
});
//图片 进行预览
function showPreview(source){
    var file = source.files[0];//图片源文件
    if (window.FileReader ){//FileReader 全局对象  IE BOM
        var fr = new FileReader();
        fr.onload = function(event){
            document.getElementById("puTong_img").src = event.target.result;
        };
        fr.readAsDataURL(file);//将文件读取为DataURL
    }else {
        alert("浏览器不兼容");
    }
}