<template>
  <a-drawer
    title="修改景点"
    :maskClosable="false"
    width=850
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="userEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form" layout="vertical">
      <a-row :gutter="10">
        <a-col :span="12">
          <a-form-item label='景点名称'>
            <a-input v-decorator="[
            'scenicName',
            { rules: [{ required: true, message: '请输入名称!' }] }
            ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label='票价'>
            <a-input-number style="width: 100%" :min="0" :step="0.1" v-decorator="[
            'scenicPrice',
            { rules: [{ required: true, message: '请输入票价!' }] }
            ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label='所在地'>
            <a-input style="width: 70%" v-decorator="[
            'address'
            ]"/>
            <a-button type="primary" style="width: 30%" @click="showChildrenDrawer">
              选择地址
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label='地区'>
            <a-input v-decorator="[
            'area',
            ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="24"></a-col>
        <a-col :span="12">
          <a-form-item label='热度'>
            <a-input v-decorator="[
            'hot',
            ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label='景区等级'>
            <a-select v-decorator="[
                'level',
                ]">
              <a-select-option value="4A景区">4A景区</a-select-option>
              <a-select-option value="5A景区">5A景区</a-select-option>
              <a-select-option value="6A景区">6A景区</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label='游量/日'>
            <a-input-number style="width: 100%" :min="0" :step="0.1" v-decorator="[
            'sold',
            { rules: [{ required: true, message: '请输入游量/日!' }] }
            ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label='外链图片'>
            <a-input v-decorator="[
            'webImg'
            ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label='历史文化'>
            <a-textarea v-decorator="[
            'history'
            ]" :rows="4"/>
          </a-form-item>
        </a-col>
      </a-row>
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
import {mapState, mapMutations} from 'vuex'
import baiduMap from '@/utils/map/baiduMap'
import drawerMap from '@/utils/map/searchmap/drawerMap'

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
  data () {
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
  components: {
    drawerMap
  },
  created () {

  },
  methods: {
    ...mapMutations({
      setUser: 'account/setUser'
    }),
    handlerClosed (localPoint) {
      this.childrenDrawer = false
      if (localPoint != null && localPoint !== undefined) {
        this.localPoint = localPoint

        let address = baiduMap.getAddress(localPoint)
        address.getLocation(localPoint, (rs) => {
          if (rs != null) {
            if (rs.address !== undefined && rs.address.length !== 0) {
              this.stayAddress = rs.address
            }
            if (rs.surroundingPois !== undefined) {
              if (rs.surroundingPois.address !== undefined && rs.surroundingPois.address.length !== 0) {
                this.stayAddress = rs.surroundingPois.address
              }
            }

            this.form.getFieldDecorator('address')
            let obj = {}
            obj['address'] = this.stayAddress
            this.form.setFieldsValue(obj)
          }
        })
      }
    },
    addPoint (point) {
      this.localPoint = point
    },
    onSearch () {
      let localData = []
      var options = {
        onSearchComplete: (results) => {
          // 判断状态是否正确
          // eslint-disable-next-line no-undef,eqeqeq
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              if (i === 0) {
                setTimeout(() => {
                  baiduMap.findPoint(results.getPoi(0).point, 15)
                }, 10)
              }
              localData.push(results.getPoi(i))
              if (results.getPoi(i).point !== undefined) {
                baiduMap.localPointAdd(results.getPoi(i))
              }
            }
            this.localData = localData
            this.cardShow = true
          }
        }
      }
      // eslint-disable-next-line no-undef
      var local = new BMap.LocalSearch(baiduMap.rMap(), options)
      local.search(this.local)
    },
    onClose () {
      this.loading = false
      this.form.resetFields()
      this.$emit('close')
    },
    showChildrenDrawer () {
      this.childrenDrawer = true
    },
    onChildrenDrawerClose () {
      this.childrenDrawer = false
    },
    setFormValues ({...user}) {
      this.userId = user.id
      let fields = ['scenicName', 'scenicPrice', 'address', 'history', 'webImg', 'sold', 'level', 'hot', 'area']
      Object.keys(user).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = user[key]
          this.form.setFieldsValue(obj)
        }
      })
    },
    onDeptChange (value) {
      this.userDept = value
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          let user = this.form.getFieldsValue()
          if (this.localPoint.lng !== undefined && this.localPoint.lat !== undefined) {
            user.point = this.localPoint.lng.toString() + ',' + this.localPoint.lat
          }
          user.id = this.userId
          this.$put('/cos/scenic-info', {
            ...user
          }).then((r) => {
            this.loading = false
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
