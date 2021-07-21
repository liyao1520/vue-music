<template>
  <div class="mvplay" v-if="info">
    <div class="content">
      <div class="video">
        <h1 class="title">{{ info.name }}</h1>
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOptions"
          v-if="url"
        />
        <div class="artist">
          <img :src="img1v1Url" alt="" />
          {{ info.artistName }}
        </div>
        <div class="other">
          <div class="publish-time">发表时间:{{ info.publishTime }}</div>
          <div class="play-count">播放数:{{ info.playCount }}</div>
        </div>
      </div>
      <div class="simi-MV">
        <ul>
          <li v-for="item in simiMV" :key="item.id" @click="itemClick(item.id)">
            <div class="img-wrap">
              <div class="li-play-count">{{ item.playCount | playCount }}</div>
              <img :src="item.cover" alt="" />
            </div>
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.artistName }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvDetail, getArtists, getMVUrl, getSimiMV } from "@/network/api";

export default {
  name: "MVPlay",
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" // url地址
          }
        ],
        hls: true,
        poster: "", // 你的封面地址
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //时间分割线
          durationDisplay: true, //总时间
          remainingTimeDisplay: false, //剩余播放时间
          progressControl: true, // 进度条
          fullscreenToggle: true // 全屏按钮
        }
      },
      info: null,
      img1v1Url: "",
      simiMV: [],
      url: null
    };
  },
  created() {
    let id = this.$route.params.id;
    getMvDetail(id)
      .then(res => {
        this.info = res.data;
        this.playerOptions.poster = res.data.cover;
        getMVUrl(res.data.id).then(res => {
          this.url = res.data.url;
          this.playerOptions.sources[0].src = res.data.url;
        });
        getSimiMV(res.data.id).then(res => {
          this.simiMV = res.mvs;
        });
        return getArtists(res.data.artistId);
      })
      .then(res => {
        this.img1v1Url = res.artist.img1v1Url;
      });
  },
  filters: {
    playCount(count) {
      if (!count) {
        return "";
      } else if (count < 10000) {
        return count;
      } else {
        return parseFloat(count / 10000).toFixed(2) + "万";
      }
    }
  },
  methods: {
    itemClick(id) {
      this.$router.replace("/mv/" + id);
    }
  }
};
</script>

<style scoped>
.mvplay {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #ffffff;
}
.video {
  width: 600px;
  padding-left: 14px;
}
.content {
  display: flex;
  justify-content: center;
  min-width: 1000px;
}
.title {
  font-size: 18px;
  margin-bottom: 20px;
}
.artist {
  display: flex;
  align-items: center;
  margin-top: 15px;
}
.artist img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.publish-time {
  margin-right: 20px;
}
.other {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  color: #7c7c7c;
  align-items: center;
}
.simi-MV {
  width: 400px;
  margin-left: 60px;
}
.simi-MV ul {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}
.simi-MV ul li {
  display: flex;
  margin-bottom: 20px;
  transition: all 0.2s;
}
.simi-MV ul li:hover {
  background-color: #eaeaea;
  cursor: pointer;
}
.simi-MV ul li img {
  width: 150px;
  border-radius: 3px;
}
.simi-MV ul li > div {
  display: flex;
  flex-direction: column;
}
.simi-MV ul li > div span {
  flex: 1;
  display: flex;
  font-size: 13px;
  align-items: center;
}
.simi-MV ul li > div span:first-child {
  align-items: center;
  font-size: 14px;
}
.img-wrap {
  position: relative;
  margin-right: 15px;
}
.li-play-count {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #ffffff;
}
</style>
