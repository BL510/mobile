<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
  <van-cell-group v-show="!showReports">
    <van-cell title="不感兴趣" icon="orders-o" @click="handle('dislike')" />
    <van-cell title="反馈垃圾内容" icon="warning-o" is-link @click="showReports=true"/>
    <van-cell title="拉黑作者" icon="delete" @click="handle('blacklist')"/>
  </van-cell-group>
  <!-- 举报文章 -->
  <van-cell-group v-show="showReports">
    <van-cell icon="arrow-left" @click="showReports=false"/>
    <van-cell title="标题夸张" />
    <van-cell title="低俗色情" />
    <van-cell title="错别字多" />
  </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
import { blacklists } from '@/api/user'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传递的文章对象
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showReports: false
    }
  },
  methods: {
    // 点击所有cell的时候，都执行该方法
    // 通过type判断具体要执行的操作
    handle (type) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          this.blacklistUser()
          break
      }
    },
    async blacklistUser () {
      try {
        await blacklists(this.article.aut_id)
        // 通知父组件，拉黑成功
        // 隐藏对话框，删除数据
        this.$emit('handleSuccess')
        this.$toast.success('操作成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 不感兴趣
    async dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        // 隐藏，移除掉数据
        // 告知父组件，操作成功
        this.$emit('handleSuccess')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}

</script>

<style>

</style>
