module.exports = {
  publicPath: "/",
  configureWebpack: {
    resolve: {
      alias: {
        //在Vue的手脚架3里面，内部已经默认配置了`'@':'src'`
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    },
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios"
    }
  }
};
