<template>
  <div class="song-control">
    <div class="open-comment">
      <el-switch
        v-model="commentIsShow"
        active-color="#d33a31"
        inactive-color="#cccccc"
        active-text="开启评论"
        @change="switchChange"
      >
        >>
      </el-switch>
    </div>
    <div class="fuzzy-img">
      <img :src="info.al ? info.al.picUrl : info.picUrl" alt="" />
    </div>
    <transition
      leave-active-class="animate__animated animate__zoomOutLeft"
      enter-active-class="animate__animated animate__zoomInLeft"
    >
      <div class="comment" v-if="commentIsShow">
        <h1 class="header">
          <span class="title">热门评论</span>
        </h1>
        <b-scroll class="b-scroll2">
          <ul>
            <li
              class="comment-li"
              v-for="item in hotComments"
              :key="item.commentId"
            >
              <div class="user-img">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content">
                <div class="comment-info">
                  <span class="nickname">{{ item.user.nickname + ":" }}</span>
                  <span>{{ item.content }}</span>
                </div>
                <div class="time">{{ item.time | formatDate }}</div>
              </div>
            </li>
          </ul>
        </b-scroll>
      </div>
    </transition>
    <div class="music">
      <div class="left">
        <div class="left-content">
          <div class="img-wrap">
            <img src="~assets/img/songcontrol/disc.png" alt="" />
            <div class="picUrl">
              <img :src="info.al ? info.al.picUrl : info.picUrl" ref="picUrl" />
            </div>
          </div>
          <div class="player-bar" ref="playerBar">
            <img src="~assets/img/songcontrol/player_bar.png" />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="song-name">
          {{ info.name }}
          <i class="iconfont" @click="mvClick(info.mv)" v-if="info.mv"
            >&#xe605;</i
          >
        </div>
        <div class="singer-name">歌手: {{ info.arName }}</div>
        <div class="lyric-wrap">
          <h1 v-if="nolyric" style="margin-top: 100px;font-size: 20px;">
            暂无歌词
          </h1>
          <b-scroll
            v-else
            class="b-scroll"
            :probeType="2"
            ref="bscroll"
            @scrollEnd="scrollEnd"
          >
            <ul style="min-width: 340px">
              <li
                v-for="(item, index) in lyric"
                :key="index"
                :class="{
                  'lyric-active': String(rightTime) === String(index)
                }"
                :id="index | lyricNum"
              >
                <span>{{ item }}</span>
                <span v-if="tlyric[index]">{{ tlyric[index] }}</span>
              </li>
            </ul>
          </b-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLyric, getHotComment } from "@/network/api";
import BScroll from "@/components/common/bscroll/BScroll";
import { mapGetters } from "vuex";
import { dateFormat } from "@/common/utils";

