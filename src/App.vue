<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "@/views/layout/index";
export default {
  name: "app",
  components: {
    Layout
  }
};
</script>

<style>
@import "assets/css/index.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100%;
}
</style>
