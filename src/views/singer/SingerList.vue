<template>
  <div class="singer-list">
    <div
      class="singer-list-item"
      v-for="item in list"
      :key="item.id"
      @click="itemClick(item.id)"
    >
      <div class="img-wrap"><el-image :src="item.img1v1Url" lazy /></div>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingerList",
  props: {
    list: null
  },
  methods: {
    itemClick(id) {
      this.$router.push("/singer/" + id);
    }
  }
};
</script>

<style scoped>
.singer-list {
  display: flex;
  flex-wrap: wrap;
}
.singer-list-item {
  width: calc(20% - 20px);
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  text-align: center;
  position: relative;
  justify-content: space-between;
  cursor: pointer;
}
.singer-list-item img {
  width: 100%;
}
.singer-list-item span {
  font-size: 15px;
}
</style>
