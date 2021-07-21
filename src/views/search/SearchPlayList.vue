<template>
  <div class="search-playlist">
    <card-list :info="playlists" v-loading.fullscreen.lock="isLoad" />
  </div>
</template>

<script>
import { getSearch } from "@/network/api";
import CardList from "@/components/common/CardList";
export default {
  name: "SearchPlayList",
  components: {
    CardList
  },
  data() {
    return {
      playlists: [],
      isLoad: true
    };
  },
  created() {
    getSearch(this.$route.query.keywords, 1000).then(res => {
      this.playlists = res.result.playlists;
      this.isLoad = false;
    });
  }
};
</script>

<style scoped>
.search-playlist {
  width: 95%;
  margin: 50px auto 0;
}
</style>
