<template>
  <div class="re-mv">
    <ul>
      <li v-for="item in list" :key="item.id" @click="itemClick(item.id)">
        <div class="play-count">{{ item.playCount | playCount }}</div>
        <img :src="item.picUrl ? item.picUrl : item.cover" alt="" />
        <div class="content">
          <div class="mv-name">{{ item.name }}</div>
          <div class="artists">
            <div v-for="artist in item.artists" :key="artist.id">
              <span> {{ artist.name }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ReMv",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  filters: {
    playCount(count) {
      if (!count) {
        return "";
      } else if (count < 10000) {
        return count;
      } else {
        return parseFloat(count / 10000).toFixed(2) + "万";
      }
    }
  },
  methods: {
    itemClick(id) {
      this.$store.commit("pause");
      document.getElementById("audio").pause();
      this.$router.push("/mv/" + id);
    }
  }
};
</script>

<style scoped>
.re-mv {
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
}
.re-mv ul {
  display: flex;
  flex-wrap: wrap;
}
.re-mv ul li {
  position: relative;
  width: calc(25% - 20px);
  margin: 20px 10px 0;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
}
.re-mv ul li:hover {
  opacity: 0.8;
}
.re-mv ul li img {
  width: 100%;
}
.content {
  display: flex;
  color: #909090;
  height: 50px;
  flex-direction: column;
}
.mv-name {
  font-size: 14px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.play-count {
  position: absolute;
  right: 5px;
  top: 5px;
  color: #ffffff;
}
.artists {
  display: flex;
  margin-top: 8px;
}
.artists span {
  padding-right: 20px;
}
</style>
