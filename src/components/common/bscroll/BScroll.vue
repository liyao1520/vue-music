<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time); //滚动到指定点
    },
    finishPullUp() {
      this.scroll.finishPullUp(); //结束上拉加载行为。告诉 BetterScroll 准备好下一次的 pullingUp 钩子.
    },
    scrollToElement(el, time, offsetX, offsetY, easing) {
      this.scroll.scrollToElement(el, time, offsetX, offsetY, easing);
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      observeDOM: true, //开启对 content 以及 content 子元素 DOM 改变的探测
      click: true, //内容div可点击
      probeType: this.probeType, //决定是否派发 scroll 事件，对页面的性能有影响
      pullUpLoad: this.pullUpLoad, //触发上拉事件的阈值。
      useTransition: true,
      mouseWheel: {
        speed: 15,
        invert: false,
        easeTime: 300
      }
    });
    //监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("BScroll", position);
      });
    }
    //监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
    this.scroll.on("scrollEnd", () => {
      this.$emit("scrollEnd");
    });
  }
};
</script>

<style scoped></style>
