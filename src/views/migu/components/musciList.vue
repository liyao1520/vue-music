<template>
  <div class="music-list">
    <el-table :data="list">
      <el-table-column type="index" />
      <el-table-column label="封面" width="120">
        <template #default="{ row, $index }">
          <div class="item-img-wrap" @click="songClick(row.id, $index)">
            <el-image lazy :src="row.album.picUrl" alt="" class="item-img" />
            <i class="iconfont play" style="cursor: pointer">&#xe60c;</i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="歌名" prop="name"></el-table-column>
      <el-table-column label="歌手">
        <template #default="{ row }">
          {{ artistsFormat(row.artists) }}
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template #default="{ row }">
          {{ row.album.name }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="mv" width="100">
        <template #default="{ row }">
          <img
            src="~assets/img/playlist/播放MV.png"
            alt=""
            v-if="row.mvId !== ''"
            style="cursor: pointer"
            @click="mvClick(row.mvId)"
          />
          <span v-else>无</span>
        </template>
      </el-table-column> -->
      <el-table-column label="下载" width="100">
        <template slot-scope="scope">
          <i
            class="iconfont download"
            @click="download(scope.row.id, scope.row.name)"
            >&#xe706;</i
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqSongInfo } from "@/network/api";

export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    artistsFormat(artists) {
      return artists.map((item) => item.name).join(" / ");
    },
    async songClick(id, index) {
      const { data } = await reqSongInfo(id);
      this.$store.commit("changeCurrentInfo", {
        al: {
          picUrl: data.picUrl,
        },
        name: data.name,
        id: data.id,
        cid: data.cid,
        arName: data.artists.map((item) => item.name).join(" / "),
        lyric: data.lyric,
      });
      this.$store.commit("changeCurrentIndex", index);
      let url = data.flac ? data.flac : data["320"];
      this.$store.commit("changeUrl", url);
    },
    async download(id, name) {
      const { data } = await reqSongInfo(id);
      let url = data.flac ? data.flac : data["320"];
      window.open(url);
    },
    mvClick(mvId) {
      console.log(mvId);
    },
  },
};
</script>
<style scoped>
.item-img-wrap {
  position: relative;
  width: 63px;
  cursor: pointer;
}
.item-img {
  width: 63px;
  height: 63px;
  overflow: hidden;
}
.play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #d33a31;
  opacity: 0;
  font-size: 30px;
  transition: 0.2s;
}
.item-img-wrap:hover .play {
  opacity: 1;
}
.download {
  font-size: 30px;
  color: red;
  cursor: pointer;
}
</style>