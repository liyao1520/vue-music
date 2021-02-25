<template>
  <div class="new-song">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.id"
        @click="itemClick(item.id, item)"
      >
        <div class="order">{{ index + 1 }}</div>
        <img :src="item.picUrl" alt="" />
        <div class="song-content">
          <div class="song-name">{{ item.song.name }}</div>
          <div class="artists-name">
            <span v-for="artist in item.song.artists" :key="artist.name">{{
              artist.name
            }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSongUrl } from "@/network/api";

export default {
  name: "ReNewSong",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(id, item) {
      this.$store.commit("changeCurrentList", this.list);
      this.$store.commit("changeCurrentInfo", item);
      getSongUrl(id).then(res => {
        let url = res.data[0].url;
        this.$store.commit("changeUrl", url);
        this.$store.commit("play");
      });
    }
  }
};
</script>

<style scoped>
.new-song {
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
}
.new-song ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 400px;
}
.new-song ul li {
  position: relative;
  width: 50%;
  display: flex;
  margin: 9px 0;
  cursor: pointer;
  transition: all 0.3s;
}
.new-song ul li:after {
  position: absolute;
  content: "\e60c";
  font-family: iconfont;
  right: 20px;
  top: 19px;
  font-size: 16px;
  color: #d33a31;
  visibility: hidden;
}

.new-song ul li:hover {
  background-color: var(--playlist-hover-bgcolor);
}
.new-song ul li:hover:after {
  visibility: visible;
}
.new-song ul li img {
  width: 60px;
  height: 60px;
}
.new-song ul li .song-content {
  display: flex;
  flex-direction: column;
}
.order {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 30px;
}
.song-content {
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
}
.song-name {
  font-size: 14px;
}
.artists-name {
  font-size: 12px;
}
</style>
