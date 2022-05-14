<template>
  <div>
    <div id="areas"></div>
    <mu-card style="width: 100%; max-width: 375px; border-radius:10px;position: absolute;margin: 15px" :raised="true" v-show="scenicSearch">
      <mu-card-text style="padding: 0px">
        <mu-card style="width: 100%; max-width: 400px;border-radius:5px;" :raised="true">
          <mu-button icon style="height: 40px;width: 40px">
            <a-icon type="appstore" style="font-size: 25px"/>
          </mu-button>
          <!--@blur="rmCardCondition"-->
          <mu-text-field style="margin: 0 ;padding: 0;vertical-align:top;height:40px;width: 275px"
                         placeholder="搜索" v-model="localName"></mu-text-field>
          <mu-button icon @click="searchAll" style="height: 40px;width: 40px">
            <a-icon type="scan" style="font-size: 20px"/>
          </mu-button>
        </mu-card>
      </mu-card-text>
    </mu-card>

    <mu-drawer :open.sync="scenicDrawer" :docked="true" :width="410">
      <mu-card style="width: 100%; max-width: 375px; border-radius:10px;position: absolute;margin: 15px" :raised="true">
        <mu-card-text style="padding: 0px">
          <mu-card style="width: 100%; max-width: 400px;border-radius:5px;" :raised="true">
            <mu-button icon style="height: 40px;width: 40px" @click="drawerHide">
              <a-icon type="poweroff" style="font-size: 20px"/>
            </mu-button>
            <!--@blur="rmCardCondition"-->
            <mu-text-field style="margin: 0 ;padding: 0;vertical-align:top;height:40px;width: 275px"
                           placeholder="搜索" v-model="localName"></mu-text-field>
            <mu-button icon @click="searchAll" style="height: 40px;width: 40px">
              <a-icon type="scan" style="font-size: 20px"/>
            </mu-button>
          </mu-card>
        </mu-card-text>
      </mu-card>
      <div style="height: 210px">
        <img :src="defaultImg" alt="" width="100%" height="210px">
      </div>

      <div v-show="scenicInfoShow" class="scenicInfo">
        <a-card :title="scenic.scenicName" :bordered="false">
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="基础信息">
              <ul>
                <li>地址：{{scenic.address}}</li>
                <li>热度：{{scenic.hot}}</li>
                <li>等级：{{scenic.level}}</li>
                <li>历史：{{scenic.history}}</li>
                <li>价钱：{{scenic.scenicPrice}}</li>
              </ul>
            </a-tab-pane>
            <a-tab-pane key="2" tab="路线规划">
              <a-timeline>
                <a-timeline-item v-for="(item,index) in roadData" :key="index"><div v-html="item"></div></a-timeline-item>
              </a-timeline>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
      <div v-for="(scenic,i) in scenicListData" :key="i" v-show="scenicListShow">
        <a-divider><a-badge status="processing" /><i>{{scenic.address}}</i></a-divider>
        <a-card hoverable style="width: 95%;margin: 0 auto" @click="getScenicInfo(scenic)">
          <img
            v-if="scenic.webImg !== undefined && scenic.webImg.length > 0"
            :style="{backgroundImage: 'url(' + scenic.webImg + ')',height: '120px',backgroundSize: 'cover'}"
            slot="cover"
          />
          <a-card-meta :title="scenic.scenicName">
            <template slot="description" style="font-size: 10px">
              <div>
                <a-rate :default-value="parseInt((parseFloat(scenic.sold) / 1000).toFixed(1))" allow-half disabled style="float: left"/>
                <a-icon type="bug" style="float: right" @click.stop="local(scenic)" v-if="scenic.point !== ''"/>
              </div>
              <p style="clear: both;">{{scenic.history}}</p>
            </template>
          </a-card-meta>
        </a-card>
      </div>

      <div style="margin-top: 20px;font-size: 50px" v-if="scenicListData.length !== 0" v-show="scenicListShow">
        <a-card :bordered="false">
          <a-pagination :default-current="page.defaultCurrent" :total="page.total" simple @change="searchAll"/>
        </a-card>

      </div>
    </mu-drawer>
  </div>

</template>

<script>
  import baiduMap from '@/utils/map/baiduMap'
  export default {
    name: "scenic-map",
    data() {
      return {
        localName: '',
        scenicDrawer: false,
        scenicSearch: true,
        scenicListData: [],
        defaultImg: 'static/img/default_geocode-1x.png',
        page: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          total: 0,
        },
        roadData: [],
        scenic: {},
        scenicInfoShow: false,
        scenicListShow: true,
        nowPoint: {}
      }
    },
    mounted() {
      baiduMap.initMap("areas")
    },
    methods: {
      getRoadData() {
        let options = {
          onSearchComplete: results =>{
            if (driving.getStatus() == BMAP_STATUS_SUCCESS){
              // 获取第一条方案
              let plan = results.getPlan(0);
              // 获取方案的驾车线路
              let route = plan.getRoute(0);
              // 获取每个关键步骤,并输出到页面
              let s = [];
              for(let j = 0;j < plan.getNumRoutes(); j++){
                let route = plan.getRoute(j);
                for (let i = 0; i < route.getNumSteps(); i++){
                  let step = route.getStep(i);
                  s.push((i + 1) + ". " + step.getDescription());
                }
              }
              this.roadData = s
            }
          }
        };
        let driving = new BMap.DrivingRoute(baiduMap.rMap(), options);
        let start=new BMap.Point(this.nowPoint.lng,this.nowPoint.lat);
        let end=new BMap.Point(this.scenic.point.split(",")[0],this.scenic.point.split(",")[1]);
        let p1=new BMap.Point(116.460927,39.940802 );

        driving.search(start, end);
      },
      getScenicInfo(scenic) {
        this.defaultImg = scenic.webImg
        this.scenicListShow = false
        this.scenicInfoShow = true
        this.scenic = scenic
        this.local(scenic);
      },
      drawerHide() {
        this.scenicDrawer = false;
        this.scenicSearch = true
      },
      searchAll(page) {
        this.getLocal()
        this.defaultImg = 'static/img/default_geocode-1x.png'
        this.scenicListShow = true
        this.scenicInfoShow = false
        this.scenicSearch = false
        let params = {}
        if(typeof page === 'number' && page%1 === 0) {
          params.current = page
        }else {
          params.current = this.page.defaultCurrent
        }
        params.pageSize = this.page.defaultPageSize
        params.scenic = this.localName
        this.$get('/scenic/info/mapPage',{
          ...params
        }).then((r) => {
          this.scenicListData = r.data.data.records;
          this.page.total = r.data.data.total
        })
        this.scenicDrawer = true
      },
      local(scenic) {
        baiduMap.clearOverlays();
        baiduMap.rMap().enableScrollWheelZoom(true);
        let driving = new BMap.DrivingRoute(baiduMap.rMap(), {renderOptions:{map: baiduMap.rMap(), autoViewport: true}});
        console.log(JSON.stringify(this.nowPoint));
        driving.search(new BMap.Point(this.nowPoint.lng,this.nowPoint.lat), new BMap.Point(scenic.point.split(",")[0],scenic.point.split(",")[1]));
        this.getRoadData();
      },
      getLocal() {
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition( r =>{
          this.nowPoint = r.point
        },{enableHighAccuracy: true})
      }
    },
  }
</script>

<style scoped>
  #areas {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  /deep/ .ant-card-body {
    padding: 10px;
  }

  /deep/ .mu-input {
    min-height: 40px;
  }

  /deep/ .scenicInfo .ant-card-head-title {
    font-size: 20px;
    font-style:italic;
    font-weight:bold
  }
</style>
