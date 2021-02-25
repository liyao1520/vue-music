<template>
  <div class="header">
    <notice v-if="noticeIsShow" @close="noticeIsShow = false">
      <v11 />
    </notice>
    <div class="logo">
      <a href="/"><img src="~assets/img/layout/logo.png" alt=""/></a>
    </div>
    <router-go class="header-router-go" />
    <div class="header-right">
      <div class="notice">
        <img src="~assets/img/layout/公告.png" alt="" @click="noticeClick" />
      </div>

      <el-popover trigger="focus" width="300">
        <div class="hot-search">
          <h1 class="hot-search-title">热门搜索</h1>
          <ul>
            <li
              v-for="item in hotSearch"
              :key="item.first"
              @click="hotSearchClick(item.first)"
            >
              {{ item.first }}
            </li>
          </ul>
          <h1 class="hot-search-title">
            <span>历史搜索</span>
            <span class="clear-search-history" @click="clearSearchHistory"
              >删除历史</span
            >
          </h1>
          <ul>
            <li
              v-for="(item, index) in searchHistory"
              :key="index"
              @click="hotSearchClick(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <el-input
          placeholder="搜索歌曲/歌单/MV/歌手"
          prefix-icon="el-icon-search"
          size="mini"
          v-model="searchContent"
          class="search"
          @focus="focus"
          @keyup.native="keyup($event)"
          slot="reference"
        >
        </el-input>
      </el-popover>
      <div class="login">
        <i
          class="el-icon-user"
          v-if="$store.state.userId === 0"
          @click="userCLick2"
        ></i>
        <img
          :src="$store.state.userList[0].creator.avatarUrl"
          alt=""
          v-else
          style="width: 35px;height: 35px; border-radius: 50%;overflow: hidden"
          @click="userClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RouterGo from "@/components/common/RouterGo";
import Notice from "@/views/notice/Notice";
import { getHotSearch } from "@/network/api";
import V11 from "@/views/version/V11";
export default {
  name: "Header",
  components: {
    RouterGo,
    Notice,
    V11
  },
  data() {
    return {
      searchContent: "", //搜索框输入内容
      timer: null,
      noticeIsShow: false,
      hotSearch: null,
      searchHistory: null
    };
  },
  methods: {
    focus() {
      if (localStorage.getItem("search")) {
        this.searchHistory = JSON.parse(localStorage.getItem("search"));
      } else {
        this.searchHistory = [];
      }
      if (this.hotSearch) {
        return;
      } else {
        getHotSearch().then(res => {
          this.hotSearch = res.result.hots;
        });
      }
    },
    keyup(e) {
      if (e.keyCode === 13) {
        if (this.searchContent !== null && this.searchContent !== "") {
          this.searchHistoryAdd(this.searchContent);
          this.$router.push({
            path: "/search",
            query: {
              keywords: this.searchContent
            }
          });
        }
      }
    },
    userClick() {
      this.$router.push("/user");
    },
    userCLick2() {
      this.$router.replace("/login");
    },
    noticeClick() {
      this.noticeIsShow = true;
    },
    hotSearchClick(value) {
      if (this.$route.query.keywords === value) {
        return;
      }
      this.searchHistoryAdd(value);
      this.$router.push({
        path: "/search",
        query: {
          keywords: value
        }
      });
    },
    searchHistoryAdd(value) {
      let obj = localStorage.getItem("search");
      if (!obj) {
        obj = [];
      } else {
        obj = JSON.parse(localStorage.getItem("search"));
      }
      for (let i = 0; i < obj.length; i++) {
        if (obj[i] === value) {
          obj.splice(i, 1);
        }
      }
      obj.unshift(value);
      localStorage.setItem("search", JSON.stringify(obj));
      this.searchHistory = JSON.parse(localStorage.getItem("search"));
    },
    clearSearchHistory() {
      localStorage.removeItem("search");
      this.searchHistory = [];
    }
  },
  mounted() {
    let version = localStorage.getItem("version");
    if (version === "1.03") {
      return 0;
    } else {
      this.noticeClick();
      localStorage.setItem("version", "1.03");
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: var(--header-bgcolor);
}
.logo {
  height: 100%;
  width: 50px;
  text-align: center;
  padding-top: 10px;
}
.logo img {
  height: 80%;
}
.header-router-go {
  margin-left: 30px;
}
.header-right {
  position: absolute;
  right: 10px;
  display: flex;
}

.header-right > div {
  margin: 0 10px;
}

.search {
  width: 180px;
}
.search >>> input:focus {
  border-color: var(--tab-item-hover-color);
}
.notice {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.notice img {
  width: 20px;
  height: 20px;
  padding: 5px;
  border-radius: 50%;
}
.notice img:hover {
  background-color: var(--round-hover-bgcolor);
}
.theme-color {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.theme-color img {
  padding: 5px;
  border-radius: 50%;
}
.theme-color img:hover {
  background-color: var(--round-hover-bgcolor);
}
.header-right .login {
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 30px;
  cursor: pointer;
}
.login i {
  padding: 5px;
  border-radius: 50%;
}
.login i:hover {
  background-color: var(--round-hover-bgcolor);
}
.hot-search ul {
  display: flex;
  flex-wrap: wrap;
}
.hot-search li {
  padding: 4px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  color: #333333;
}
.hot-search li:hover {
  background-color: #f5f5f5;
}
.hot-search-title {
  font-size: 16px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}
.clear-search-history {
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  border: 1px solid #cccccc;
  border-radius: 5px;
}
.hot-search-title .clear-search-history:hover {
  background-color: #f5f5f5;
}
</style>
