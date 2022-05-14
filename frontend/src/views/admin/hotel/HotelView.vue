<template>
  <a-modal v-model="show" title="旅店信息" @cancel="onClose" :width="800">
    <template slot="footer">
      <a-button key="back" @click="onClose" type="danger">
        关闭
      </a-button>
    </template>
    <div style="font-size: 13px" v-if="hotelData !== null">
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">基础信息</span>
        </a-col>
        <a-col :span="8"><b>旅店名称：</b>
          {{ hotelData.name }}
        </a-col>
        <a-col :span="8"><b>标 签：</b>
          {{ hotelData.tag }}
        </a-col>
        <a-col :span="8"><b>具体地址：</b>
          <a-tooltip>
            <template slot="title">
              {{ hotelData.address }}
            </template>
            {{ hotelData.address.slice(0, 8) }} ...
          </a-tooltip>
        </a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;"
             v-if="hotelData.images !== null && hotelData.images !== ''">
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
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">酒店政策</span>
        </a-col>
        <a-col :span="24" style="line-height: 25px">{{ hotelData.policy !== null ? hotelData.policy : '暂无信息' }}</a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">酒店备注</span>
        </a-col>
        <a-col :span="24" style="line-height: 25px">{{ hotelData.content !== null ? hotelData.content : '暂无信息' }}</a-col>
      </a-row>
      <br/>
      <br/>
      <div style="padding-left: 8px;padding-right: 8px;">
        <a-card :bordered="false" style="height: 400px">
          <div id="areas" style="width: 100%;height: 350px;box-shadow: 0 0 0 10px white;outline: dashed 8px #009688;"></div>
        </a-card>
      </div>
    </div>
  </a-modal>
</template>

<script>
import baiduMap from '@/utils/map/baiduMap'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  name: 'hotelView',
  props: {
    hotelShow: {
      type: Boolean,
      default: false
    },
    hotelData: {
      type: Object
    }
  },
  computed: {
    show: {
      get: function () {
        return this.hotelShow
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
    hotelShow: function (value) {
      if (value) {
        if (value && this.hotelData.images !== null && this.hotelData.images !== '') {
          this.imagesInit(this.hotelData.images)
        }
        setTimeout(() => {
          baiduMap.initMap('areas')
          setTimeout(() => {
            this.local(this.hotelData)
          }, 500)
        }, 200)
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
    local (hotel) {
      baiduMap.clearOverlays()
      baiduMap.rMap().enableScrollWheelZoom(true)
      // eslint-disable-next-line no-undef
      let point = new BMap.Point(hotel.point.split(',')[0], hotel.point.split(',')[1])
      baiduMap.pointAdd(point)
      baiduMap.findPoint(point, 16)
      // let driving = new BMap.DrivingRoute(baiduMap.rMap(), {renderOptions:{map: baiduMap.rMap(), autoViewport: true}});
      // driving.search(new BMap.Point(this.nowPoint.lng,this.nowPoint.lat), new BMap.Point(hotel.point.split(",")[0],hotel.point.split(",")[1]));
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
