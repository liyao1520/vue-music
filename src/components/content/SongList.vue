<template>
  <div class="song-list" v-if="songList.length !== 0">
    <el-table :data="songListInfo" style="width: 100%" :lazy="true">
      <el-table-column :min-width="tableWidth[0]">
        <template slot-scope="scope">
          <i
            class="iconfont"
            style="color: #d33a31;font-size: 20px"
            v-if="currentIndex === scope.row.indexNum"
            >&#xe666;</i
          >
          <span v-else>{{ 1 ? scope.row.indexNum + 1 : currentIndex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="封面" prop="picUrl" :min-width="tableWidth[1]">
        <template slot-scope="scope">
          <div class="click-play">
            <el-image
              :src="scope.row.al.picUrl"
              style="width: 63px;height: 63px;cursor: pointer"
              alt=""
              lazy
              @click="
                songClick(scope.row.id, scope.row.indexNum, scope.row, $event)
              "
            />
            <i
              class="iconfont"
              @click="songClick(scope.row.id, scope.row.indexNum, scope.row)"
              style="cursor: pointer"
              >&#xe60c;</i
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="歌名" :min-width="tableWidth[2]">
      </el-table-column>
      <el-table-column label="歌手" :min-width="tableWidth[3]">
        <template slot-scope="scope">
          <div>
            <span
              v-for="(item, index) in scope.row.ar"
              :key="item.id"
              @click="singerClick(item.id)"
              style="cursor: pointer"
              >{{
                item.name + (index === scope.row.ar.length - 1 ? "" : " / ")
              }}</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="al.name" label="专辑" :min-width="tableWidth[4]">
      </el-table-column>
      <el-table-column prop="mv" label="MV" :min-width="tableWidth[5]">
        <template slot-scope="scope">
          <img
            src="~assets/img/playlist/播放MV.png"
            alt=""
            v-if="scope.row.mv !== 0"
            style="cursor: pointer"
            @click="mvClick(scope.row.mv)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="dt" label="时长" :min-width="tableWidth[6]">
      </el-table-column>
      <el-table-column label="下载" :min-width="tableWidth[7]">
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
import { getSongUrl, downloadMp3 } from "@/network/api";
import fileDownload from "js-file-download";
import { mapState } from "vuex";
export default {
  name: "SongList",
  data() {
    return {
      //705
      tableWidth: [30, 70, 140, 120, 100, 50, 50, 50],
      ...mapState(["currentIndex"])
    };
  },
  props: {
    songList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    songListInfo() {
      let list = this.songList.map((value, index) => {
        value.indexNum = index;
        let ar = "";
        let time = parseInt(value.dt / 1000);
        let m = parseInt(time / 60);
        let s = time - m * 60;
        s = parseInt(s) < 10 ? "0" + s : s;
        m = parseInt(m) < 10 ? "0" + m : s;
        value.dt = m + ":" + s;
        value.ar.forEach((v, i) => {
          if (i !== 0) {
            ar += " / " + v.name;
          } else {
            ar += v.name;
          }
        });
        value.arName = ar;
        return value;
      });
      return list;
    }
  },
  methods: {
    songClick(id, index, info) {
      this.$store.commit("changeCurrentList", this.songListInfo);
      this.$store.commit("changeCurrentInfo", info);
      this.$store.commit("changeCurrentIndex", info.indexNum);
      getSongUrl(id).then(res => {
        this.currentIndex = index;
        this.$store.commit("changeUrl", res.data[0].url);
      });
    },
    playAll() {
      let info = this.songListInfo[0];
      this.$store.commit("changeCurrentList", this.songListInfo);
      this.$store.commit("changeCurrentInfo", info);
      this.$store.commit("changeCurrentIndex", info.indexNum);
      getSongUrl(this.songListInfo[0].id).then(res => {
        this.currentIndex = 0;
        this.$store.commit("changeUrl", res.data[0].url);
      });
    },
    download(id, name) {
      getSongUrl(id)
        .then(res => {
          return res.data[0].url;
        })
        .then(res => {
          return downloadMp3(res);
        })
        .then(res => {
          fileDownload(res, name + ".mp3");
        });
    },
    mvClick(mv) {
      this.$store.commit("pause");
      document.getElementById("audio").pause();
      this.$router.push("/mv/" + mv);
    },
    singerClick(id) {
      this.$router.push("/singer/" + id);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.song-list {
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 10px;
  width: 100%;
}
.click-play {
  position: relative;
  width: 63px;
  height: 63px;
}
.click-play i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #d33a31;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
}
.click-play::after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "";
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
}
.download {
  font-size: 30px;
  color: red;
  cursor: pointer;
}
.singer:hover {
  color: #d33a31;
}
</style>
