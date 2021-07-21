<template>
  <div>
    <re-mv :list="mvList" v-loading.fullscreen.lock="isLoad" />
  </div>
</template>

<script>
import { getSearch } from "@/network/api";
import ReMv from "@/views/recommend/childCopms/ReMv";
export default {
  name: "SearchMv",
  components: { ReMv },
  data() {
    return {
      mvList: [],
      mvCount: 0,
      isLoad: true
    };
  },
  created() {
    getSearch(this.$route.query.keywords, 1004).then(res => {
      this.mvList = res.result.mvs;
      this.isLoad = false;
    });
  }
};
</script>

<style scoped></style>
