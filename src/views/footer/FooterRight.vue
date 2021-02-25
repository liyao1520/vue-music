<template>
  <div class="footer-right">
    <div class="slider">
      <el-slider v-model="volume" class="slider-content" @input="change" />
    </div>
    <div class="volume"><i class="iconfont">&#xe652;</i></div>
    <div class="list">
      <i
        class="iconfont"
        @click="listClick"
        :style="{ color: isShow ? '#d33a31' : '#333333' }"
        >&#xe65f;</i
      >
    </div>

    <div class="order">
      <i class="iconfont" @click="orderClick(1)" v-if="order === 1">&#xe656;</i>
      <i class="iconfont" @click="orderClick(2)" v-if="order === 2">&#xe658;</i>
      <i class="iconfont" @click="orderClick(3)" v-if="order === 3">&#xe655;</i>
    </div>
    <div class="msg">{{ orderMsg }}</div>
    <transition
      enter-active-class="animate__animated animate__slideInRight"
      leave-active-class="animate__animated animate__slideOutRight"
    >
      <div class="playlist" v-if="isShow">
        <b-scroll class="BScroll">
          <ul class="currentPlayList">
            <h1>长按上滑显示更多<i class="iconfont">&#xe614;</i></h1>
            <li
              v-for="(item, index) in $store.state.currentList"
              :key="item.id"
              class="item"
              @click="itemClick(index, item.id, item)"
              :style="{
                color:
                  index === $store.state.currentIndex ? '#d33a31' : '#333333'
              }"
            >
              <div class="index">
                <span v-show="index !== $store.state.currentIndex">{{
                  index + 1
                }}</span>
                <i
                  v-show="index === $store.state.currentIndex"
                  class="iconfont"
                  style="color: #d33a31;font-size: 20px;height: 20px;width: 20px;"
                  >&#xe666;</i
                >
              </div>
              <span class="name">{{ item.name }}</span>
              <span class="ar-name">{{ item.arName }}</span>
              <span class="dt">{{ item.dt }}</span>
            </li>
          </ul>
        </b-scroll>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from "@/components/common/bscroll/BScroll";
import { getSongUrl } from "@/network/api";
export default {
  name: "FooterRight",
  components: { BScroll },
  data() {
    return {
      volume: 100,
      isShow: false,
      order: 1
    };
  },
  methods: {
    change(v) {
      document.getElementById("audio").volume = v / 100;
    },
    listClick() {
      this.isShow = !this.isShow;
    },
    orderClick(v) {
      if (v === 3) {
        this.order = 1;
      } else {
        this.order++;
      }
      this.$store.commit("changePlayOrder", this.order);
      localStorage.setItem("order", this.order);
    },
    itemClick(index, id, info) {
      this.$store.commit("changeCurrentInfo", info);
      this.$store.commit("changeCurrentIndex", index);
      getSongUrl(id).then(res => {
        this.currentIndex = index;
        this.$store.commit("changeUrl", res.data[0].url);
      });
    }
  },
  computed: {
    playlist() {
      return this.$store.state.currentList;
    },
    orderMsg() {
      let msg = "";
      switch (this.order) {
        case 1:
          msg = "顺序播放";
          break;
        case 2:
          msg = "随机播放";
          break;

        case 3:
          msg = "单曲循环";
          break;
      }
      return msg;
    }
  },
  created() {
    let order = localStorage.getItem("order");
    if (order) {
      order = parseInt(order);
      this.order = order;
      this.$store.commit("changePlayOrder", this.order);
    } else {
      localStorage.setItem("order", "1");
      this.order = 1;
      this.$store.commit("changePlayOrder", this.order);
    }
  }
};
</script>

<style scoped>
.footer-right {
  display: flex;
  height: 100%;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 20px;
  user-select: none;
}
.slider {
  height: 36px;
  width: 100px;
}
.slider-content >>> .el-slider__bar {
  background-color: #d33a31;
  height: 4px;
}
.slider-content >>> .el-slider__button {
  background-color: #d33a31;
  border: 1px solid #d33a31;
  width: 10px;
  height: 10px;
}
.slider-content >>> .el-slider__runway {
  height: 4px;
}
.volume i {
  color: #4a4a4a;
  font-size: 22px;
  padding: 0 10px;
}

.list i {
  color: #4a4a4a;
  font-size: 22px;
  padding: 0 10px;
  cursor: pointer;
}
.playlist {
  position: fixed;
  top: 60px;
  bottom: 60px;
  right: 0;
  width: 400px;

  background-color: #ffffff;
  z-index: 101;
  box-shadow: -2px 0 2px #cccccc;
}

.order i {
  color: #4a4a4a;
  font-size: 22px;
  padding: 0 10px;
  cursor: pointer;
}
.msg {
  color: #404140;
}
.BScroll {
  height: 100%;
  overflow: hidden;
}
.BScroll h1 {
  text-align: center;
  color: #d33a31;
}
.item {
  display: flex;
  margin: 2px 0;
  padding: 7px 0;
  cursor: pointer;
}
.item:nth-child(even) {
  background-color: #f5f7fa;
}
.index {
  width: 20px;
  text-align: center;
  line-height: 20px;
}
.item .name,
.ar-name {
  flex: 1;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item .dt {
  width: 60px;
  text-align: center;
}
.refresh {
  height: 99.9% !important;
}
</style>
