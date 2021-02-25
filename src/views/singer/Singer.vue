<template>
  <div>
    <div class="header">
      <div class="initial">
        <span
          v-for="(item, index) in initial"
          :key="index"
          :class="{ active: index === initialIndex }"
          @click="initialClick(index)"
          >{{ item }}</span
        >
      </div>
      <div class="type">
        <span
          v-for="(item, index) in type"
          :key="index"
          :class="{ active: index === typeIndex }"
          @click="typeClick(index)"
          >{{ item }}</span
        >
      </div>
      <div class="area">
        <span
          v-for="(item, index) in area"
          :key="index"
          :class="{ active: index === areaIndex }"
          @click="areaClick(index)"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="mian">
      <singer-list :list="singerList" v-loading.fullscreen.lock="isLoad" />
    </div>
  </div>
</template>

<script>
import { getArtistList } from "@/network/api";
import SingerList from "@/views/singer/SingerList";
export default {
  name: "Singer",
  components: { SingerList },
  data() {
    return {
      initial: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#"
      ],
      type: ["全部", "男歌手", "女歌手", "乐队"],
      area: ["全部", "华语", "欧美", "日本", "韩国", "其他"],
      initialIndex: 0,
      typeIndex: 0,
      areaIndex: 0,
      singerList: null,
      isLoad: true
    };
  },
  methods: {
    areaClick(index) {
      if (this.areaIndex === index) {
        return;
      }
      this.areaIndex = index;
      this.getInfo();
    },
    typeClick(index) {
      if (this.typeIndex === index) {
        return;
      }
      this.typeIndex = index;
      this.getInfo();
    },
    initialClick(index) {
      if (this.initialIndex === index) {
        return;
      }
      this.initialIndex = index;
      this.getInfo();
    },
    getInfo() {
      this.isLoad = true;
      let initial = "";
      let type = "";
      let area = "";
      if (this.initial[this.initialIndex] === "热门") {
        initial = -1;
      } else if (this.initial[this.initialIndex] === "#") {
        initial = 0;
      } else {
        initial = this.initial[this.initialIndex];
      }
      switch (this.type[this.typeIndex]) {
        case "全部":
          type = -1;
          break;
        case "男歌手":
          type = 1;
          break;
        case "女歌手":
          type = 2;
          break;
        case "乐队":
          type = 3;
          break;
      }
      switch (this.area[this.areaIndex]) {
        case "全部":
          area = -1;
          break;
        case "华语":
          area = 7;
          break;
        case "欧美":
          area = 96;
          break;
        case "日本":
          area = 8;
          break;
        case "韩国":
          area = 16;
          break;
        case "其他":
          area = 0;
          break;
      }
      getArtistList(initial, type, area).then(res => {
        this.singerList = res.artists;
        this.isLoad = false;
      });
    }
  },
  created() {
    getArtistList(-1, -1, -1).then(res => {
      this.singerList = res.artists;
      this.isLoad = false;
    });
  }
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
}
.header span {
  cursor: pointer;
}
.initial,
.type,
.area {
  display: flex;
  margin-bottom: 10px;
}
.initial span {
  flex: 1;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.type span,
.area span {
  width: 40px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 25px;
}
.active {
  background-color: #d33a31;
  color: #ffffff;
}
</style>
