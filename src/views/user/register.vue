<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <hm_input
        v-model.trim="user.username"
        placeholder="请输入手机号"
        :rules="/^1[35789]\d{9}$/"
        msg="请输入11位手机号"
      ></hm_input>
      <hm_input
        v-model.trim="user.password"
        placeholder="请输入密码"
        :rules="/^.{3,16}$/"
        msg="请输入3-16位的密码"
      ></hm_input>
      <hm_input
        v-model.trim="user.nickname"
        placeholder="请输入昵称"
        :rules="/^.{2,16}$/"
        msg="请输入3-16位的昵称"
      ></hm_input>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <hm_button type="success" @click="register">注册</hm_button>
  </div>
</template>

<script>
import hm_button from "@/components/hm_button";
import hm_input from "@/components/hm_input";
import { userRegister } from "@/apis/user.js";
export default {
  components: {
    hm_button,
    hm_input,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        nickname: "",
      },
    };
  },
  methods: {
    register() {
      if (
        /^1[35789]\d{9}$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password) &&
        /^.{2,16}$/.test(this.user.nickname)
      ) {
        console.log(this.user);
        userRegister(this.user)
          .then((res) => {
            console.log(res);
            if (res.data.message == "注册成功") {
              this.$toast.fail(res.data.message);
              //   注册成功后跳转登录页面
              this.$router.push({ path: "/login" });
            } else {
              this.$toast.fail(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail({
          message: "注册失败!",
          position: "top",
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>