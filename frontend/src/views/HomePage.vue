<template>
  <div :class="[multipage === true ? 'multi-page':'single-page', 'not-menu-page', 'home-page']">
    <a-row :gutter="8" class="head-info">
      <a-card class="head-info-card">
        <a-col :span="12">
          <div class="head-info-avatar">
            <img alt="头像" :src="avatar">
          </div>
          <div class="head-info-count">
            <div class="head-info-welcome">
              {{ welcomeMessage }}
            </div>
            <div class="head-info-desc">
              <p>{{ user.roleName ? user.roleName : '暂无角色' }}</p>
            </div>
            <div class="head-info-time">上次登录时间：{{ user.lastLoginTime ? user.lastLoginTime : '第一次访问系统' }}</div>
          </div>
        </a-col>
        <a-col :span="12">
          <div>
            <a-row class="more-info" v-if="user.roleId == 75 && !loading">
              <a-col :span="4"></a-col>
              <a-col :span="4"></a-col>
              <a-col :span="4"></a-col>
              <a-col :span="4">
                <head-info title="总收益" :content="orderInfoByHotel.price" :center="false" :bordered="false"/>
              </a-col>
              <a-col :span="4">
                <head-info title="订单数量" :content="orderInfoByHotel.num" :center="false" :bordered="false"/>
              </a-col>
              <a-col :span="4">
                <head-info title="房间数量" :content="orderInfoByHotel.roomNum" :center="false"/>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-card>
    </a-row>
    <a-row :gutter="15" class="count-info" v-if="user.roleId == 75">
      <a-col :span="12" class="visit-count-wrapper">
        <a-card class="visit-count" hoverable :bordered="false">
          <a-skeleton active v-if="loading"/>
          <apexchart v-if="!loading" type="line" height="350" :options="chartOptions1" :series="series1"></apexchart>
        </a-card>
      </a-col>
      <a-col :span="12" class="project-wrapper">
        <a-card class="visit-count" hoverable :bordered="false">
          <a-skeleton active v-if="loading"/>
          <apexchart v-if="!loading" type="bar" height="334" :options="chartOptions2" :series="series2"></apexchart>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="15" class="count-info" v-if="user.roleId == 75" style="margin-top: 15px">
      <a-col :span="8" class="project-wrapper" hoverable :bordered="false" style="padding: 0">
        <a-card class="visit-count" hoverable :bordered="false">
          <a-skeleton active v-if="loading"/>
          <apexchart v-if="!loading" type="pie" width="380" :options="chartOptions3" :series="series3"></apexchart>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="8" class="count-info" v-show="user.roleId == 74">
      <a-col :span="8" class="visit-count-wrapper">
        <a-card>
          <div v-if="scenicShow" class="scenicInfo" style="height: 670px; overflow-y: auto">
            <img :src="scenicData.webImg" alt="" width="100%"
                 style="height: 180px;object-fit: cover">
            <a-card :title="scenicData.name">
              <a slot="extra" @click="scenicBack">返回</a>
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="基础信息">
                  <ul>
                    <li>地址：{{ scenicData.address }}</li>
                    <br/>
                    <li>等级：{{ scenicData.level }}</li>
                    <br/>
                    <li>开园时间：{{ scenicData.startDate }} ~ {{ scenicData.endDate }}</li>
                    <br/>
                    <li>门票：{{ scenicData.price }} 元</li>
                    <br/>
                    <li>景区特色：{{ scenicData.feature }}</li>
                  </ul>
                </a-tab-pane>
                <a-tab-pane key="2" tab="路线规划">
                  <a-timeline>
                    <a-timeline-item v-for="(item,index) in roadData" :key="index">
                      <div v-html="item"></div>
                    </a-timeline-item>
                  </a-timeline>
                </a-tab-pane>
              </a-tabs>
            </a-card>
          </div>
          <div v-if="hotelShow" class="scenicInfo" style="height: 670px; overflow-y: auto">
            <img :src="'http://127.0.0.1:9527/imagesWeb/'+hotelData.images.split(',')[0]" alt="" width="100%"
                 style="height: 180px;object-fit: cover">
            <a-card :title="hotelData.name">
              <a slot="extra" @click="hotelBack">返回</a>
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="基础信息">
                  <ul>
                    <li>地址：{{ hotelData.address }}</li>
                    <br/>
                    <li>备注：{{ hotelData.content }}</li>
                    <br/>
                    <li>政策：{{ hotelData.policy }}</li>
                  </ul>
                </a-tab-pane>
                <a-tab-pane key="2" tab="路线规划">
                  <a-timeline>
                    <a-timeline-item v-for="(item,index) in roadData" :key="index">
                      <div v-html="item"></div>
                    </a-timeline-item>
                  </a-timeline>
                </a-tab-pane>
              </a-tabs>
            </a-card>
          </div>
          <a-tabs default-active-key="1" v-if="!scenicShow && !hotelShow">
            <a-tab-pane key="1" tab="景点" style="height: 600px; overflow-y: auto">
              <a-card @click="scenicDetail(item)" hoverable style="width: 100%;margin-bottom: 15px"
                      v-for="(item, index) in scenicList" :key="index">
                <a-popover v-if="item.webImg !== null">
                  <template slot="content">
                    <a-avatar shape="square" :size="132" icon="user" :src="item.webImg"/>
                  </template>
                  <a-avatar shape="square" :size="70" icon="user" style="margin-bottom: 15px;margin-right: 10px" :src="item.webImg"/>
                </a-popover>
                <a-card-meta :title="item.scenicName" :description="item.history.slice(0, 40)+'...'">
                </a-card-meta>
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="2" tab="民宿">
              <a-card  @click="hotelDetail(item)" hoverable style="width: 100%;margin-bottom: 15px" v-for="(item, index) in hotelList" :key="index" v-if="item.images !== null">
                <a-popover v-if="item.images !== null" v-for="(item1, index1) in item.images.split(',')" :key="index1">
                  <template slot="content">
                    <a-avatar shape="square" :size="132" icon="user" :src="'http://127.0.0.1:9527/imagesWeb/'+item1"/>
                  </template>
                  <a-avatar shape="square" :size="70" icon="user" style="margin-bottom: 15px;margin-right: 10px" :src="'http://127.0.0.1:9527/imagesWeb/'+item1"/>
                </a-popover>
                <a-card-meta :title="item.name" :description="item.content.slice(0, 25)+'...'">
                </a-card-meta>
              </a-card>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="16" class="visit-count-wrapper">
        <div id="areas" style="width: 100%;height: 710px;box-shadow: 0 0 0 10px white;"></div>
      </a-col>
      <a-col :span="24" class="visit-count-wrapper" style="margin-top: 20px">
        <a-card class="visit-count" hoverable :bordered="false">
          <apexchart ref="count" type=bar height=300 :options="chartOptions" :series="series"/>
        </a-card>
      </a-col>
      <a-col :span="12" class="project-wrapper">
      </a-col>
    </a-row>
  </div>
