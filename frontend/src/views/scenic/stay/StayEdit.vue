<template>
  <a-drawer
    title="修改旅店"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="userEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">

    <a-form :form="form">
      <a-form-item label='旅店名称' v-bind="formItemLayout">
        <a-input v-decorator="[
        'stayName',
        { rules: [{ required: true, message: '请输入名称!' }] }
        ]"/>
      </a-form-item>
      <a-form-item label='价格' v-bind="formItemLayout">
        <a-input-number :min="0" :step="0.1" v-decorator="[
        'stayPrice',
        { rules: [{ required: true, message: '请输入价格!' }] }
        ]" />
      </a-form-item>
      <a-form-item label='旅店地址' v-bind="formItemLayout">
        <a-input style="width: 70%" v-decorator="[
        'stayAddress'
        ]"/>
        <a-button type="primary" style="width: 30%" @click="showChildrenDrawer">
          选择地址
        </a-button>
      </a-form-item>
      <a-form-item label='外链图片' v-bind="formItemLayout">
        <a-input v-decorator="[
        'webImg'
        ]"/>
      </a-form-item>

    </a-form>

    <drawerMap :childrenDrawerShow="childrenDrawer" @handlerClosed="handlerClosed"></drawerMap>

    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？" @confirm="onClose" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
  import baiduMap from '@/utils/map/baiduMap'
  import drawerMap from '@/utils/map/searchmap/drawerMap'
  import {mapState, mapMutations} from 'vuex'

  const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 18}
  }
  export default {
    name: 'UserEdit',
    props: {
      userEditVisiable: {
        default: false
      }
    },
    components: {
      drawerMap
    },
    data() {
      return {
        mapId: 'area',
        cardShow: false,
        localPoint: {},
        stayAddress: '',
        local: '',
        localData: [],
        formItemLayout,
        childrenDrawer: false,
        account: {},
        form: this.$form.createForm(this),
        deptTreeData: [],
        keychecks: [],
        roleData: [],
        menuKeys: [],
        userDept: [],
        mockData: [],
        targetKeys: [],
        appInfoData: [],
        roleInfoData: [],
        roleKeys: [],
        orgInfoData: [],
        menuInfoData: [],
        userId: '',
        loading: false
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.account.user
      })
    },
    created() {

    },
    methods: {
      ...mapMutations({
        setUser: 'account/setUser'
      }),
      handlerClosed(localPoint) {
        this.childrenDrawer = false;
        if(localPoint !=null && localPoint != undefined) {
          this.localPoint = localPoint;

          let address = baiduMap.getAddress(localPoint);
          address.getLocation(localPoint, (rs) => {
            if(rs != null) {
              if(rs.address != undefined && rs.address.length != 0) {
                this.stayAddress = rs.address;
              }
              if(rs.surroundingPois != undefined) {
                if(rs.surroundingPois.address != undefined && rs.surroundingPois.address.length != 0) {
                  this.stayAddress = rs.surroundingPois.address;
                }
              }

              this.form.getFieldDecorator("stayAddress")
              let obj = {}
              obj["stayAddress"] = this.stayAddress
              this.form.setFieldsValue(obj)

            }
          });
        }
      },
      addPoint(point) {
        this.localPoint = point;
      },
      onSearch() {
        let localData = new Array();
        var options = {
          onSearchComplete: (results) =>{
            // 判断状态是否正确
            if (local.getStatus() == BMAP_STATUS_SUCCESS){
              for (var i = 0; i < results.getCurrentNumPois(); i ++){
                if(i==0) {
                  setTimeout(() => {
                    baiduMap.findPoint(results.getPoi(0).point,15);
                  }, 10);
                }
                localData.push(results.getPoi(i));
                if(results.getPoi(i).point != undefined) {
                  baiduMap.localPointAdd(results.getPoi(i));
                }
              }
              this.localData = localData;
              this.cardShow = true;
            }
          }
        };
        var local = new BMap.LocalSearch(baiduMap.rMap(), options);
        local.search(this.local);
      },
      showChildrenDrawer() {
        this.childrenDrawer = true;
      },
      onChildrenDrawerClose() {
        this.childrenDrawer = false
      },
      onClose() {
        this.loading = false
        this.form.resetFields()
        this.$emit('close')
      },
      setFormValues({...user}) {
        this.userId = user.id
        let fields = ['stayName', 'stayPrice','stayAddress','webImg']
        Object.keys(user).forEach((key) => {
          if (fields.indexOf(key) !== -1) {
            this.form.getFieldDecorator(key)
            let obj = {}
            obj[key] = user[key]
            this.form.setFieldsValue(obj)
          }
        })
      },
      onDeptChange(value) {
        this.userDept = value
      },
      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loading = true
            let user = this.form.getFieldsValue()
            user.point = JSON.stringify(this.localPoint);
            user.id = this.userId;
            this.$put('/scenic/stay-info', {
              ...user
            }).then((r) => {
              this.loading = false
              this.$emit('success')
            }).catch(() => {
              this.loading = false
            })
          }
        })
      },
      filterOption(inputValue, option) {
        return option.description.indexOf(inputValue) > -1;
      },
      handleChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.targetKeys = targetKeys;
      },
      handleChanges(targetKeys, direction, moveKeys) {
        this.roleKeys = targetKeys;
      },
      handleSearch(dir, value) {
        console.log('search:', dir, value);
      },
      onSelect(keys) {
        this.menuKeys = keys,
          console.log('Trigger Select', keys);
      },
      onCheck(checkedKeys, e) {
        console.log(JSON.stringify(checkedKeys));
      },
    },
    watch: {
      userEditVisiable() {
        if (this.userEditVisiable) {
          this.$get('role').then((r) => {
            this.roleData = r.data.rows
          })
          this.$get('dept').then((r) => {
            this.deptTreeData = r.data.rows.children
          })
        }
      }
    }
  }
</script>

<style scoped>
  #area {
    width: 100%;
    height: 400px;
    padding: 0;
    margin: 0;
  }
</style>
