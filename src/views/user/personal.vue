<template>
  <div class="personal">
    <router-link :to="'/edit_profile/' + id">
      <div class="profile">
        <img :src="userinfo.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont"
              :class="{
                iconxingbienan: userinfo.gender == 1,
                iconxingbienv: userinfo.gender == 0,
              }"
            ></span
            >{{ userinfo.nickname }}
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hm_button type="danger" style="margin-top: 20px">退出</hm_button>
  </div>
</template>

<script>
import hmcell from "@/components/hm_cell";
import hm_button from "@/components/hm_button";
import { userPersonal } from "@/apis/user.js";
import axios from "../../utils/hm_axios";
export default {
  components: {
    hmcell,
    hm_button,
  },
  data() {
    return {
      userinfo: {},
      id: "",
      axios,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    userPersonal(this.id)
      .then((res) => {
        console.log(res);
        if (res.data.message == "获取成功") {
          this.userinfo = res.data.data;
          this.userinfo.head_img =
            axios.defaults.baseURL + this.userinfo.head_img;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>