<template>
  <div class="router-go">
    <i
      class="el-icon-arrow-left left"
      @click="backward"
      v-if="!$store.state.songControlIsShow"
    ></i>
    <i
      class="el-icon-arrow-right"
      @click="forward"
      v-if="!$store.state.songControlIsShow"
    ></i>
    <i
      class="iconfont"
      style="margin-left: 80px"
      v-if="$store.state.songControlIsShow"
      @click="close"
      >&#xe790;</i
    >
  </div>
</template>

<script>
export default {
  name: "RouterGo",
  methods: {
    backward() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(1);
    },
    close() {
      this.$store.commit("changeSongControlIsShow", false);
    }
  }
};
</script>

<style scoped>
.router-go {
  display: flex;
  align-items: center;
}
.router-go i {
  font-size: 20px;
  padding: 5px;
  border-radius: 50%;
}
.router-go i:hover {
  background-color: var(--round-hover-bgcolor);
  cursor: pointer;
}

.left {
  margin-right: 10px;
}
</style>
