<template>
  <div class="commentItem">
    <!-- 开始递归来实现 嵌套评论  v-fi判断有没有parent，有就嵌套，没有就不做 -->
    <!-- @replay="sendReply" 回复按钮的组件递归，不管多少层都能点击回复 让递归组件也有响应子出的事件  
    意思:一直往上传，传到最外面的父组件，父组件然后向底部评论框子组件进行父传子   -->
    <com
      v-if="comment.parent"
      :comment="comment.parent"
      @replay="sendReply"
    ></com>
    <!-- 第二层 -->
    <div class="top">
      <div class="left">
        <span>{{ comment.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>2分钟前</span>
      </div>
      <span @click="sendReply(comment)">回复</span>
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
  methods: {
    sendReply(v) {
      this.$emit("replay", v);
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