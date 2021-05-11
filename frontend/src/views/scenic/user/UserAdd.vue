<template>
  <a-drawer
    title="新增用户"
    :maskClosable="false"
    width=650
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="userAddVisiable"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">


    <a-form :form="form">
      <a-form-item label='用户名称' v-bind="formItemLayout">
        <a-input v-decorator="[
        'name',
        { rules: [{ required: true, message: '请输入名称!' }] }
        ]"/>
      </a-form-item>
      <a-form-item label='电子邮箱' v-bind="formItemLayout">
        <a-input v-decorator="[
        'email',
        { rules: [{ required: true, message: '请输入邮箱!' }] }
        ]"/>
      </a-form-item>
      <a-form-item label='住址' v-bind="formItemLayout">
        <a-input v-decorator="[
        'address'
        ]"/>
      </a-form-item>
      <a-form-item label='性别' v-bind="formItemLayout">
        <a-select v-decorator="[
        'sex'
        ]">
          <a-select-option value="0">男</a-select-option>
          <a-select-option value="1">女</a-select-option>
        </a-select>
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
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 }
  }
  export default {
    name: 'UserAdd',
    props: {
      userAddVisiable: {
        default: false
      }
    },
    data () {
      return {
        user: {
          accountCode: '',
          accountPwd: '',
          accountName: '',
          expireDate: '',
          accountStatus: '',
          defaultApp: ''
        },
        dateFormat: 'YYYY/MM/DD',
        loading: false,
        roleData: [],
        deptTreeData: [],
        mockData: [],
        targetKeys: [],
        appInfoData: [],
        roleInfoData: [],
        roleKeys: [],
        menuInfoData: [],
        orgInfoData: [],
        accountInfo: [],
        menuKeys: [],
        formItemLayout,
        defaultPassword: '1234qwer',
        form: this.$form.createForm(this),
        validateStatus: '',
        help: ''
      }
    },
    mounted() {
      //this.getMock();
      //this.getAppInfo();
      //this.getRoleInfo();
      //this.getMenuInfo();
      //this.getOrgInfo();
      //this.getAccountInfo();
    },
    methods: {
      reset () {
        this.loading = false
        this.form.resetFields()
      },
      onClose () {
        this.reset()
        this.$emit('close')
      },
      handleSubmit () {

        this.form.validateFields((err, values) => {
          if (!err) {
            this.loading = true
            this.$post('/scenic/user-info', {
              ...values
            }).then((r) => {
              this.reset()
              this.$emit('success')
            }).catch(() => {
              this.loading = false
            })

          }
        })
      },
      handleUserNameBlur () {
        let username = this.user.username.trim()
        if (username.length) {
          if (username.length > 10) {
            this.validateStatus = 'error'
            this.help = '用户名不能超过10个字符'
          } else if (username.length < 4) {
            this.validateStatus = 'error'
            this.help = '用户名不能少于4个字符'
          } else {
            this.validateStatus = 'validating'
            this.$get(`user/check/${username}`).then((r) => {
              if (r.data) {
                this.validateStatus = 'success'
                this.help = ''
              } else {
                this.validateStatus = 'error'
                this.help = '抱歉，该用户名已存在'
              }
            })
          }
        } else {
          this.validateStatus = 'error'
          this.help = '用户名不能为空'
        }
      },
      getMock() {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
          const data = {
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            chosen: Math.random() * 2 > 1,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
          mockData.push(data);
        }
        this.mockData = mockData;
        this.targetKeys = targetKeys;
      },
      filterOption(inputValue, option) {
        return option.description.indexOf(inputValue) > -1;
      },
      handleChange(targetKeys, direction, moveKeys) {
        this.targetKeys = targetKeys;
      },
      handleChanges(targetKeys, direction, moveKeys) {
        this.roleKeys = targetKeys;
      },
      handleSearch(dir, value) {
        console.log('search:', dir, value);
      },
      onSelect(keys) {
        this.menuKeys = keys;
        console.log('Trigger Select', keys);
      },
      onCheck(checkedKeys, e) {
        console.log(JSON.stringify(checkedKeys));
      },
    },
    watch: {
      userAddVisiable () {
        if (this.userAddVisiable) {
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
