<template>
  <div>
    <div class="header" v-if="info">
      <div class="img">
        <img :src="info.picUrl" alt="" />
      </div>
      <div class="content">
        <div class="name">{{ info.name }}</div>
        <div class="brief-desc">
          {{ info.briefDesc }}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <h1>热门歌曲</h1>
      </div>
      <song-list :song-list="songList" />
    </div>
  </div>
</template>

<script>
import { getArtists } from "@/network/api";
import SongList from "@/components/content/SongList";
export default {
  name: "SingerInfo",
  components: { SongList },
  data() {
    return {
      info: null,
      songList: [],
      titleIndex: 0,
      hotList: []
    };
  },
  created() {
    getArtists(this.$route.params.id).then(res => {
      this.info = res.artist;
      this.songList = res.hotSongs;
      this.hotList = res.hotSongs;
    });
  },
  methods: {
    // titleClick(index) {
    //   if (index === this.titleIndex) {
    //     return;
    //   }
    //   this.titleIndex = index;
    //   if (this.titleIndex === 1) {
    //     getArtistSongsAll(this.$route.params.id, "time", 50, 0).then(res => {
    //       this.songList = res.songs;
    //     });
    //   }
    // }
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
  display: flex;
}

.header {
  display: flex;
}
.img {
  width: 250px;
}
.img img {
  width: 100%;
}
.content {
  flex: 1;
  padding-left: 15px;
  padding-right: 10px;
}
.content .name {
  font-size: 25px;
  margin-bottom: 10px;
}
.brief-desc {
  font-size: 13px;
  height: 160px;
  overflow-y: auto;
}
.main {
  margin-top: 20px;
}
</style>
