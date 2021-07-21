<template>
  <div class="content">
    <div class="header">
      <ul class="list">
        <li
          v-for="(item, index) in hotTagLIst"
          :key="index"
          class="item"
          @click="itemClick(index, item.name)"
          :class="{ active: currentIndex === index }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="main">
      <card-list :info="list" v-loading.fullscreen.lock="isLoad" />
    </div>
    <div :key="itemName" v-if="list">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="totalPage"
        class="pagination"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getPlayListsHot, getTopPlayList } from "@/network/api";
import CardList from "@/components/common/CardList";
export default {
  name: "PlayLists",
  components: {
    CardList
  },
  data() {
    return {
      itemName: "",
      isLoad: true,
      hotTagLIst: [],
      currentIndex: 0,
      list: null,
      totalPage: 1,
      currentPage: 1,
      currentCat: ""
    };
  },
  created() {
    let frist = "";
    getPlayListsHot()
      .then(res => {
        this.hotTagLIst = res.tags;
        frist = res.tags[0].name;
        this.itemName = res.tags[0].name;
        return frist;
      })
      .then(res => {
        return getTopPlayList(res, 0);
      })
      .then(res => {
        this.currentCat = res.cat;
        this.totalPage = parseInt(res.total / 50);
        this.list = res.playlists;
        this.isLoad = false;
      });
  },
  methods: {
    itemClick(index, tag) {
      this.isLoad = true;
      if (this.currentIndex === index) {
        return;
      }
      this.itemName = tag;
      getTopPlayList(tag).then(res => {
        this.currentCat = res.cat;
        this.totalPage = parseInt(res.total / 50);
        this.list = res.playlists;
        this.isLoad = false;
      });
      this.currentIndex = index;
    },
    currentChange(e) {
      this.isLoad = true;
      document.getElementsByClassName("el-backtop")[0].click();
      getTopPlayList(this.currentCat, e * 50).then(res => {
        this.list = res.playlists;
        this.isLoad = false;
      });
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  padding-bottom: 50px;
}
.list {
  display: flex;
  align-items: center;
  height: 30px;
}
.item {
  flex: 1;
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #7f7f81;
  cursor: pointer;
  border-radius: 5px;
}
.active {
  background-color: #d33a31;
  color: #ffffff;
}
.pagination {
  position: absolute;
  bottom: 0;
  right: 40px;
}
.main {
  width: 95%;
  margin: 40px auto 10px;
}
</style>
