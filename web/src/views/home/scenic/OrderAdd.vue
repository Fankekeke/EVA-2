<template>
  <a-modal v-model="show" :title="scenicData.scenicName" @cancel="onClose" :width="700">
    <template slot="footer">
      <a-button key="back" @click="onClose" type="danger">
        关闭
      </a-button>
      <a-button key="pay" @click="pay">
        支付
      </a-button>
    </template>
    <div style="font-size: 13px" v-if="scenicData !== null">
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">订单信息</span>
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
      <a-divider orientation="left">
        购买票数
      </a-divider>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px" :span="10">
          <a-input-number v-model="amount" :min="1" :max="10" @change="onChange" />
        </a-col>
        <a-col :span="5" style="font-weight: 500">
          <span style="font-size: 13px;color: #aaaaaa">需支付：<span style="font-size: 15px;color: #f5222d">{{ allPrice }}</span> 元</span>
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'OrderAdd',
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
    ...mapState({
      user: state => state.account.user
    }),
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
      amount: 1,
      allPrice: 0,
      loading: false
    }
  },
  watch: {
    scenicShow: function (value) {
      this.amount = 1
      this.allPrice = this.scenicData.scenicPrice
    }
  },
  methods: {
    onChange (value) {
      this.allPrice = (value * this.scenicData.scenicPrice).toFixed(2)
    },
    pay () {
      let data = {price: this.allPrice, scenicId: this.scenicData.id, amount: this.amount, userId: this.user.userId}
      this.$post('/cos/pay/scenic', data).then((r) => {
        // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
        const divForm = document.getElementsByTagName('div')
        if (divForm.length) {
          document.body.removeChild(divForm[0])
        }
        const div = document.createElement('div')
        div.innerHTML = r.data.msg // data就是接口返回的form 表单字符串
        // console.log(div.innerHTML)
        document.body.appendChild(div)
        document.forms[0].setAttribute('target', '_self') // 新开窗口跳转
        document.forms[0].submit()
      })
    },
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  /deep/ .ant-divider-inner-text {
    font-size: 14px;
  }
</style>
