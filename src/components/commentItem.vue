<template>
  <div class="commentItem">
    <!-- 开始递归来实现 嵌套评论  v-fi判断有没有parent，有就嵌套，没有就不做 -->
    <com v-if="comment.parent" :comment="comment.parent"></com>
    <!-- 第二层 -->
    <div class="top">
      <div class="left">
        <span>{{ comment.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span>回复</span>
    </div>
    <div class="bottom">{{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  // 注册一个组件 name属性
  name: "com",
  props: {
    comment: {
      type: Object,
    },
  },
};
</script>

<style lang="less" scoped>
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>