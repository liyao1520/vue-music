<template>
  <div class="user" v-if="$store.state.userList">
    <div class="header">
      <div class="user-name">
        <img :src="list[0].creator.avatarUrl" alt="" />
        <span> {{ list[0].creator.nickname }}</span>
      </div>
      <h1 class="out" @click="outClick">退出登录</h1>
    </div>
    <h1 class="title">我的歌单</h1>
    <div class="list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="itemClick(item.id)"
      >
        <img :src="item.coverImgUrl" alt="" />
        <span class="name"> {{ item.name }}</span>
        <span class="count">共{{ item.trackCount }}首</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  computed: {
    list() {
      return this.$store.state.userList;
    }
  },
  methods: {
    itemClick(id) {
      this.$router.push("/playlist/" + id);
    },
    outClick() {
      localStorage.removeItem("uid");
      this.$store.commit("changeUserId", 0);
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: flex;
  margin: 10px 0;
  width: 40%;
  align-items: center;
  padding: 10px 5px;
  justify-content: space-between;
}
.item:hover {
  background-color: #efefef;
  cursor: pointer;
}
.item img {
  width: 50px;
  height: 50px;
}
.item .name {
  flex: 1;
  text-align: left;
  padding-left: 20px;
}
.item .count {
  padding-right: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: linear-gradient(to right, #e9534a, #f17e76, #e9534a, #f52718);
  color: #ffffff;
  padding: 10px 0;
  border-radius: 10px;
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin: 20px 0 10px 0;
}
.out {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
}
.user-name {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.user-name span {
  font-size: 18px;
  margin-left: 15px;
}
.user-name img {
  width: 80px;
  border-radius: 10px;
}
</style>
