<template>
  <div class="index">
    <!-- 头部 -->
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search" @click="$router.push({ name: 'Search' })">
        <van-icon name="search" />
        <span>搜索商品</span>
      </div>
      <div class="user" @click="$router.push({ path: `/personal/${id}` })">
        <van-icon name="manager-o" />
      </div>
    </div>
    <!-- tab标签页 -->
    <!-- sticky是粘性布局 固定tab标签页 -->
    <!-- swipeable是可以进行左右滑动 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="value in cataList" :key="value.id">
        <hm_postblock
          v-for="post in value.postlist"
          :key="post.id"
          :article="post"
        ></hm_postblock>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from "@/apis/category.js";
import { getPostList } from "@/apis/post.js";
import hm_postblock from "@/components/hm_postblock";
export default {
  components: { hm_postblock },
  data() {
    return {
      active: localStorage.getItem("hmtt_token") ? 1 : 0,
      cataList: [],
      // postlist: [],
    };
  },
  async mounted() {
    //   获取栏目数据
    let res = await getCateList();
    this.cataList = res.data.data;
    console.log(this.cataList);

    // 不封装的数据该改造 步骤1
    // this.cataList = this.cataList.map((v) => {
    //   return { ...v, postlist: [] };
    // });
    // let id = this.cataList[this.active].id;
    // this.postlist = (await getPostList(id)).data.data;
    // console.log(this.postlist);
    // console.log(id);

    // console.log(this.cataList);

    // 封装数据改造1
    // map函数，拿到每一个结果存起来
    this.cataList = this.cataList.map((v) => {
      // ...v展开数据  数据里面加入成员postlist，pagesize，pageIndex
      return { ...v, postlist: [], pagesize: 20, pageIndex: 2 };
    });
    console.log(this.cataList);
    // 打开页面立即执行一次获取当前栏目的数据
    this.getpost();
  },

  //   监听
  watch: {
     active() {
      // 不封装的数据该改造 步骤2
      // if (this.cataList[this.active].postlist.length == 0) {
      //   // this.getpost();
      //   let id = this.cataList[this.active].id;
      //   // this.postlist = (await getPostList(id)).data.data;
      //   this.cataList[this.active].postlist = (await getPostList(id)).data.data;

      //   //  如果数据里的数组里面的长度是0就发请求
      // 封装数据改造2
      if (this.cataList[this.active].postlist.length == 0) {
        this.getpost();
      }
    },
  },
  methods: {
    //
    async getpost() {
      // console.log(this.active);
      let id = this.cataList[this.active].id;
      let pageSize = this.cataList[this.active].pagesize;
      let pageIndex = this.cataList[this.active].pageIndex;
      console.log(pageSize);
      //   把获取到的数据放在每一个栏目的数组里
      this.cataList[this.active].postlist = (
        await getPostList(id, pageSize, pageIndex)
      ).data.data;
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: red;
    .logo {
      color: #fff;
      .iconnew {
        font-size: 50px;
      }
    }
    .search {
      flex: 1;
      height: 40px;
      border-radius: 20px;
      margin: 5px 10px;
      background-color: rgba(252, 247, 247, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
    .user {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>