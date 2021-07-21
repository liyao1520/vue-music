<template>
  <div>
    <div class="r-banner">
      <el-carousel :interval="4000" type="card" height="213px" trigger="click">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <h2 class="title">推荐歌单</h2>
    <div class="cart-list">
      <card-list :info="personalizedInfo" />
    </div>
    <h2 class="title">推荐新音乐</h2>
    <re-new-song :list="personalizedNewSong" />
    <h2 class="title">推荐 mv</h2>
    <re-mv :list="personalizedMv" />
  </div>
</template>

<script>
import {
  getBanner,
  getPersonalized,
  getPersonalizedNewSong,
  getPersonalizedMv
} from "@/network/api";
//公共
import CardList from "@/components/common/CardList";
//子
import ReNewSong from "@/views/recommend/childCopms/ReNewSong";
import ReMv from "@/views/recommend/childCopms/ReMv";
export default {
  name: "Recommend",
  components: {
    CardList,
    ReNewSong,
    ReMv
  },
  data() {
    return {
      banners: [],
      personalizedInfo: null,
      personalizedNewSong: null,
      personalizedMv: null
    };
  },
  created() {
    //获取轮播图
    getBanner(0).then(res => {
      this.banners = res.banners;
    });
    //获取推荐歌单
    getPersonalized(15).then(res => {
      this.personalizedInfo = res.result;
    });
    //最新音乐
    getPersonalizedNewSong(10).then(res => {
      this.personalizedNewSong = res.result;
    });
    //mv
    getPersonalizedMv().then(res => {
      this.personalizedMv = res.result;
    });
  }
};
</script>

<style scoped>
.r-banner {
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
}
.r-banner img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
.title {
  font-size: 20px;
  margin: 5px 0 10px 30px;
  color: var(--font-color-white);
}
.cart-list {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}
</style>
