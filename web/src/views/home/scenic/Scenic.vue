<template>
  <div>
    <a-form layout="horizontal">
      <a-row :gutter="15" style="margin: 0">
        <div>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="景点名称"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 17, offset: 2}">
              <a-input v-model="queryParams.scenicName"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item
              label="景区地址"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 17, offset: 2}">
              <a-input v-model="queryParams.address"/>
            </a-form-item>
          </a-col>
        </div>
        <span style="float: right; margin-top: 3px;">
            <a-button type="primary" @click="search">查询</a-button>
          </span>
      </a-row>
    </a-form>
    <a-row :gutter="15">
      <a-skeleton active v-if="loading" />
      <a-col :span="6" v-for="(item, index) in scenicData" :key="index" style="margin-top: 30px" v-if="!loading">
        <a-card hoverable bordered>
          <img
            slot="cover"
            alt="example"
            height="160"
            :src="item.webImg"
          />
          <template slot="actions" class="ant-card-actions">
            <a-icon key="shopping-cart" type="shopping-cart" @click="orderAdd(item)"/>
            <a-icon key="ellipsis" type="ellipsis" @click="view(item)"/>
          </template>
          <a-card-meta :title="item.scenicName">
            <template slot="description">
              {{ item.address.slice(0, 18) }}...
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <br/>
    <br/>
    <a-pagination :default-current="pagination.defaultCurrent" :defaultPageSize="pagination.defaultPageSize" :total="pagination.total" @change="pageChange" style="float: right"/>
    <scenic-info
      :scenicData="scenicView.data"
      :scenicShow="scenicView.visiable"
      @close="handlescenicViewClose">
    </scenic-info>
    <order-add
      :scenicData="orderView.data"
      :scenicShow="orderView.visiable"
      @close="handleOrderViewClose">
    </order-add>
  </div>
</template>

<script>
import ScenicInfo from './ScenicView'
import OrderAdd from './OrderAdd'
export default {
  name: 'Scenic',
  components: {ScenicInfo, OrderAdd},
  data () {
    return {
      queryParams: {},
      loading: false,
      scenicData: [],
      scenicView: {
        visiable: false,
        data: null
      },
      orderView: {
        visiable: false,
        data: null
      },
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 12,
        total: 0
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    view (record) {
      this.scenicView.data = record
      this.scenicView.visiable = true
    },
    handlescenicViewClose () {
      this.scenicView.visiable = false
    },
    orderAdd (record) {
      this.orderView.data = record
      this.orderView.visiable = true
    },
    handleOrderViewClose () {
      this.orderView.visiable = false
    },
    pageChange (page, pageSize) {
      this.pagination.defaultCurrent = page
      this.fetch({
        ...this.queryParams
      })
    },
    search () {
      this.fetch({
        ...this.queryParams
      })
    },
    fetch (params = {}) {
      // 显示loading
      this.loading = true
      params.size = this.pagination.defaultPageSize
      params.current = this.pagination.defaultCurrent
      this.$get('/cos/scenic-info/page', {
        ...params
      }).then((r) => {
        let data = r.data.data
        this.pagination.total = data.total
        this.scenicData = data.records
        // 数据加载完毕，关闭loading
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  /deep/ .ant-card-meta-title {
    font-size: 14px;
    margin-top: 10px;
  }
  /deep/ .ant-card-meta-description {
    font-size: 13px;
    margin-bottom: 8px;
  }
</style>