export default {
  name: "SongControl",
  data() {
    return {
      lyric: null,
      tlyric: null,
      rightTime: "",
      nolyric: false,
      stopScroll: false,
      hotComments: [],
      commentIsShow: false
    };
  },
  components: { BScroll },
  computed: {
    ...mapGetters(["formatCurrentTime"]),
    info() {
      return this.$store.state.currentInfo;
    },
    isPlay() {
      return this.$store.state.isPlay;
    }
  },
  watch: {
    isPlay(bool) {
      if (bool) {
        this.$refs.picUrl.classList.remove("paused");
        this.$refs.picUrl.classList.add("running");
        this.$refs.playerBar.classList.add("player-bar-playing");
      } else {
        this.$refs.picUrl.classList.remove("running");
        this.$refs.picUrl.classList.add("paused");
        this.$refs.playerBar.classList.remove("player-bar-playing");
      }
    },
    rightTime(time) {
      if (this.stopScroll) {
        return;
      }
      let t = "#lyric" + time.replace(":", "-");
      let el = document.querySelector(t);
      this.$refs.bscroll.scrollToElement(el, 500, 0, -170);
    }
  },
  mounted() {
    if (this.isPlay) {
      this.$refs.picUrl.classList.add("running");
      this.$refs.playerBar.classList.add("player-bar-playing");
    } else {
      this.$refs.picUrl.classList.add("paused");
      this.$refs.playerBar.classList.remove("player-bar-playing");
    }
  },
  created() {
    //得到commentType
    if (localStorage.getItem("commentType")) {
      let n = parseInt(localStorage.getItem("commentType"));
      this.commentIsShow = !!n;
    }

    if (this.$store.state.currentInfo) {
      let id = this.$store.state.currentInfo.id;
      getLyric(id).then(res => {
        if (res.nolyric) {
          this.nolyric = true;
          return;
        }
        let lyric = res.lrc.lyric;
        let tlyric = res.tlyric.lyric;
        //设置一个空对象
        let obj = {}; //obj.a obj[a]=当前key值所在的value值
        let obj2 = {};
        //设置一个正则 把数组[]去掉
        let reg = /\[(.*?)](.*)/g;
        lyric.replace(reg, (a, b, c) => {
          b = b.slice(0, 5);
          obj[b] = c;
        });
        tlyric.replace(reg, (a, b, c) => {
          b = b.slice(0, 5);
          obj2[b] = c;
        });
        //console.log(obj,'对象内容')
        //给歌词赋值
        this.lyric = obj; //{00:00 : '你好'}
        this.tlyric = obj2;
        let that = this;
        document
          .getElementById("audio")
          .addEventListener("timeupdate", function() {
            let timer = that.format(this.currentTime);
            if (timer in that.lyric) {
              that.rightTime = timer;
            }
          });
      });
      getHotComment(id, 0).then(res => {
        this.hotComments = res.hotComments;
      });
    }
  },
  methods: {
    mvClick(id) {
      this.$store.commit("changeSongControlIsShow", false);
      this.$store.commit("pause");
      document.getElementById("audio").pause();
      this.$router.push("/mv/" + id);
    },
    format(time) {
      let m = parseInt(time / 60);
      let s = parseInt(time - m * 60);
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;
      return m + ":" + s;
    },
    scrollEnd() {
      this.stopScroll = true;
      setTimeout(() => {
        this.stopScroll = false;
      }, 2000);
    },
    switchChange(bool) {
      let n;
      if (bool) {
        n = 1;
      } else {
        n = 0;
      }
      localStorage.setItem("commentType", n);
    }
  },
  filters: {
    lyricNum(value) {
      return "lyric" + value.replace(":", "-");
    },
    formatDate(time) {
      return dateFormat(new Date(time), "yyyy-MM-dd  hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.open-comment {
  position: absolute;
  top: 5px;
  left: 10px;
}
.fuzzy-img {
  margin: 20px auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 600px;
  z-index: -1;
}
.fuzzy-img img {
  height: 100%;
  width: 100%;
  filter: blur(100px);
  opacity: 0.3;
}
.song-control {
  position: fixed;
  top: 60px;
  bottom: 60px;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  z-index: -1;
  display: flex;
  justify-content: center;
  min-width: 1000px;
}
.music {
  flex: 5;
  display: flex;
  justify-content: center;
  padding-left: 5px;
}
.comment {
  flex: 3;
  height: 80%;
  margin-top: 30px;
  margin-left: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 10px;
  font-size: 13px;
}

.left-content {
  position: relative;
  padding-top: 100px;
}
.player-bar {
  position: absolute;
  top: 10px;
  left: 121px;
  transform: rotate(-15deg);
  transform-origin: left top;
  transition: all 1s;
}
.player-bar-playing {
  transform: rotate(14deg);
}
.img-wrap {
  position: relative;
}
.picUrl {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: -1;
}
.picUrl img {
  width: 150px;
  height: 150px;
  animation: rotate 10s linear infinite;
}
.paused {
  animation-play-state: paused !important;
}
.running {
  animation-play-state: running !important;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.right {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  margin-left: 60px;
}
.song-name {
  font-size: 28px;
  margin-bottom: 10px;
}
.song-name i {
  font-size: 28px;
  color: #d33a31;
  cursor: pointer;
  margin-left: 10px;
}
.singer-name {
  font-size: 13px;
}
.lyric-wrap {
  margin-top: 30px;
  height: 80%;
  /*mask-image: linear-gradient(*/
  /*  180deg,*/
  /*  hsla(0, 0%, 100%, 0),*/
  /*  hsla(0, 0%, 100%, 0.6) 15%,*/
  /*  #fff 25%,*/
  /*  #fff 75%,*/
  /*  hsla(0, 0%, 100%, 0.6) 85%,*/
  /*  hsla(0, 0%, 100%, 0)*/
  /*);*/
}
.b-scroll,
.b-scroll2 {
  height: 100%;
  overflow: hidden;
}
.b-scroll ul {
  padding: 40px 0;
}
.b-scroll li {
  font-size: 14px;
  padding: 2px 0;
  /*color: #4a4a4a;*/
  display: flex;
  color: #333333;
  flex-direction: column;
  margin-top: 10px;
}
.lyric-active {
  color: #d33a31 !important;
  font-size: 16px !important;
}
.comment ul {
  padding-bottom: 25px;
}
.comment .comment-li {
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid #cccccc;
}
.comment .user-img {
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-right: 10px;
  border-radius: 50%;
}
.comment .user-img img {
  width: 100%;
  height: 100%;
}
.comment .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
}
.comment-info .nickname {
  color: #517eaf;
  font-size: 14px;
}
.comment .time {
  padding-top: 5px;
}
.header {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.header .title {
  font-size: 19px;
  color: #333333;
  font-weight: 700;
}
.header-close {
  font-size: 16px;
  cursor: pointer;
}
</style>
