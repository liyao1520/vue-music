<template>
  <div>
    <div class="title">
      <h1
        v-for="(item, index) in titles"
        :key="index"
        @click="titleClick(index)"
        :class="{ active: index === currentIndex }"
      >
        {{ item }}
      </h1>
    </div>
    <song-list :song-list="currentInfo" v-loading.fullscreen.lock="isLoad" />
  </div>
</template>

<script>
import { getPlaylistDetail } from "@/network/api";
import SongList from "@/components/content/SongList";

export default {
  name: "TopList",
  components: { SongList },
  data() {
    return {
      titles: ["热歌榜", "新歌榜", "原创榜", "飙升榜"],
      topListId: [3778678, 3779629, 2884035, 19723756],
      currentIndex: 0,
      list: [[], [], [], []],
      currentInfo: [],
      isLoad: true
    };
  },
  methods: {
    titleClick(index) {
      if (this.currentIndex === index) {
        return;
      }
      if (this.list[index].length !== 0) {
        this.currentIndex = index;
        this.currentInfo = this.list[index];
        return;
      }
      this.isLoad = true;
      this.currentIndex = index;
      getPlaylistDetail(this.topListId[index]).then(res => {
        this.list[index] = res.playlist.tracks;
        this.currentInfo = res.playlist.tracks;
        this.isLoad = false;
      });
    }
  },
  created() {
    getPlaylistDetail(this.topListId[0]).then(res => {
      this.list[0] = res.playlist.tracks;
      this.currentInfo = res.playlist.tracks;
      this.isLoad = false;
    });
  }
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-around;
  height: 55px;
  line-height: 55px;
  color: #333333;
}
.title h1 {
  font-size: 20px;
  height: 100%;
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.active {
  background-color: #d33a31;
  color: #ffffff;
  border-radius: 5px;
}
</style>
