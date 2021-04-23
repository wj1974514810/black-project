<template>
  <div class="edit_profile">
    <hmeader title="编辑个人信息">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push({ name: 'index' })" />
      </template>
    </hmeader>
    <div class="imgarea">
      <img :src="userinfo.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell
      title="昵称"
      :desc="userinfo.nickname"
      @click.native="showeditNickname"
    ></hmcell>
    <van-dialog
      v-model="nickshow"
      title="编辑昵称"
      show-cancel-button
      @confirm="editNickname"
    >
      <!-- required是 *号 -->
      <van-field
        required
        v-model="nickname"
        label="昵称"
        placeholder="请输入新的昵称"
      />
    </van-dialog>
    <hmcell
      title="密码"
      :desc="userinfo.password"
      @click.native="showeditPassword"
    ></hmcell>
    <van-dialog
      v-model="passwordshow"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
    >
      <van-field
        required
        v-model="oldpassword"
        label="原密码"
        placeholder="请输入原密码"
      />
      <van-field
        required
        v-model="newpassword"
        label="新密码"
        placeholder="请输入新密码"
      />
    </van-dialog>
    <hmcell
      title="性别"
      @click.native="gendershow = true"
      :desc="userinfo.gender == 1 ? '男' : '女'"
    ></hmcell>
    <van-action-sheet
      v-model="gendershow"
      :actions="actions"
      @select="showeditGender"
    />
  </div>
</template>

<script>
import hmeader from "@/components/hm_header";
import hmcell from "@/components/hm_cell";
import { uploadFile } from "@/apis/fileUpload";
import { userPersonal, updateUserInfo } from "@/apis/user.js";
import axios from "@/utils/hm_axios";

export default {
  components: {
    hmeader,
    hmcell,
  },
  data() {
    return {
      userinfo: {},
      nickshow: false,
      passwordshow: false,
      gendershow: false,
      nickname: "",
      oldpassword: "",
      newpassword: "",
      actions: [
        { name: "男", nid: 1 },
        { name: "女", nid: 0 },
      ],
    };
  },
  mounted() {
    // 用户信息的动态渲染
    userPersonal(this.$route.params.id).then((res) => {
      // console.log(res);
      this.userinfo = res.data.data;
      this.userinfo.head_img = axios.defaults.baseURL + this.userinfo.head_img;
    });
  },
  methods: {
    // 当用户选择好文件之后，就会立刻触发这个方法，在这个方法中可以实现文件的上传
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // 用户所选择的文件对象 file.file
      console.log(file.file);
      // 使用formdata收集图片资源
      let formdata = new FormData();
      formdata.append("file", file.file);
      // 上传文件
      uploadFile(formdata)
        .then((res) => {
          console.log(res);
          if (res.data.message == "文件上传成功") {
            // 所谓页面的刷新，就是将img的src属性的值动态的修改
            this.userinfo.head_img = axios.defaults.baseURL + res.data.data.url;

            // 编辑用户头像信息
            // 存储在数据表中的头像信息，只有目录+文件名称，并没有基准路径
            // 2，实现用户头像的编辑
            updateUserInfo(this.$route.params.id, {
              head_img: res.data.data.url,
            })
              .then((res) => {
                console.log(res);
                if (res.data.message == "修改成功") {
                  this.$toast.success(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改昵称模态框及原昵称展示
    showeditNickname() {
      this.nickshow = !this.nickshow;
      this.nickname = this.userinfo.nickname;
    },
    // 修改密码模态框及原密码展示
    showeditPassword() {
      this.passwordshow = !this.passwordshow;
      this.oldpassword = this.userinfo.password;
    },

    // 修改昵称
    editNickname() {
      updateUserInfo(this.$route.params.id, {
        nickname: this.nickname,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message == "修改成功") {
            this.$toast.success(res.data.message);
            this.userinfo.nickname = this.nickname;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改密码
    editPassword() {
      if (/^.{3,16}$/.test(this.password)) {
        updateUserInfo(this.$route.params.id, {
          password: this.newpassword,
        })
          .then((res) => {
            console.log(res);
            if (res.data.message == "修改成功") {
              this.$toast.success(res.data.message);
              this.userinfo.password = this.newpassword;
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
    // 修改性别
    showeditGender(item) {
      this.gendershow = false;
      updateUserInfo(this.$route.params.id, {
        gender: item.nid,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message == "修改成功") {
            this.$toast.success("用户性别修改成功");
            this.userinfo.gender = item.nid;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.edit_profile {
  .imgarea {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    position: relative;
    > img {
      width: 90px;
      height: 90px;
      display: block;
    }
    .van-uploader {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
    // 深度作用选择器 /deep/
    /deep/ .van-uploader__upload {
      width: 90px;
      height: 90px;
    }
  }
}
</style>