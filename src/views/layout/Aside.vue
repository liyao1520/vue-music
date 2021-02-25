<template>
  <div class="aside">
    <ul>
      <li @click="userClick" :class="{ red: $route.path === '/user' }">
        <i class="el-icon-user-solid user"></i>
        {{ loginInfo }}
      </li>
      <router-link tag="li" to="/recommend"
        ><i class="iconfont">&#xe647;</i>推荐</router-link
      >
      <router-link tag="li" to="/toplist"
        ><i class="iconfont">&#xe613;</i>排行榜</router-link
      >
      <router-link tag="li" to="/playlists"
        ><i class="iconfont">&#xe642;</i>歌单</router-link
      >
      <router-link tag="li" to="/singer"
        ><i class="iconfont">&#xe65b;</i>歌手</router-link
      >
      <router-link tag="li" to="/mv"
        ><i class="iconfont">&#xe605;</i>MV</router-link
      >
    </ul>
  </div>
</template>

<script>
export default {
  name: "Aside",
  methods: {
    userClick() {
      if (this.$store.state.userId === 0) {
        this.$router.replace("/login");
      } else {
        this.$router.push("/user");
      }
    }
  },
  computed: {
    loginInfo() {
      let info = null;
      if (this.$store.state.userId === 0) {
        info = "未登录";
      } else {
        if (this.$store.state.userList.length === 0) {
          info = "未知用户";
        } else {
          info = this.$store.state.userList[0].creator.nickname;
        }
      }
      return info;
    }
  }
};
</script>

<style scoped>
.aside {
  background-color: var(--menu-bgcolor);
  height: 100%;
}
ul {
  color: var(--font-color);
}
ul li {
  height: 46px;
  line-height: 46px;
  font-size: 15px;
  padding-left: 40px;
  cursor: pointer;
}
ul li:first-child {
  height: 50px;
  font-size: 17px;
  line-height: 50px;
}
ul li:hover {
  background-color: var(--menu-item-hover-bg);
}
.router-link-active {
  color: #d33a31;
}
ul li i {
  margin-right: 10px;
}
.user {
  font-size: 20px;
  margin-right: 15px;
}
.red {
  color: #d33a31;
}
</style>
