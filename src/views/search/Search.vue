<template>
  <div :key="this.$route.query.keywords">
    <div class="title">
      <router-link
        tag="h1"
        :to="{ path: 'songs', query: { keywords: queryKeywords } }"
        >单曲</router-link
      >
      <router-link
        tag="h1"
        :to="{ path: 'playlist', query: { keywords: queryKeywords } }"
        >歌单</router-link
      >
      <router-link
        tag="h1"
        :to="{ path: 'mv', query: { keywords: queryKeywords } }"
        >MV</router-link
      >
      <router-link
        tag="h1"
        :to="{ path: 'singer', query: { keywords: queryKeywords } }"
        >歌手</router-link
      >
    </div>
    <keep-alive :max="10">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "Search",
  computed: {
    queryKeywords() {
      return this.$route.query.keywords;
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.title h1 {
  font-size: 20px;
  padding: 0 10px;
  color: #909090;
  cursor: pointer;
}
.title h1:hover {
  color: #333333;
}
.router-link-active {
  color: #333333 !important;
}
</style>
