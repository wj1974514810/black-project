<template>
  <div class="log">
    <div id="app">
      <div class="container">
        <div class="close"><span class="iconfont iconicon-test"></span></div>
        <div class="logo"><span class="iconfont iconnew"></span></div>
        <div class="inputs">
          <!-- v-model：双向数据绑定：数据影响元素+元素影响数据 -->
          <!-- 1、为子组件的value属性赋值
           2、监听子组件所发出的input事件，必须是input 唯一
       -->
          <hm_input
            v-model="user.username"
            placeholder="请输入手机号"
            :rules="/^1[35789]\d{9}$/"
            msg="请输入11位手机号"
          ></hm_input>
          <!-- 
            为子组件赋值优先赋值给子组件的props属性，如果没有props属性，那么就会添加到组件的根元素，所以用v-model比props好太多
           -->
          <hm_input
            v-model="user.password"
            placeholder="请输入密码"
            :rules="/^.{3,16}$/"
            msg="请输入3-16位的密码"
          ></hm_input>
        </div>
        <p class="tips">
          没有账号？
          <a href="#/register" class="">去注册</a>
        </p>
        <!-- <div class="button">登录按钮</div> -->
      </div>
    </div>
    <!-- 这里的click事件，是子组件所发出的click事件  子传父 -->
    <hm_button @click="login" type="primary">登录</hm_button>
  </div>
</template>

<script>
import hm_button from "@/components/hm_button";
import hm_input from "@/components/hm_input";
import { userLogin } from "@/apis/user.js";
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
      },
    };
  },
  methods: {
    // handler(data) {
    //   this.user.username = data;
    // },
    login(e) {
      if (
        /^1[35789]\d{9}$|^admin$/.test(this.user.username) &&
        /^.{3,16}$/.test(this.user.password)
      ) {
        userLogin(this.user)
          .then((res) => {
            console.log(res);
            if (res.data.message == "登录成功") {
              localStorage.setItem("hmtt_token", res.data.data.token);
              // 跳转到个人中心页面且携带id
              this.$router.push({ path: `/personal/${res.data.data.user.id}` });
            } else {
              this.$toast.fail("登录失败");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$toast.fail({
          message: res.data.message,
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