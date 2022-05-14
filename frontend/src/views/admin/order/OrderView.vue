<template>
  <a-modal v-model="show" title="订单详情" @cancel="onClose" :width="800">
    <template slot="footer">
      <a-button key="back" @click="onClose" type="danger">
        关闭
      </a-button>
    </template>
    <div style="font-size: 13px" v-if="orderData !== null">
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">基础信息</span>
        </a-col>
        <a-col :span="8"><b>订单编号：</b>
          {{ orderData.code }}
        </a-col>
        <a-col :span="8"><b>价格：</b>
          {{ orderData.price }} 元
        </a-col>
        <a-col :span="8"><b>入住天数：</b>
          {{ orderData.dayNum }} 天
        </a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>入住时间：</b>{{ orderData.startDate !== null ? orderData.startDate : '- -' }}</a-col>
        <a-col :span="8"><b>退房时间：</b>{{ orderData.endDate !== null ? orderData.endDate : '- -' }}</a-col>
        <a-col :span="8"><b>下单时间：</b>{{ orderData.createDate !== 0 ? orderData.createDate : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>当前状态：</b>{{ orderData.orderStatus !== 0 ? '已入住' : '未入住' }}</a-col>
        <a-col :span="8"><b>入住人：</b>{{ orderData.userName }}</a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">房间信息</span>
        </a-col>
        <a-col :span="8"><b>房间名称：</b>
          {{ orderData.name }}
        </a-col>
        <a-col :span="8"><b>房间面积：</b>
          {{ orderData.area }} ㎡
        </a-col>
        <a-col :span="8"><b>所属旅店：</b>{{ orderData.hotelName !== null ? orderData.hotelName : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>地 址：</b>{{ orderData.address !== null ? orderData.address : '- -' }}</a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">房间备注</span>
        </a-col>
        <a-col :span="24" style="line-height: 25px">{{ orderData.content !== null ? orderData.content : '暂无信息' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;"
             v-if="orderData.images !== null && orderData.images !== ''">
        <a-col :span="24">
          <a-upload
            name="avatar"
            action="http://127.0.0.1:9527/file/fileUpload/"
            list-type="picture-card"
            disabled
            :file-list="fileList"
            @preview="handlePreview"
            @change="picHandleChange"
          >
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-col>
      </a-row>
      <br/>
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
