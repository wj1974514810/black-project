<template>
  <input
    type="text"
    class="hm_input"
    @input="handlerinput"
    :[pn]="{ success: flag, error: !flag }"
    @blur="handlerBlur"
  />
</template>

<script>
export default {
  props: {
    rules: {
      // 定义数据校验规则
      type: RegExp,
    },
    // 错误信息
    msg: {
      type: String,
      default: "用户名或密码输入错误！",
    },
  },
  data() {
    return {
      flag: "",
      pn: "",
    };
  },
  methods: {
    handlerinput(e) {
      this.pn = "class";
      let value = e.target.value;
      if (value.length == "") {
        this.pn = "pn";
      }
      if (this.rules) {
        if (this.rules.test(value)) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
      this.$emit("input", value);
    },

    // 失焦后
    handlerBlur(e) {
      let value = e.target.value;
      if (this.rules) {
        if (!this.rules.test(value)) {
          this.$toast.fail("用户名或密码错误！");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.hm_input {
  width: 314/360 * 100vw;
  height: 60px;
  outline: none;
  border: none;
  border-bottom: 3px solid #ccc;
  font-size: 16px;
  line-height: 60px;
}
.success {
  border-bottom-color: green;
}
.error {
  border-bottom-color: red;
}
</style>