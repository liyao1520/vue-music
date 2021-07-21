<template>
  <div class="control-content">
    <audio :src="src" ref="audio" id="audio" @ended="ended"></audio>
    <div class="prev" @click="prev">
      <i class="iconfont">&#xe653;</i>
    </div>
    <div class="play">
      <i class="iconfont" v-if="!isPlay" @click="toPlay">&#xe64f;</i>
      <i class="iconfont" v-if="isPlay" @click="toPause">&#xe654;</i>
    </div>
    <div class="next">
      <i class="iconfont" @click="next">&#xe651;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicControl",
  computed: {
    src() {
      return this.$store.state.src;
    },
    isPlay() {
      return this.$store.state.isPlay;
    }
  },
  watch: {
    src(src) {
      this.$refs.audio.src = src;
      let that = this;
      this.$refs.audio.oncanplay = function() {
        this.play();
        that.$store.commit("play");
        //获取总时长
        that.$store.commit("changeDuration", that.$refs.audio.duration);
        //
      };
    }
  },
  methods: {
    toPlay() {
      if (this.$store.state.src !== "") {
        this.$store.commit("play");
        this.$refs.audio.play();
      }
    },
    toPause() {
      this.$store.commit("pause");
      this.$refs.audio.pause();
    },
    ended() {
      this.$store.dispatch("ended");
    },
    next() {
      if (this.$store.state.src === "") {
        return;
      }
      this.$store.dispatch("prevAndNext", 1);
    },
    prev() {
      if (this.$store.state.src === "") {
        return;
      }
      this.$store.dispatch("prevAndNext", 0);
    }
  }
};
</script>

<style scoped>
.control-content {
  height: 100%;
  display: flex;
  align-items: center;
  user-select: none;
}
.control-content > div {
  margin: 0 15px;
  color: #d33a31;
}
.control-content > div i {
  font-size: 30px;
  cursor: pointer;
}
.control-content .play i {
  font-size: 40px;
}
</style>
