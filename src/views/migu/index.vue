<template>
  <div>
    <el-row :gutter="30" type="flex" justify="center">
      <el-col :span="12">
        <el-input
          placeholder="咪咕音乐歌曲搜索"
          v-model="search"
          @keyup.enter.native="musicSearch"
        />
      </el-col>
      <button class="el-icon-search search" @click="musicSearch">搜索</button>
    </el-row>
    <musci-list :list="musciList" />
  </div>
</template>
<script>
import { reqMgSearch } from "@/network/api";
import musciList from "./components/musciList.vue";
export default {
  components: { musciList },
  data() {
    return {
      search: "",
      musciList: [],
    };
  },
  methods: {
    async musicSearch() {
      const { data } = await reqMgSearch({
        keyword: this.search,
      });
      this.musciList = data.list;

      this.$store.commit(
        "changeCurrentList",
        data.list.map((item) => ({
          al: {
            picUrl: item.album.picUrl,
          },
          name: item.name,
          cid: item.cid,
          id: item.id,
          arName: item.artists.map((item) => item.name).join(" / "),
          lyric: item.lyric,
        }))
      );
    },
  },
  created() {},
};
</script>
<style scoped>
.el-input ::v-deep .el-input__inner {
  border-color: #ed457c;
}
.search {
  padding: 10px;
  outline: none;
  border: none;
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid rgba(237, 69, 124, 0.9);
  cursor: pointer;
  color: #ed457c;
  transition: all 0.4s;
}
.search:hover {
  background-color: rgba(237, 69, 124, 0.9);
  color: #ffffff;
}
</style>