<template>
  <div class="playlist">
    <div class="header" v-if="playlistInfo.length !== 0">
      <div class="cover-img">
        <img :src="playlistInfo.coverImgUrl" alt="" />
      </div>
      <div class="content">
        <div class="title">{{ playlistInfo.name }}</div>
        <div class="user">
          <img
            :src="playlistInfo.creator.avatarUrl"
            class="user-img"
            alt=""
            style="cursor: pointer"
            @click="userClick(playlistInfo.creator.userId)"
          />
          <span
            class="user-name"
            @click="userClick(playlistInfo.creator.userId)"
            >{{ playlistInfo.creator.nickname }}</span
          >
          <span class="user-create-time"
            >{{ playlistInfo.createTime | formatDate }}创建</span
          >
          <span class="user-update-time"
            >最近更新:{{ playlistInfo.updateTime | formatDate }}</span
          >
        </div>
        <div class="btn" @click="playAll">
          <i class="iconfont">&#xe60c;</i>播放全部
        </div>
        <div class="tags">
          <span class="tou">标签:</span>
          <span v-for="(item, index) in playlistInfo.tags" :key="item">{{
            (index > 0 ? "/" : "") + item
          }}</span>
        </div>
        <div class="description">
          <span class="tou">简介:</span>{{ playlistInfo.description }}
        </div>
      </div>
    </div>
    <div class="main">
      <song-list
        :songList="songList"
        v-loading.fullscreen.lock="isLoad"
        element-loading-background="rgba(0, 0, 0, 0.068)"
        ref="songList"
      />
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail, getSongDetail } from "@/network/api";
import { dateFormat } from "@/common/utils";

//共
import SongList from "@/components/content/SongList";
export default {
  name: "playList",
  data() {
    return {
      songList: [],
      playlistInfo: [],
      isLoad: true
    };
  },
  components: {
    SongList
  },
  created() {
    let id = this.$route.params.id;
    let list = [];
    getPlaylistDetail(id)
      .then(res => {
        this.playlistInfo = res.playlist;
        res.playlist.trackIds.forEach(value => {
          list.push(value.id);
        });
        let str = list.join(",");
        return getSongDetail(str);
      })
      .then(res => {
        this.songList = res.songs;
        this.isLoad = false;
      });
  },
  filters: {
    formatDate(time) {
      return dateFormat(new Date(time), "yyyy-MM-dd");
    }
  },
  methods: {
    playAll() {
      this.$refs.songList.playAll();
    },
    userClick(id) {
      this.$router.push("user/" + id);
    }
  }
};
</script>

<style scoped>
.playlist {
  width: 100%;
  margin: 0 auto;
}
.header {
  display: flex;
  margin: 20px 10px 0;
}
.cover-img {
  width: 213px;
  height: 213px;
  margin-right: 20px;
}
.cover-img img {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.title {
  font-size: 20px;
  margin-bottom: 20px;
}
.user {
  display: flex;
  align-items: center;
}
.user .user-img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
}
.user .user-name {
  margin-left: 10px;
  font-size: 17px;
  cursor: pointer;
}
.user .user-create-time {
  font-size: 17px;
  margin-left: 15px;
}
.user-update-time {
  margin-left: 20px;
  color: #4a4a4a;
}
.description {
  max-height: 160px;
  overflow-y: auto;
}
.description,
.tags {
  font-size: 14px;
}
.tou {
  margin-right: 10px;
}
.btn {
  width: 120px;
  height: 32px;
  background: linear-gradient(to right, #fa5143, #d73c33);
  color: #ffffff;
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  margin: 20px 0 20px 20px;
  cursor: pointer;
}
</style>
