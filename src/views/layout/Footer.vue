<template>
  <div class="footer">
    <div class="progress" ref="progress" v-if="this.$store.state.currentInfo">
      <el-slider
        v-model="progress"
        class="progress-content"
        :show-tooltip="false"
        @change="change"
        @mousedown.native="mousedown"
      ></el-slider>
    </div>
    <div class="left">
      <footer-left />
    </div>
    <div class="music-control">
      <music-control ref="control" />
    </div>
    <div class="right">
      <footer-right />
    </div>
  </div>
</template>

<script>
import MusicControl from "@/views/musiccontrol/MusicControl";
import FooterLeft from "@/views/footer/FooterLeft";
import FooterRight from "@/views/footer/FooterRight";
export default {
  name: "Footer",
  components: {
    MusicControl,
    FooterLeft,
    FooterRight
  },
  data() {
    return {
      progress: 0,
      event: null //定时器
    };
  },
  methods: {
    change(value) {
      this.$refs.control.$refs.audio.currentTime =
        (value / 100) * this.$refs.control.$refs.audio.duration;
      this.ontimeupdate();
    },
    ontimeupdate() {
      this.event = this.$refs.control.$refs.audio.ontimeupdate = () => {
        this.progress =
          (this.$refs.control.$refs.audio.currentTime /
            this.$refs.control.$refs.audio.duration) *
          100;
        this.$store.commit(
          "changeCurrentTime",
          this.$refs.control.$refs.audio.currentTime
        );
      };
    },
    mousedown() {
      // document
      //   .getElementsByClassName("progress")[0]
      //   .getElementsByClassName("progress-content")[0].onmousedown = () => {
      //
      // };
      this.$refs.control.$refs.audio.ontimeupdate = null;
    }
  },
  mounted() {
    this.ontimeupdate();
  }
};
</script>

<style scoped>
.footer {
  height: 100%;
  width: 100%;
  background-color: var(--body-bgcolor);
  display: flex;
  align-items: center;
  position: relative;
}
.left,
.right {
  flex: 3;
  height: 100%;
}
.music-control {
  flex: 1;
  height: 100%;
}
.progress {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
}
.progress-content >>> .el-slider__runway {
  margin: 0;
  padding: 0;
}
.progress-content >>> .el-slider__runway {
  height: 5px;
}
.progress-content >>> .el-slider__button {
  width: 7px;
  height: 7px;
  background-color: #d33a31;
  border: 2px solid #d33a31;
}
.progress-content >>> .el-slider__bar {
  height: 5px;
  background-color: #d33a31;
}
</style>
