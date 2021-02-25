<template>
  <div class="footer-left" v-if="info !== null">
    <div class="img-wrap" id="footer-img" @click="imgClick">
      <img :src="info.al ? info.al.picUrl : info.picUrl" alt="" />
      <div class="mask"></div>
      <div class="open" v-if="!$store.state.songControlIsShow">
        <i class="iconfont " @click="openClick">&#xe6d9;</i>
      </div>
      <div class="close" v-else>
        <i class="iconfont" @click="closeClick">&#xe6e8;</i>
      </div>
    </div>
    <div class="content">
      <div class="song-name">{{ info.name }}</div>
      <div class="ar-name">
        -{{ info.arName ? info.arName : info.song.artists[0].name }}
      </div>
      <div class="time">
        {{ formatCurrentTime + " / " + formatDuration }}
      </div>
    </div>
    <transition
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <song-control
        v-if="$store.state.songControlIsShow"
        class="t"
        :key="$store.state.src"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SongControl from "@/components/content/SongControl";
export default {
  name: "FooterLeft",
  components: { SongControl },
  computed: {
    info() {
      return this.$store.state.currentInfo;
    },
    ...mapGetters(["formatCurrentTime", "formatDuration"])
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openClick() {
      this.$store.commit("changeSongControlIsShow", true);
    },
    closeClick() {
      this.$store.commit("changeSongControlIsShow", false);
    },
    imgClick() {
      let bool = this.$store.state.songControlIsShow;
      if (bool) {
        bool = true;
      } else {
        bool = false;
      }
      this.$store.commit("changeSongControlIsShow", bool);
    }
  }
};
</script>

<style scoped>
.footer-left {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
}
.img-wrap {
  position: relative;
  width: 47px;
  height: 47px;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
}
.open,
.close {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}
.open i {
  font-size: 30px;
}
.close i {
  font-size: 30px;
}
.mask {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
}
.img-wrap img {
  width: 100%;
  height: 100%;
  filter: blur(0.4px);
}
.content {
  display: flex;
  height: 20px;
  padding-top: 10px;
  align-items: center;
  padding-left: 10px;
  flex: 1;
}
.content .song-name {
  font-size: 17px;
  padding-left: 10px;
}
.content .ar-name {
  font-size: 12px;
  padding-left: 10px;
  padding-top: 5px;
}
.content .time {
  flex: 1;
  padding-right: 40px;
  font-size: 16px;
  text-align: right;
  flex-basis: 140px;
  padding-left: 10px;
}
.t {
  animation-duration: 0.5s;
}
</style>
