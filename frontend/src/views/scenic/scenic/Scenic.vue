<template>
  <a-card :bordered="false" class="card-area">
    <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <a-row>
          <div :class="advanced ? null: 'fold'">
            <a-col :md="12" :sm="24">
              <a-form-item
                label="景点名称"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.scenicName"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item
                label="地址"
                :labelCol="{span: 4}"
                :wrapperCol="{span: 18, offset: 2}">
                <a-input v-model="queryParams.address"/>
              </a-form-item>
            </a-col>
          </div>
          <span style="float: right; margin-top: 3px;">
            <a-button type="primary" @click="search">查询</a-button>
            <a-button style="margin-left: 8px" @click="reset">重置</a-button>
<!--             <a @click="toggleAdvanced" style="margin-left: 8px">-->
<!--              {{advanced ? '收起' : '展开'}}-->
<!--              <a-icon :type="advanced ? 'up' : 'down'"/>-->
<!--            </a>-->
          </span>
        </a-row>
      </a-form>
    </div>
    <div>
      <div class="operator">
        <a-button type="primary" ghost @click="add" v-hasPermission="['user:add']">新增</a-button>
        <a-button @click="batchDelete" v-hasPermission="['user:delete']">删除</a-button>
        <!--        <a-dropdown v-hasAnyPermission="['user:reset','user:export']">-->
        <!--          <a-menu slot="overlay">-->
        <!--            <a-menu-item v-hasPermission="['user:reset']" key="password-reset" @click="resetPassword">密码重置</a-menu-item>-->
        <!--            <a-menu-item v-hasPermission="['user:export']" key="export-data" @click="exportExcel">导出Excel</a-menu-item>-->
        <!--          </a-menu>-->
        <!--          <a-button>-->
        <!--            更多操作-->
        <!--            <a-icon type="down"/>-->
        <!--          </a-button>-->
        <!--        </a-dropdown>-->
      </div>
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               :pagination="pagination"
               :loading="loading"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               :scroll="{ x: 900 }"
               @change="handleTableChange">
        <template slot="email" slot-scope="text, record">
          <a-popover placement="topLeft">
            <template slot="content">
              <div>{{text}}</div>
            </template>
            <p style="width: 150px;margin-bottom: 0">{{text}}</p>
          </a-popover>
        </template>
        <template slot="webImg" slot-scope="text, record">
          <img  style="width:100px;heigth:100px" slot="webImg" :src=record.webImg />
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-icon v-hasPermission="['user:update']" type="setting" theme="twoTone" twoToneColor="#4a9ff5"
                  @click="edit(record)" title="修改景点"></a-icon>
          <a-badge v-hasNoPermission="['user:update','user:view']" status="warning" text="无权限"></a-badge>
        </template>

      </a-table>
    </div>
    <!-- 用户信息查看 -->
    <!--    <user-info-->
    <!--      :userInfoData="userInfo.data"-->
    <!--      :userInfoVisiable="userInfo.visiable"-->
    <!--      @close="handleUserInfoClose">-->
    <!--    </user-info>-->
    <!-- 新增用户 -->
    <user-add
      @close="handleUserAddClose"
      @success="handleUserAddSuccess"
      :userAddVisiable="userAdd.visiable">
    </user-add>
    <!-- 修改用户 -->
    <user-edit
      ref="userEdit"
      @close="handleUserEditClose"
      @success="handleUserEditSuccess"
      :userEditVisiable="userEdit.visiable">
    </user-edit>
  </a-card>
</template>

