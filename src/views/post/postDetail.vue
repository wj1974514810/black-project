<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="fllowUserById" :class="{ active: post.has_follow }">{{
        post.has_follow ? "已关注" : "关注"
      }}</span>
    </div>
    <div class="detail">
      <div class="title">{{ post.title }}</div>
      <div class="desc">
        <span>{{ post.user.nickname }}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="post.content" v-if="post.type == 1"></div>
      <!-- 
          controls是否显示播放控制按钮 
          poster:封面
      -->
      <video :src="post.content" controls v-else></video>
      <div class="opt">
        <span
          class="like"
          :class="{ actives: post.has_like }"
          @click="liekThisPostById"
        >
          <van-icon name="good-job-o" />{{
            post.like_length ? post.like_length : "点赞"
          }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <hm_CommentFooter :post="post"></hm_CommentFooter>
  </div>
</template>

<script>
import { getPostDetail, likePost } from "@/apis/post";
import { followUser, unfollowUser } from "@/apis/user.js";
import hm_CommentFooter from "@/components/hm_CommentFooter";
export default {
  components: { hm_CommentFooter },
  data() {
    return {
      post: {
        user: {},
      },
    };
  },
  async mounted() {
    //   拿到文章id
    let id = this.$route.params.id;
    // 拿数据
    let res = await getPostDetail(id);
    this.post = res.data.data;
    // console.log(this.post);
  },
  methods: {
    //   关注与取消关注
    async fllowUserById() {
      // 拿到用户id  必须是用户id
      let id = this.post.user.id;
      let res;
      //   如果has_follow=true
      if (this.post.has_follow) {
        //   取消关注
        res = await unfollowUser(id);
      } else {
        //   关注
        res = await followUser(id);
      }
      //   取反
      this.post.has_follow = !this.post.has_follow;
      this.$toast.success(res.data.message);
      //   console.log(res);
    },
    // 点赞与取消点赞
    async liekThisPostById() {
      // 传文章id
      let res = await likePost(this.post.id);
      console.log(res);
      if (res.data.message == "点赞成功") {
        ++this.post.like_length;
      } else {
        --this.post.like_length;
      }
      this.post.has_like = !this.post.has_like;
      this.$toast.success(res.data.message);
    },
  },
};
</script>

<style lang="less" scoped>
.articaldetail {
  padding-bottom: 60px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      background-color: #fff;
      border: 1px solid #aaa;
      color: #666;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  /deep/ p {
    text-indent: 2em;
  }
  .content {
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/ img {
      width: 100%;
    }
  }
  video {
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .actives {
    color: red;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>