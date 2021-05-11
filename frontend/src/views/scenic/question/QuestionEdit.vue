<template>
  <a-drawer
    title="修改公告"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="userEditVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">

    <a-form :form="form">
      <a-form-item label='景点名称' v-bind="formItemLayout">
        <a-input v-decorator="[
        'scenicName',
        { rules: [{ required: true, message: '请输入名称!' }] }
        ]"/>
      </a-form-item>
      <a-form-item label='票价' v-bind="formItemLayout">
        <a-input-number :min="0" :step="0.1" v-decorator="[
        'scenicPrice',
        { rules: [{ required: true, message: '请输入票价!' }] }
        ]" />
      </a-form-item>
      <a-form-item label='所在地' v-bind="formItemLayout">
        <a-input v-decorator="[
        'address'
        ]"/>
      </a-form-item>
      <a-form-item label='历史文化' v-bind="formItemLayout">
        <a-textarea v-decorator="[
        'history'
        ]" :rows="4" />
      </a-form-item>
      <a-form-item label='外链图片' v-bind="formItemLayout">
        <a-input v-decorator="[
        'webImg'
        ]"/>
      </a-form-item>

    </a-form>

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
    data() {
      return {
        formItemLayout,
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
      //this.getMock();
      // this.getAppInfo();
      // this.getRoleInfo();
      // this.getMenuInfoByTree();
    },
    methods: {
      ...mapMutations({
        setUser: 'account/setUser'
      }),
      onClose() {
        this.loading = false
        this.form.resetFields()
        this.$emit('close')
      },
      setFormValues({...user}) {
        this.userId = user.id
        let fields = ['scenicName', 'scenicPrice','address','history','webImg']
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
            user.id = this.userId;
            this.$put('/scenic/info', {
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
