<template>
  <div class="comment">
    <hm_header title="精彩评论页">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <div class="item" v-for="value in commentList" :key="value.id">
      <div class="head">
        <img :src="axios.defaults.baseURL + value.user.head_img" alt />
        <div>
          <p>{{ value.user.nickname }}</p>
          <span>时间</span>
        </div>
        <span>回复</span>
      </div>
      <commentItem v-if="value.parent" :comment="value.parent"></commentItem>
      <div class="text">{{ value.content }}</div>
    </div>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import commentItem from "@/components/commentItem.vue";
import { getCommentList } from "@/apis/post.js";
import axios from "@/utils/hm_axios.js";
export default {
  components: { hm_header, commentItem },
  data() {
    return {
      commentList: [],
      axios,
    };
  },
  async mounted() {
    let id = this.$route.params.id;
    let res = await getCommentList(id);
    this.commentList = res.data.data;
    console.log(this.commentList);
  },
};
</script>

<style lang="less" scoped>
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