<template>
  <a-modal v-model="show" title="订单详情" @cancel="onClose" :width="800">
    <template slot="footer">
      <a-button key="back" @click="onClose" type="danger">
        关闭
      </a-button>
    </template>
    <div style="font-size: 13px" v-if="orderData !== null">
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">订单信息</span>
        </a-col>
        <a-col :span="8"><b>订单编号：</b>
          {{ orderData.code }}
        </a-col>
        <a-col :span="8"><b>价格：</b>
          {{ orderData.price }} 元
        </a-col>
        <a-col :span="8"><b>订单状态：</b>
          {{ orderData.orderStatus !== 0 ? '未使用' : '已销票' }}
        </a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>数 量：</b>{{ orderData.amount !== null ? orderData.amount + ' 张' : '- -' }}</a-col>
        <a-col :span="8"><b>下单时间：</b>{{ orderData.createDate !== null ? orderData.createDate : '- -' }}</a-col>
        <a-col :span="8"><b>销票时间：</b>{{ orderData.updateDate !== null ? orderData.updateDate : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>用户编号：</b>{{ orderData.userCode !== null ? orderData.userCode : '- -' }}</a-col>
        <a-col :span="8"><b>用户姓名：</b>{{ orderData.userName !== null ? orderData.userName : '- -' }}</a-col>
        <a-col :span="8"><b>联系方式：</b>{{ orderData.email !== null ? orderData.email : '- -'}}</a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">景点信息</span>
        </a-col>
        <a-col :span="8"><b>景点名称：</b>
          {{ orderData.scenicName }}
        </a-col>
        <a-col :span="8"><b>门票价格：</b>
          ￥{{ orderData.scenicPrice }}
        </a-col>
        <a-col :span="8"><b>具体地址：</b>
          <a-tooltip>
            <template slot="title">
              {{ orderData.address }}
            </template>
            {{ orderData.address.slice(0, 8) }} ...
          </a-tooltip>
        </a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>所属地区：</b>{{ orderData.area !== null ? orderData.area : '- -' }}</a-col>
        <a-col :span="8"><b>热 度：</b>{{ orderData.hot !== null ? orderData.hot : '- -' }}</a-col>
        <a-col :span="8"><b>等 级：</b>{{ orderData.level !== null ? orderData.level : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>游 量：</b>{{ orderData.sold !== null ? orderData.sold : '- -' }}点</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;"
             v-if="orderData.webImg !== null && orderData.webImg !== ''">
        <a-col :span="8">
          <a-popover>
            <template slot="content">
              <a-avatar shape="square" :size="132" icon="user" :src="orderData.webImg"/>
            </template>
            <a-avatar shape="square" :size="70" icon="user" :src="orderData.webImg"/>
          </a-popover>
        </a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">文化历史</span>
        </a-col>
        <a-col :span="24">{{ orderData.history !== null ? orderData.history : '暂无文化历史信息' }}</a-col>
      </a-row>
      <br/>
    </div>
  </a-modal>
</template>

<script>
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'OrderView',
  props: {
    orderShow: {
      type: Boolean,
      default: false
    },
    orderData: {
      type: Object
    }
  },
  computed: {
    show: {
      get: function () {
        return this.orderShow
      },
      set: function () {
      }
    }
  },
  data () {
    return {
      loading: false,
      nowPoint: null,
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  watch: {
    orderShow: function (value) {
      if (value) {
        if (value && this.orderData.images !== null && this.orderData.images !== '') {
          this.imagesInit(this.orderData.images)
        }
      }
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    picHandleChange ({ fileList }) {
      this.fileList = fileList
    },
    imagesInit (images) {
      if (images !== null && images !== '') {
        let imageList = []
        images.split(',').forEach((image, index) => {
          imageList.push({uid: index, name: image, status: 'done', url: 'http://127.0.0.1:9527/imagesWeb/' + image})
        })
        this.fileList = imageList
      }
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
