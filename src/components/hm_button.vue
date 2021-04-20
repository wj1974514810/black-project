<template>
  <div
    class="btn"
    @click="handlerClick"
    :class="{
      success: type == 'success',
      danger: type == 'danger',
      primary: type == 'primary',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
  },
  methods: {
    handlerClick(e) {
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  width: 314 * 100vw/360;
  height: 50px;
  color: #fff;

  background-color: rgb(158, 160, 156);
  border-radius: 25px;
  line-height: 50px;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  font-size: 20px;
}
.success {
  background-color: green;
  color: #fff;
}
.danger {
  background-color: red;
  color: #fff;
}
.primary {
  background-color: rgb(67, 134, 235);
  color: #fff;
}
</style>