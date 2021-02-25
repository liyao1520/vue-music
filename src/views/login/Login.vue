<template>
  <div class="login">
    <h1>登录</h1>
    <div class="ipt">
      <input type="number" placeholder="请输入你的网易云 UID" v-model="uid" />
    </div>

    <p>
      1、请 点我(<a href="http://music.163.com" target="_blank"
        >http://music.163.com</a
      >) 打开网易云音乐官网
    </p>
    <p>2、点击页面右上角的“登录”</p>
    <p>3、点击您的头像，进入我的主页</p>
    <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
    <div class="btn" @click="btnClick">登录</div>
  </div>
</template>

<script>
import { getUser } from "@/network/api";

export default {
  name: "Login",
  data() {
    return {
      uid: ""
    };
  },
  methods: {
    btnClick() {
      localStorage.setItem("uid", this.uid);
      getUser(this.uid).then(res => {
        if (res.code === 200) {
          this.$store.commit("changeUserList", res.playlist);
          this.$store.commit("changeUserId", parseInt(this.uid));
          this.$router.replace("/user");
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  margin: 20px auto 0;
  width: 500px;
  height: 300px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  border: 3px solid #d33a31;
  border-radius: 6px;
  padding-left: 10px;
  font-size: 13px;
}
.login h1 {
  font-size: 20px;
  margin: 10px 0 30px 10px;
}
.ipt {
  margin: 0 auto;
  width: 220px;
}
.ipt input {
  width: 100%;
  height: 23px;
  border: 1px solid #d33a31;
  border-radius: 3px;
  text-indent: 1em;
  color: #333333;
}
.login p {
  margin: 10px 0;
}
.btn {
  width: 50%;
  height: 30px;
  background-color: #d33a31;
  margin: 50px auto 0;
  color: #ffffff;
  line-height: 30px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
}
</style>
