<template>
  <div>
    <div v-if="!loading" style="padding: 25px 80px">
      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="postList" v-show="!postDetailShow">
        <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
          <template slot="actions">
            <span key="to-top">
              <a-icon type="to-top" style="margin-right: 8px" />
              {{ timeFormat(item.createDate) }}
            </span>
          </template>
          <a-list-item-meta :description="item.content.slice(0, 100) + '...'">
            <a slot="title" @click="postInfoDetail(item.id)">{{ item.title }}</a>
            <a-avatar shape="square" slot="avatar" :src="'http://127.0.0.1:9527/imagesWeb/' + item.avatar" />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div v-if="postDetailShow && postDetail !== null" style="margin: 18px">
      <div style="margin-bottom: 10px">
        <a-breadcrumb>
          <a-breadcrumb-item><a @click="postDetailShow = false">返回</a></a-breadcrumb-item>
          <a-breadcrumb-item>{{ postDetail.title }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <p style="font-size: 22px;color: black;font-weight: 500;line-height: 150%;margin: 25px 50px;margin-top: 50px">
        {{ postDetail.title }}
      </p>
      <div style="margin: 25px 50px;font-size: 13px">
        <a-divider type="vertical" />
        {{ timeFormat(postDetail.createDate) }}
      </div>
      <div style="margin: 25px 50px;font-size: 15px;line-height: 1.6;word-break: break-word;letter-spacing: 1px;text-indent: 30px">
        {{ postDetail.content }}
      </div>
      <div style="margin: 25px 50px;height: 100px">
        <a-upload
          name="avatar"
          action="http://127.0.0.1:9527/file/fileUpload/"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
        >
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
      <div style="margin: 25px 50px;">
        <a-list
          class="comment-list"
          :pagination="pagination"
          :header="`${replyList.length} 回复`"
          item-layout="horizontal"
          :data-source="replyList"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-comment :author="item.username" shape="square" :avatar="'http://127.0.0.1:9527/imagesWeb/' + item.avatar">
              <template slot="actions">
                <span @click="replyUserAdd(item)">回复</span>
              </template>
              <p slot="content" style="white-space: pre-line;">
                {{ item.content }}
              </p>
              <a-tooltip slot="datetime" :title="item.sendCreate">
                <span>{{ timeFormat(item.createDate) }}</span>
              </a-tooltip>
            </a-comment>
          </a-list-item>
        </a-list>
        <div style="margin-bottom: 200px;margin-top: 50px">
          <a-textarea
            v-model="replyContent"
            placeholder="Controlled autosize"
            :rows="5"
          />
          <a-button type="primary" style="float: right;margin-top: 15px" @click="commit">
            提交
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'Post',
  computed: {
    ...mapState({
      currentUser: state => state.account.user
    })
  },
  data () {
    return {
      postList: [],
      replyList: [],
      postDetail: null,
      postDetailShow: false,
      pagination: {
        pageSize: 5
      },
      loading: false,
      fileList: [],
      previewVisible: false,
      previewImage: '',
      replyContent: '',
      replyUser: null
    }
  },
  mounted () {
    this.getPostList()
  },
  methods: {
    commit () {
      if (this.replyContent !== '') {
        let data = {userId: this.currentUser.userId, content: this.replyContent, postId: this.postDetail.id}
        this.$post(`/cos/reply-info`, data).then((r) => {
          if (r.data.code === 500) {
            this.$message.error(r.data.msg)
          } else {
            this.postInfoDetail(this.postDetail.id)
            this.replyContent = ''
          }
        })
      } else {
        this.$message.error('请填写评论！')
      }
    },
    postInfoDetail (postId) {
      this.$get(`/cos/post-info/${postId}`).then((r) => {
        this.postDetail = r.data.postInfo
        this.replyList = r.data.replyInfo
        this.imagesInit(this.postDetail.images)
        this.postDetailShow = true
      })
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
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleCancel () {
      this.previewVisible = false
    },
    getPostList () {
      this.loading = true
      this.$get(`/cos/post-info/page`, {size: 99999}).then((r) => {
        this.postList = r.data.data.records
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    timeFormat (time) {
      var nowTime = new Date()
      var day = nowTime.getDate()
      var hours = parseInt(nowTime.getHours())
      var minutes = nowTime.getMinutes()
      // 开始分解付入的时间
      var timeday = time.substring(8, 10)
      var timehours = parseInt(time.substring(11, 13))
      var timeminutes = time.substring(14, 16)
      // eslint-disable-next-line camelcase
      var d_day = Math.abs(day - timeday)
      // eslint-disable-next-line camelcase
      var d_hours = hours - timehours
      // eslint-disable-next-line camelcase
      var d_minutes = Math.abs(minutes - timeminutes)
      // eslint-disable-next-line camelcase
      if (d_day <= 1) {
        // eslint-disable-next-line camelcase
        switch (d_day) {
          case 0:
            // eslint-disable-next-line camelcase
            if (d_hours === 0 && d_minutes > 0) {
              // eslint-disable-next-line camelcase
              return d_minutes + '分钟前'
              // eslint-disable-next-line camelcase
            } else if (d_hours === 0 && d_minutes === 0) {
              return '1分钟前'
            } else {
              // eslint-disable-next-line camelcase
              return Math.abs(d_hours) + '小时前'
            }
            // eslint-disable-next-line no-unreachable
            break
          case 1:
            // eslint-disable-next-line camelcase
            if (d_hours < 0) {
              // eslint-disable-next-line camelcase
              return (24 + d_hours) + '小时前'
            } else {
              // eslint-disable-next-line camelcase
              return d_day + '天前'
            }
            // eslint-disable-next-line no-unreachable
            break
        }
        // eslint-disable-next-line camelcase
      } else if (d_day > 1 && d_day < 10) {
        // eslint-disable-next-line camelcase
        return d_day + '天前'
      } else {
        return time
      }
    }
  }
}
</script>

<style scoped>

</style>
