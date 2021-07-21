<template>
  <div class="mv">
    <div class="header">
      <div class="area">
        <h1>地区:</h1>
        <span
          v-for="(item, index) in area"
          :class="{ active: index === areaIndex }"
          :key="index"
          @click="areaClick(index)"
        >
          {{ item }}
        </span>
      </div>
      <div class="type">
        <h1>类型:</h1>
        <span
          v-for="(item, index) in type"
          :class="{ active: index === typeIndex }"
          :key="index"
          @click="typeClick(index)"
        >
          {{ item }}
        </span>
      </div>
      <div class="order">
        <h1>排序:</h1>
        <span
          v-for="(item, index) in order"
          :class="{ active: index === orderIndex }"
          :key="index"
          @click="orderClick(index)"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div class="main">
      <re-mv :list="mvList" />
    </div>
    <div class="footer" :key="areaIndex">
      <div :key="typeIndex">
        <el-pagination
          layout="prev, pager, next"
          :total="count / 40"
          :page-size="1"
          @current-change="change"
          :key="orderIndex"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getMv } from "@/network/api";
import ReMv from "@/views/recommend/childCopms/ReMv";

export default {
  name: "MV",
  components: { ReMv },
  data() {
    return {
      area: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      type: ["全部", "官方版", "原声", "现场版", "网易出品"],
      order: ["上升最快", "最热", "最新"],
      areaIndex: 0,
      typeIndex: 0,
      orderIndex: 0,
      mvList: [],
      count: 0
    };
  },
  methods: {
    areaClick(index) {
      this.areaIndex = index;
      this.getMvList();
    },
    typeClick(index) {
      this.typeIndex = index;
      this.getMvList();
    },
    orderClick(index) {
      this.orderIndex = index;
      this.getMvList();
    },
    getMvList(offset = 0) {
      getMv(
        this.area[this.areaIndex],
        this.type[this.typeIndex],
        this.order[this.orderIndex],
        40,
        offset
      ).then(res => {
        this.mvList = res.data;
        if (res.count) {
          this.count = res.count;
        }
      });
    },
    change(page) {
      document.getElementsByClassName("el-backtop")[0].click();
      this.getMvList((page - 1) * 40);
    }
  },
  created() {
    getMv("全部", "全部", "上升最快", 40, 0).then(res => {
      this.mvList = res.data;
      if (res.count) {
        this.count = res.count;
      }
    });
  }
};
</script>

<style scoped>
.header {
  padding-left: 100px;
}
.area,
.type,
.order {
  display: flex;
  margin-bottom: 20px;
  font-size: 14px;
  align-items: center;
}
.header span {
  padding: 4px;
  margin: 0 16px;
  cursor: pointer;
}
.active {
  color: #d33a31;
}
.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  padding-right: 60px;
}
</style>