</template>
<script>
import HeadInfo from '@/views/common/HeadInfo'
import {mapState} from 'vuex'
import moment from 'moment'
import baiduMap from '@/utils/map/baiduMap'

moment.locale('zh-cn')

export default {
  name: 'HomePage',
  components: {HeadInfo},
  data () {
    return {
      series3: [44, 55, 13, 43, 22],
      chartOptions3: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series2: [{
        name: '交易额',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      chartOptions2: {
        chart: {
          height: 300,
          type: 'bar'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          tooltip: {
            enabled: true
          }
        },
        title: {
          text: '交易额统计',
          align: 'left'
        }
      },
      series1: [{
        name: '订单量',
        data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
      }],
      chartOptions1: {
        chart: {
          type: 'line',
          height: 350
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          tooltip: {
            enabled: true
          }
        },
        stroke: {
          curve: 'stepline'
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: '订单数量统计',
          align: 'left'
        },
        markers: {
          hover: {
            sizeOffset: 4
          }
        }
      },
      series: [],
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '35%'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: []
        },
        fill: {
          opacity: 1
        }
      },
      todayIp: '',
      todayVisitCount: '',
      totalVisitCount: '',
      userRole: '',
      userDept: '',
      lastLoginTime: '',
      welcomeMessage: '',
      orderInfoByHotel: null,
      orderTypeByHotelId: [],
      orderNum: [],
      loading: false,
      scenicList: [],
      hotelList: [],
      scenicShow: false,
      scenicData: null,
      hotelShow: false,
      hotelData: null,
      roadData: [],
      nowPoint: null
    }
  },
  computed: {
    ...mapState({
      multipage: state => state.setting.multipage,
      user: state => state.account.user
    }),
    avatar () {
      return `static/avatar/${this.user.avatar}`
    }
  },
  methods: {
    scenicBack () {
      this.scenicShow = false
    },
    scenicDetail (row) {
      this.scenicData = row
      this.scenicShow = true
      this.local(row)
    },
    hotelBack () {
      this.hotelShow = false
    },
    hotelDetail (row) {
      this.hotelData = row
      this.hotelShow = true
      this.local(row)
    },
    getLocal () {
      // eslint-disable-next-line no-undef
      let geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(r => {
        this.nowPoint = r.point
      }, {enableHighAccuracy: true})
    },
    local (scenic) {
      baiduMap.clearOverlays()
      baiduMap.rMap().enableScrollWheelZoom(true)
      // eslint-disable-next-line no-undef
      let driving = new BMap.DrivingRoute(baiduMap.rMap(), {renderOptions: {map: baiduMap.rMap(), autoViewport: true}})
      // eslint-disable-next-line no-undef
      driving.search(new BMap.Point(this.nowPoint.lng, this.nowPoint.lat), new BMap.Point(scenic.point.split(',')[0], scenic.point.split(',')[1]))
      this.getRoadData()
    },
    getRoadData () {
      let options = {
        onSearchComplete: results => {
          // eslint-disable-next-line eqeqeq,no-undef
          if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
            // 获取第一条方案
            let plan = results.getPlan(0)
            // 获取方案的驾车线路
            // eslint-disable-next-line no-unused-vars
            let route = plan.getRoute(0)
            // 获取每个关键步骤,并输出到页面
            let s = []
            for (let j = 0; j < plan.getNumRoutes(); j++) {
              let route = plan.getRoute(j)
              for (let i = 0; i < route.getNumSteps(); i++) {
                let step = route.getStep(i)
                s.push((i + 1) + '. ' + step.getDescription())
              }
            }
            this.roadData = s
          }
        }
      }
      // eslint-disable-next-line no-undef
      let driving = new BMap.DrivingRoute(baiduMap.rMap(), options)
      // eslint-disable-next-line no-undef
      let start = new BMap.Point(this.nowPoint.lng, this.nowPoint.lat)
      let end = null
      if (this.scenicShow) {
        end = new BMap.Point(this.scenicData.point.split(',')[0], this.scenicData.point.split(',')[1])
      } else {
        end = new BMap.Point(this.hotelData.point.split(',')[0], this.hotelData.point.split(',')[1])
      }
      // eslint-disable-next-line no-undef
      driving.search(start, end)
    },
    home () {
      this.loading = true
      this.$get('/cos/order-info/home', {type: this.user.roleId, userId: this.user.userId}).then((r) => {
        if (this.user.roleId === '75') {
          this.orderInfoByHotel = r.data.orderInfoByHotel
          let orderTypeLabel = []
          let orderTypeData = []
          r.data.orderTypeByHotelId.forEach(item => {
            orderTypeLabel.push(item.name)
            orderTypeData.push(item.price)
          })
          this.series3 = orderTypeData
          this.chartOptions3.labels = orderTypeLabel
          this.orderNum = r.data.orderNum
          let orderNumLabel = []
          let orderNumData = []
          let orderPriceLabel = []
          let orderPriceData = []
          r.data.orderNum.forEach(item => {
            orderNumLabel.push(item.days)
            orderPriceLabel.push(item.days)
            orderNumData.push(item.count)
            orderPriceData.push(item.orderPrice)
          })
          this.chartOptions1.xaxis.categories = orderNumLabel
          this.chartOptions2.xaxis.categories = orderPriceLabel
          this.series1[0].data = orderNumData
          this.series2[0].data = orderPriceData
        } else {
          this.scenicList = r.data.scenic
          this.hotelList = r.data.hotel
        }
        setTimeout(() => {
          this.loading = false
        }, 800)
      })
    },
    welcome () {
      const date = new Date()
      const hour = date.getHours()
      let time = hour < 6 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour <= 18 ? '下午好' : '晚上好')))
      return `${time}，${this.user.username}`
    }
  },
  mounted () {
    if (this.user.roleId === '74') {
      baiduMap.initMap('areas')
      this.getLocal()
    }
    this.home()
    this.welcomeMessage = this.welcome()
    this.$get(`index/${this.user.username}`).then((r) => {
      let data = r.data.data
      this.todayIp = data.todayIp
      this.todayVisitCount = data.todayVisitCount
      this.totalVisitCount = data.totalVisitCount
      let sevenVisitCount = []
      let dateArr = []
      for (let i = 6; i >= 0; i--) {
        let time = moment().subtract(i, 'days').format('MM-DD')
        let contain = false
        for (let o of data.lastSevenVisitCount) {
          if (o.days === time) {
            contain = true
            sevenVisitCount.push(o.count)
          }
        }
        if (!contain) {
          sevenVisitCount.push(0)
        }
        dateArr.push(time)
      }
      let sevenUserVistCount = []
      for (let i = 6; i >= 0; i--) {
        let time = moment().subtract(i, 'days').format('MM-DD')
        let contain = false
        for (let o of data.lastSevenUserVisitCount) {
          if (o.days === time) {
            contain = true
            sevenUserVistCount.push(o.count)
          }
        }
        if (!contain) {
          sevenUserVistCount.push(0)
        }
      }
      this.$refs.count.updateSeries([
        {
          name: '您',
          data: sevenUserVistCount
        },
        {
          name: '总数',
          data: sevenVisitCount
        }
      ], true)
      this.$refs.count.updateOptions({
        xaxis: {
          categories: dateArr
        },
        title: {
          text: '近七日系统访问记录',
          align: 'left'
        }
      }, true, true)
    }).catch((r) => {
      console.error(r)
      this.$message.error('获取首页信息失败')
    })
  }
}
</script>
<style lang="less">
.home-page {
  .head-info {
    margin-bottom: .5rem;

    .head-info-card {
      padding: .5rem;
      border-color: #f1f1f1;

      .head-info-avatar {
        display: inline-block;
        float: left;
        margin-right: 1rem;

        img {
          width: 5rem;
          border-radius: 2px;
        }
      }

      .head-info-count {
        display: inline-block;
        float: left;

        .head-info-welcome {
          font-size: 1.05rem;
          margin-bottom: .1rem;
        }

        .head-info-desc {
          color: rgba(0, 0, 0, 0.45);
          font-size: .8rem;
          padding: .2rem 0;

          p {
            margin-bottom: 0;
          }
        }

        .head-info-time {
          color: rgba(0, 0, 0, 0.45);
          font-size: .8rem;
          padding: .2rem 0;
        }
      }
    }
  }

  .count-info {
    .visit-count-wrapper {
      padding-left: 0 !important;

      .visit-count {
        padding: .5rem;
        border-color: #f1f1f1;

        .ant-card-body {
          padding: .5rem 1rem !important;
        }
      }
    }

    .project-wrapper {
      padding-right: 0 !important;

      .project-card {
        border: none !important;

        .ant-card-head {
          border-left: 1px solid #f1f1f1 !important;
          border-top: 1px solid #f1f1f1 !important;
          border-right: 1px solid #f1f1f1 !important;
        }

        .ant-card-body {
          padding: 0 !important;

          table {
            width: 100%;

            td {
              width: 50%;
              border: 1px solid #f1f1f1;
              padding: .6rem;

              .project-avatar-wrapper {
                display: inline-block;
                float: left;
                margin-right: .7rem;

                .project-avatar {
                  color: #42b983;
                  background-color: #d6f8b8;
                }
              }
            }
          }
        }

        .project-detail {
          display: inline-block;
          float: left;
          text-align: left;
          width: 78%;

          .project-name {
            font-size: .9rem;
            margin-top: -2px;
            font-weight: 600;
          }

          .project-desc {
            color: rgba(0, 0, 0, 0.45);

            p {
              margin-bottom: 0;
              font-size: .6rem;
              white-space: normal;
            }
          }
        }
      }
    }
  }
}
</style>
