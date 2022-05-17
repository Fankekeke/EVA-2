<template>
  <a-modal v-model="show" :title="roomData.name" @cancel="onClose" :width="700">
    <template slot="footer">
      <a-button key="back" @click="onClose" type="danger">
        关闭
      </a-button>
      <a-button key="pay" @click="pay" :disabled="roomLoading">
        支付
      </a-button>
    </template>
    <div style="font-size: 13px" v-if="roomData !== null">
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">订单信息</span>
        </a-col>
        <a-col :span="8"><b>房间名称：</b>
          {{ roomData.name }}
        </a-col>
        <a-col :span="8"><b>价格/天：</b>
          ￥{{ roomData.price }}
        </a-col>
        <a-col :span="8"><b>房间大小：</b>
          {{ roomData.area }} ㎡
        </a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="8"><b>酒店名称：</b>{{ roomData.hotelName !== null ? roomData.hotelName : '- -' }}</a-col>
        <a-col :span="8"><b>标 签：</b>{{ roomData.tag !== null ? roomData.tag : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col :span="24"><b>酒店政策：</b>{{ roomData.policy !== null ? roomData.policy : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;"
             v-if="roomData.images !== null && roomData.images !== ''">
        <a-col :span="8">
          <a-popover>
            <template slot="content">
              <a-avatar shape="square" :size="132" icon="user" :src="'http://127.0.0.1:9527/imagesWeb/' + roomData.images.split(',')[0]"/>
            </template>
            <a-avatar shape="square" :size="70" icon="user" :src="'http://127.0.0.1:9527/imagesWeb/' + roomData.images.split(',')[0]"/>
          </a-popover>
        </a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">备 注</span>
        </a-col>
        <a-col :span="24">{{ roomData.content !== null ? roomData.content : '- -' }}</a-col>
      </a-row>
      <br/>
      <a-divider orientation="left">
        入住天数
      </a-divider>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px" :span="10">
          <a-input-number :disabled="roomLoading" v-model="amount" :min="1" :max="365" @change="onChange" />
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
    roomShow: {
      type: Boolean,
      default: false
    },
    roomData: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    show: {
      get: function () {
        return this.roomShow
      },
      set: function () {
      }
    }
  },
  data () {
    return {
      amount: 1,
      allPrice: 0,
      roomLoading: false,
      loading: false
    }
  },
  watch: {
    roomShow: function (value) {
      if (value) {
        this.roomNum()
        this.amount = 1
        this.allPrice = this.roomData.price
      }
    }
  },
  methods: {
    roomNum () {
      this.$get(`/cos/room-type/${this.roomData.id}`).then((r) => {
        if (r.data.data <= 0) {
          this.roomLoading = true
          this.$message.error('该房间余量不足！')
        }
      })
    },
    onChange (value) {
      this.allPrice = (value * this.roomData.price).toFixed(2)
    },
    pay () {
      let data = {price: this.allPrice, typeId: this.roomData.id, dayNum: this.amount, userId: this.user.userId, hotelId: this.roomData.hotelId}
      this.$post('/cos/pay/room', data).then((r) => {
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
