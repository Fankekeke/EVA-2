<template>
  <a-modal v-model="show" title="景点信息" @cancel="onClose" :width="800">
    <template slot="footer">
      <a-button key="back" @click="onClose" type="danger">
        关闭
      </a-button>
    </template>
    <div style="font-size: 13px" v-if="scenicData !== null">
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">基础信息</span>
        </a-col>
        <a-col :span="8"><b>景点名称：</b>
          {{ scenicData.scenicName }}
        </a-col>
        <a-col :span="8"><b>门票价格：</b>
          ￥{{ scenicData.scenicPrice }}
        </a-col>
        <a-col :span="8"><b>具体地址：</b>
          <a-tooltip>
            <template slot="title">
              {{ scenicData.address }}
            </template>
            {{ scenicData.address.slice(0, 8) }} ...
          </a-tooltip>
        </a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>所属地区：</b>{{ scenicData.area !== null ? scenicData.area : '- -' }}</a-col>
        <a-col :span="8"><b>热 度：</b>{{ scenicData.hot !== null ? scenicData.hot : '- -' }}</a-col>
        <a-col :span="8"><b>等 级：</b>{{ scenicData.level !== null ? scenicData.level : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>游 量：</b>{{ scenicData.sold !== null ? scenicData.sold : '- -' }}点</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;"
             v-if="scenicData.webImg !== null && scenicData.webImg !== ''">
        <a-col :span="8">
          <a-popover>
            <template slot="content">
              <a-avatar shape="square" :size="132" icon="user" :src="scenicData.webImg"/>
            </template>
            <a-avatar shape="square" :size="70" icon="user" :src="scenicData.webImg"/>
          </a-popover>
        </a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">文化历史</span>
        </a-col>
        <a-col :span="24">{{ scenicData.history !== null ? scenicData.history : '暂无文化历史信息' }}</a-col>
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

export default {
  name: 'ScenicView',
  props: {
    scenicShow: {
      type: Boolean,
      default: false
    },
    scenicData: {
      type: Object
    }
  },
  computed: {
    show: {
      get: function () {
        return this.scenicShow
      },
      set: function () {
      }
    }
  },
  data () {
    return {
      loading: false,
      nowPoint: null,
      studentList: []
    }
  },
  watch: {
    scenicShow: function (value) {
      if (value) {
        setTimeout(() => {
          baiduMap.initMap('areas')
          setTimeout(() => {
            this.local(this.scenicData)
          }, 500)
        }, 200)
      }
    }
  },
  methods: {
    local (scenic) {
      baiduMap.clearOverlays()
      baiduMap.rMap().enableScrollWheelZoom(true)
      // eslint-disable-next-line no-undef
      let point = new BMap.Point(scenic.point.split(',')[0], scenic.point.split(',')[1])
      baiduMap.pointAdd(point)
      baiduMap.findPoint(point, 16)
      // let driving = new BMap.DrivingRoute(baiduMap.rMap(), {renderOptions:{map: baiduMap.rMap(), autoViewport: true}});
      // driving.search(new BMap.Point(this.nowPoint.lng,this.nowPoint.lat), new BMap.Point(scenic.point.split(",")[0],scenic.point.split(",")[1]));
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
</style>
