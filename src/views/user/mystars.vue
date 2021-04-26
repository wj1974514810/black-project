<template>
  <div class="mystar">
    <hm_header title="我的收藏">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
        <span
          class="iconfont iconnew new"
          @click="$router.push({ name: 'index' })"
        ></span>
      </template>
    </hm_header>
    <van-swipe-cell v-for="(value, index) in StarsList" :key="value.id">
      <hm_postblock :article="value"></hm_postblock>
      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          style="height: 100%"
          @click="delStar(value.id, index)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import hm_header from "@/components/hm_header.vue";
import hm_postblock from "@/components/hm_postblock.vue";
import { getUserStars } from "@/apis/user.js";
import { starArticle } from "@/apis/post.js";
export default {
  components: { hm_header, hm_postblock },
  data() {
    return {
      StarsList: [],
    };
  },
  async mounted() {
    let res = await getUserStars();
    console.log(res);
    this.StarsList = res.data.data;
    console.log(this.StarsList);
  },
  methods: {
    async delStar(id, index) {
      let res = await starArticle(id);
      console.log(res);
      this.StarsList.splice(index, 1);
    },
  },
};
</script>

<style>
</style>