<script>
  import DeptInputTree from '../../system/dept//DeptInputTree'
  import RangeDate from '@/components/datetime/RangeDate'
  import UserAdd from './ScenicAdd'
  import UserEdit from './ScenicEdit'

  export default {
    name: 'User',
    components: { UserAdd, UserEdit, DeptInputTree, RangeDate},
    data() {
      return {
        advanced: false,
        userInfo: {
          visiable: false,
          data: {}
        },
        userAdd: {
          visiable: false
        },
        userEdit: {
          visiable: false
        },
        queryParams: {},
        filteredInfo: null,
        sortedInfo: null,
        paginationInfo: null,
        dataSource: [],
        selectedRowKeys: [],
        loading: false,
        pagination: {
          pageSizeOptions: ['10', '20', '30', '40', '100'],
          defaultCurrent: 1,
          defaultPageSize: 10,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
        }
      }
    },
    computed: {
      columns() {
        let {sortedInfo, filteredInfo} = this
        sortedInfo = sortedInfo || {}
        filteredInfo = filteredInfo || {}
        return [{
          title: '景点名称',
          dataIndex: 'scenicName',
          sorter: (a, b) => a.scenicName.length - b.scenicName.length,
          sortOrder: sortedInfo.columnKey === 'scenicName' && sortedInfo.order
        }, {
          title: '票价',
          dataIndex: 'scenicPrice',
          customRender: (text, row, index) => {
            return "￥"+text
          },
        }, {
          title: '所在地',
          dataIndex: 'address',
          customRender: (text, row, index) => {
            return text.substr(0,15)+"..."
          },
        }, {
          title: '地区',
          dataIndex: 'area',
        },{
          title: '热度',
          dataIndex: 'hot',
          customRender: (text, row, index) => {
            return text.substr(0,7)
          },
        },{
          title: '等级',
          dataIndex: 'level',
        },{
          title: '游量',
          dataIndex: 'sold',
        },{
          title: '图片',
          dataIndex: 'webImg',
          scopedSlots: {customRender: 'webImg'}
        // customRender: (text, row, index) => {
          //   return '<img src='+text+'/>'
          // },
        }, {
          title: '文化历史',
          dataIndex: 'history',
          customRender: (text, row, index) => {
            return text.substr(0,25)+"..."
          },
        }, {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'}
        }]
      }
    },
    mounted() {
      this.fetch()
    },
    methods: {
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
        if (!this.advanced) {
          this.queryParams.createTimeFrom = ''
          this.queryParams.createTimeTo = ''
        }
      },
      view(record) {
        this.userInfo.data = record
        this.userInfo.visiable = true
      },
      add() {
        this.userAdd.visiable = true
      },
      handleUserAddClose() {
        this.userAdd.visiable = false
      },
      handleUserAddSuccess() {
        this.userAdd.visiable = false
        this.$message.success('新增景点成功')
        this.search()
      },
      edit(record) {
        this.$refs.userEdit.setFormValues(record)
        this.userEdit.visiable = true
      },
      handleUserEditClose() {
        this.userEdit.visiable = false
      },
      handleUserEditSuccess() {
        this.userEdit.visiable = false
        this.$message.success('修改景点成功')
        this.search()
      },
      handleUserInfoClose() {
        this.userInfo.visiable = false
      },
      handleTypeChange(value) {
        this.queryParams.accountType = value || ''
      },
      handleDateChange(value) {
        if (value) {
          this.queryParams.createTimeFrom = value[0]
          this.queryParams.createTimeTo = value[1]
        }
      },
      batchDelete() {
        if (!this.selectedRowKeys.length) {
          this.$message.warning('请选择需要删除的记录')
          return
        }
        let that = this
        this.$confirm({
          title: '确定删除所选中的记录?',
          content: '当您点击确定按钮后，这些记录将会被彻底删除',
          centered: true,
          onOk() {
            let ids = []
            for (let key of that.selectedRowKeys) {
              ids.push(that.dataSource[key].id)
            }
            that.$delete('/scenic/info/'+ids,).then(() => {
              that.$message.success('删除成功')
              that.selectedRowKeys = []
              that.search()
            })
          },
          onCancel() {
            that.selectedRowKeys = []
          }
        })
      },
      exportExcel() {
        let {sortedInfo, filteredInfo} = this
        let sortField, sortOrder
        // 获取当前列的排序和列的过滤规则
        if (sortedInfo) {
          sortField = sortedInfo.field
          sortOrder = sortedInfo.order
        }
        this.$export('user/excel', {
          sortField: sortField,
          sortOrder: sortOrder,
          ...this.queryParams,
          ...filteredInfo
        })
      },
      search() {
        let {sortedInfo, filteredInfo} = this
        let sortField, sortOrder
        // 获取当前列的排序和列的过滤规则
        if (sortedInfo) {
          sortField = sortedInfo.field
          sortOrder = sortedInfo.order
        }
        this.fetch({
          sortField: sortField,
          sortOrder: sortOrder,
          ...this.queryParams,
          ...filteredInfo
        })
      },
      reset() {
        // 取消选中
        this.selectedRowKeys = []
        // 重置分页
        this.$refs.TableInfo.pagination.current = this.pagination.defaultCurrent
        if (this.paginationInfo) {
          this.paginationInfo.current = this.pagination.defaultCurrent
          this.paginationInfo.pageSize = this.pagination.defaultPageSize
        }
        // 重置列过滤器规则
        this.filteredInfo = null
        // 重置列排序规则
        this.sortedInfo = null
        // 重置查询参数
        this.queryParams = {}
        // 清空部门树选择
        this.$refs.deptTree.reset()
        // 清空时间选择
        if (this.advanced) {
          this.$refs.createTime.reset()
        }
        this.fetch()
      },
      handleTableChange(pagination, filters, sorter) {
        // 将这三个参数赋值给Vue data，用于后续使用
        this.paginationInfo = pagination
        this.filteredInfo = filters
        this.sortedInfo = sorter

        this.userInfo.visiable = false
        this.fetch({
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...this.queryParams,
          ...filters
        })
      },
      fetch(params = {}) {
        // 显示loading
        this.loading = true
        if (this.paginationInfo) {
          // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
          this.$refs.TableInfo.pagination.current = this.paginationInfo.current
          this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize
          params.size = this.paginationInfo.pageSize
          params.current = this.paginationInfo.current
        } else {
          // 如果分页信息为空，则设置为默认值
          params.size = this.pagination.defaultPageSize
          params.current = this.pagination.defaultCurrent
        }
        this.$get('/scenic/info/page', {
          ...params
        }).then((r) => {
          let data = r.data.data
          const pagination = {...this.pagination}
          pagination.total = data.total
          this.dataSource = data.records
          this.pagination = pagination
          // 数据加载完毕，关闭loading
          this.loading = false
        })

      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../../static/less/Common";
</style>
