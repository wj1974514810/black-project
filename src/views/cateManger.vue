<template>
  <div class="cateManger">
    <hm_header title="栏目管理">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </hm_header>
    <div class="delCate">
      <h3>点击删除频道</h3>
      <div class="list">
        <span
          v-for="value in cateList"
          :key="value.id"
          @click="removeCate(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
    <div class="addCate">
      <h3>点击添加频道</h3>
      <div class="list">
        <span
          v-for="value in newCateList"
          :key="value.id"
          @click="addCate(value)"
          >{{ value.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header";
import { getCateList } from "@/apis/category.js";
export default {
  components: { hm_header },
  data() {
    return {
      //已添加栏目
      cateList: [],
      // 未添加栏目
      newCateList: [],
    };
  },
  async mounted() {
    this.cateList = JSON.parse(localStorage.getItem("cateList") || "[]");
    // 判断本地存储里有没有栏目，没有就发请求
    if (this.cateList.length == 0) {
      let res = await getCateList();
      console.log(res);
      this.cateList = res.data.data;
      console.log(this.cateList);
      if (localStorage.getItem("hmtt_token")) {
        // splice会改变原数组
        this.cateList.splice(0, 2);
      } else {
        this.cateList.splice(0, 1);
      }
    }
    this.newCateList = JSON.parse(localStorage.getItem("newCateList") || "[]");
  },
  methods: {
    removeCate(value) {
      //  将当前栏目添加到 未添加栏目中
      this.newCateList.push(value);
      //   将当前栏目从已添加栏目中移除
      this.cateList = this.cateList.filter((v) => {
        return v.id != value.id;
      });
      this.getAllset();
    },
    addCate(value) {
      //  将当前栏目添加到 未添加栏目中
      this.cateList.push(value);
      //   将当前栏目从已添加栏目中移除
      this.newCateList = this.newCateList.filter((v) => {
        return v.id != value.id;
      });
      this.getAllset();
    },
    // 栏目放在本地存储中
    getAllset() {
      localStorage.setItem("cateList", JSON.stringify(this.cateList));
      localStorage.setItem("newCateList", JSON.stringify(this.newCateList));
    },
  },
};
</script>

<style lang="less" scoped>
.delCate,
.addCate {
  padding: 10px;
  h3 {
    line-height: 30px;
    font-weight: bold;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    span {
      width: 20%;
      border: 1px solid #ccc;
      margin: 5px;
      padding: 10px 15px;
      text-align: center;
    }
  }
}
</style>