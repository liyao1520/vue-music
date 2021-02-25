<template>
  <div>
    <song-list :song-list="songList" v-loading.fullscreen.lock="isLoad" />
  </div>
</template>

<script>
import { getSearch, getSongDetail } from "@/network/api";
import SongList from "@/components/content/SongList";
export default {
  name: "SearchSongs",
  components: {
    SongList
  },
  data() {
    return {
      songList: [],
      isLoad: true
    };
  },
  created() {
    getSearch(this.$route.query.keywords)
      .then(res => {
        let list = [];
        res.result.songs.forEach(value => {
          list.push(value.id);
        });
        let str = list.join(",");
        return getSongDetail(str);
      })
      .then(res => {
        this.songList = res.songs;
        this.isLoad = false;
      });
  }
};
</script>

<style scoped></style>
