<template>
  <div>
    <router-view :key="$route.name + $route.params.id" />
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style scoped></style>
