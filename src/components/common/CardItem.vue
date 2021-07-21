<template>
  <div class="card-item" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="img-wrap">
      <img :src="src" alt="" />
      <div class="hover-info" ref="hoverInfo">{{ hoverInfo }}</div>
      <i class="iconfont play" ref="play">&#xe60c;</i>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
import { animateCSS } from "@/common/utils";

export default {
  name: "CardItem",
  props: {
    title: {
      type: String,
      default: ""
    },
    src: {
      type: String,
      default: ""
    },
    hoverInfo: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isHover: false
    };
  },
  methods: {
    mouseenter() {
      animateCSS(this.$refs.hoverInfo, "fadeInDown", "visible");
      animateCSS(this.$refs.play, "fadeInRight", "visible");
    },
    mouseleave() {
      animateCSS(this.$refs.hoverInfo, "fadeOutUp", "hidden");
      animateCSS(this.$refs.play, "fadeOutRight", "hidden");
    }
  }
};
</script>

<style scoped>
.card-item {
  width: calc(20% - 10px);
  margin: 0 5px 15px;
  cursor: pointer;
}
.img-wrap {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 4px;
  overflow: hidden;
}
img {
  width: 100%;
}

.title {
  text-align: center;
}
.hover-info {
  color: #ffffff;
  position: absolute;
  top: 0;
  width: 95%;
  padding: 5px;
  background: rgba(1, 1, 1, 0.5);
  text-align: center;
  visibility: hidden;
  animation-duration: 0.15s;
  font-size: 14px;
}
.play {
  position: absolute;
  right: 5px;
  bottom: 10px;
  font-size: 22px;
  color: #e73828;
  animation-duration: 0.15s;
  visibility: hidden;
}
</style>
