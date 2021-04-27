<template>
  <div class="comment">
    <hm_header title="精彩评论页">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <div class="list">
      <div class="item" v-for="value in commentList" :key="value.id">
        <div class="head">
          <img :src="axios.defaults.baseURL + value.user.head_img" alt />
          <div>
            <p>{{ value.user.nickname }}</p>
            <span>时间</span>
          </div>
          <span @click="sendComment(value)">回复</span>
        </div>
        <!--replay 是commentitem的 子传父  
          让它=sendComment  这样就完成了  
          commentitem 传给comment 
          comment 再传给  hm_commentFooter  兄弟之间的传递
           -->
        <commentItem
          v-if="value.parent"
          :comment="value.parent"
          @replay="sendComment"
        ></commentItem>
        <div class="text">{{ value.content }}</div>
      </div>
    </div>
    <hm_commentFooter
      :post="articl"
      @refresh="refresh"
      :commentObj="temp"
      @cancel="temp = null"
    ></hm_commentFooter>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import commentItem from "@/components/commentItem.vue";
import hm_commentFooter from "@/components/hm_CommentFooter";
import { getCommentList, getPostDetail } from "@/apis/post.js";
import axios from "@/utils/hm_axios.js";
export default {
  components: { hm_header, commentItem, hm_commentFooter },
  data() {
    return {
      commentList: [],
      axios,
      articl: {},
      temp: {},
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      let id = this.$route.params.id;
      //   获取文章的详情数据
      this.articl = (await getPostDetail(id)).data.data;
      //   获取文章评论数据
      let res = await getCommentList(id);
      this.commentList = res.data.data;
      console.log(this.commentList);
    },
    refresh() {
      // 刷新评论列表
      this.init();
      //   让列表自动的滚到顶部
      window.scrollTo(0, 0);
    },
    sendComment(v) {
      this.temp = v;
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  padding-bottom: 60px;
}
.item {
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > img {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      display: block;
      border-radius: 50%;
    }
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      > span {
        font-size: 12px;
        color: #999;
        line-height: 25px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 14px;
    color: #333;
    padding: 20px 0 10px 0;
  }
}
</style>