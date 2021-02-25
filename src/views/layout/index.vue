<template>
  <el-container style="height: 100%">
    <el-header><Header></Header></el-header>
    <el-container
      direction="direction"
      style="height: calc(100% - 120px);overflow-y: auto"
    >
      <el-aside width="260px"><Aside></Aside></el-aside>
      <el-main id="main"><Main></Main></el-main>
    </el-container>
    <el-footer class="my-el-footer"><Footer></Footer></el-footer>
    <el-backtop
      target="#main"
      id="back-top"
      :visibility-height="600"
      :bottom="80"
    ></el-backtop>
  </el-container>
</template>

<script>
import Header from "@/views/layout/Header";
import Footer from "@/views/layout/Footer";
import Aside from "@/views/layout/Aside";
import Main from "@/views/layout/Main";
import { getUser } from "@/network/api";
export default {
  name: "index",
  components: {
    Header,
    Footer,
    Aside,
    Main
  },
  created() {
    if (!localStorage.getItem("uid")) {
      return;
    }
    let uid = parseInt(localStorage.getItem("uid"));

    getUser(uid).then(res => {
      if (res.code === 200) {
        this.$store.commit("changeUserList", res.playlist);
        this.$store.commit("changeUserId", uid);
      }
    });
  }
};
</script>

<style scoped>
#back-top /deep/ .el-icon-caret-top {
  color: #d33a31 !important;
}
#main {
  min-width: 760px;
}
.my-el-footer {
  position: relative;
  z-index: 999;
  padding: 0 !important;
}
</style>
