<template>
  <div class="card-list">
    <card-item
      v-for="item in info"
      :key="item.id"
      :title="item.name"
      :src="item.picUrl ? item.picUrl : item.coverImgUrl"
      :hoverInfo="item.copywriter ? item.copywriter : item.description"
      @click.native="itemClick(item.id)"
    ></card-item>
  </div>
</template>

<script>
import CardItem from "@/components/common/CardItem";
export default {
  name: "CardList",
  components: {
    CardItem
  },
  props: {
    info: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(id) {
      this.$router.push("/playlist/" + id);
    }
  }
};
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
