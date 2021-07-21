<template>
  <div v-if="singerList">
    <singer-list :list="singerList" />
  </div>
</template>

<script>
import { getSearch } from "@/network/api";
import SingerList from "@/views/singer/SingerList";
export default {
  name: "SearchSinger",
  components: { SingerList },
  data() {
    return {
      singerList: null
    };
  },
  created() {
    getSearch(this.$route.query.keywords, 100).then(res => {
      this.singerList = res.result.artists;
    });
  }
};
</script>

<style scoped></style>
