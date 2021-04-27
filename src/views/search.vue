<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search
        v-model="userKey"
        placeholder="请输入搜索关键词"
        shape="round"
      >
      </van-search>
      <div @click="onSearch">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <p v-for="value in historyList" :key="value.id" @click="histJump(value)">
        {{ value }}
      </p>
    </div>
    <div class="historyList">
      <h2>搜索结果</h2>
      <router-link
        :to="{ path: `/postDetail/${value.id}` }"
        v-for="value in searchList"
        :key="value.id"
        >{{ value.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { searchArticle } from "@/apis/post.js";
export default {
  data() {
    return {
      userKey: "",
      searchList: [],
      //   历史搜索记录列表
      historyList: [],
    };
  },
  methods: {
    async onSearch() {
      let res = await searchArticle(this.userKey);
      this.searchList = res.data.data;

      // 从本地存储中找现在搜索的关键字，如果找到就去掉
      let index = this.historyList.indexOf(this.userKey);
      if (index !== -1) {
        this.historyList.splice(index, 1);
      }
      //   再把新的关键词放入本地存储中 放在最前面 unshift
      this.historyList.unshift(this.userKey);
      localStorage.setItem("toutiao_search", JSON.stringify(this.historyList));
    },
    histJump(value) {
      this.userKey = value;
      this.onSearch();
    },
  },
  mounted() {
    //  页面加载完成就显示历史记录
    this.historyList = JSON.parse(localStorage.getItem("toutiao_search")) || [];
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
</style>