<template>
  <a-modal v-model="show" title="贴子详情" @cancel="onClose" :width="800">
    <template slot="footer">
      <a-button key="back" @click="onClose" type="danger">
        关闭
      </a-button>
    </template>
    <div style="font-size: 13px" v-if="postData !== null">
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">基础信息</span></a-col>
        <a-col :span="8"><b>发帖人：</b>
          {{ postData.userName }}
        </a-col>
        <a-col :span="8"><b>发帖时间：</b>
          {{ postData.createDate }}
        </a-col>
        <a-col :span="8"><b>标 题：</b>
          {{ postData.title }}
        </a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">内容</span></a-col>
        <a-col :span="24">
          {{ postData.content !== null ? postData.content : '- -' }}
        </a-col>
        <br/>
        <br/>
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
<!--            <div v-if="fileList.length < 8">-->
<!--              <a-icon type="plus" />-->
<!--              <div class="ant-upload-text">-->
<!--                Upload-->
<!--              </div>-->
<!--            </div>-->
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-col>
      </a-row>
      <br/>
      <br/>
      <a-row style="padding-left: 24px;padding-right: 24px;">
        <a-col style="margin-bottom: 15px"><span style="font-size: 15px;font-weight: 650;color: #000c17">回复信息</span></a-col>
        <a-col :span="24">
          <a-list
            class="comment-list"
            :header="`${replyList.length} 回复`"
            item-layout="horizontal"
            :data-source="replyList"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-comment :author="item.author" :avatar="'http://127.0.0.1:9527/imagesWeb/' + item.avatar">
                <template slot="actions">
                  <span v-for="(action, index) in item.actions" :key="index">{{ action }}</span>
                </template>
                <p slot="content" style="margin-left: -40px">
                  {{ item.content }}
                </p>
                <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{ item.datetime.fromNow() }}</span>
                </a-tooltip>
              </a-comment>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
      <br/>
      <br/>
    </div>
  </a-modal>
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'PostView',
  props: {
    postShow: {
      type: Boolean,
      default: false
    },
    postData: {
      type: Object
    }
  },
  computed: {
    show: {
      get: function () {
        return this.postShow
      },
      set: function () {
      }
    }
  },
  data () {
    return {
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: '',
      replyList: []
    }
  },
  watch: {
    postShow: function (value) {
      if (value && this.postData.images !== null && this.postData.images !== '') {
        this.imagesInit(this.postData.images)
      }
      this.dataInit()
    }
  },
  methods: {
    dataInit () {
      this.$get('/cos/post-info/reply', {postId: this.postData.id}).then((r) => {
        let replyList = []
        r.data.data.forEach(item => {
          replyList.push({author: item.userName, avatar: item.avatar, content: item.content, datetime: moment(item.createDate)})
        })
        this.replyList = replyList
        console.log(JSON.stringify(this.replyList))
      })
    },
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
