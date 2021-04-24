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
        <!--immediate-check 是否在初始化时立即执行滚动位置检查 给false -->
        <!--offset 滚动条与底部距离小于 offset 时触发load事件 -->
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          finished-text="没有更多了"
          offset="5"
          :immediate-check="false"
          @load="onLoad"
        >
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">
            <hm_postblock
              v-for="post in value.postlist"
              :key="post.id"
              :article="post"
            ></hm_postblock>
          </van-pull-refresh>
        </van-list>
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
    // console.log(this.cataList);

    // 封装数据改造1
    // map函数，拿到每一个结果存起来
    this.cataList = this.cataList.map((v) => {
      // ...v展开数据  数据里面加入成员postlist，pagesize，pageIndex
      return {
        ...v,
        postlist: [],
        pageSize: 20,
        pageIndex: 1,
        loading: false,
        finished: false,
        isLoading: false,
      };
    });
    // console.log(this.cataList);
    // 打开页面立即执行一次获取当前栏目的数据
    this.getpost();
  },

  //   监听
  watch: {
    active() {
      //   //  如果数据里的数组里面的长度是0就发请求
      // 封装数据改造2
      if (this.cataList[this.active].postlist.length == 0) {
        this.getpost();
      }
    },
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      // 页面设为1
      this.cataList[this.active].pageIndex = 1;
      // 数据数组长度清0
      this.cataList[this.active].postlist.length = 0;

      // 4.将finished重置为false,以便可以继续的上拉加载
      this.cataList[this.active].finished = false;
      this.getpost();
    },
    // 上拉刷新
    onLoad() {
      // console.log(1);
      this.cataList[this.active].pageIndex++;
      this.getpost();
      // setTimeout(() => {
      // }, 2000);
    },
    async getpost() {
      // console.log(this.active);
      //   把获取到的数据放在每一个栏目的数组里
      let current = (
        await getPostList({
          category: this.cataList[this.active].id,
          pageSize: this.cataList[this.active].pageSize,
          pageIndex: this.cataList[this.active].pageIndex,
        })
      ).data.data;
      // 打散这个数组push 到postlist数组里，以便加载是衔接，而不是覆盖
      this.cataList[this.active].postlist.push(...current);
      // 本次请求完成之后，将loading重置为false，以便下一次的下拉
      this.cataList[this.active].loading = false;
      this.cataList[this.active].isLoading = false;

      // 如果下一次获取数据的长度小于pageSize的长度
      if (current < this.cataList[this.active].pageSize) {
        //finished 是否已加载完成，加载完成后不再触发load事件
        this.cataList[this.active].finished = true;
      }
      // console.log(this.cataList[this.active].postlist);
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