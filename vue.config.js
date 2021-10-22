module.exports = {
  publicPath: "/vue-music",
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
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://a.ly1520.top",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/migu": {
        target: "http://49.232.192.248:8849",
        changeOrigin: true,
        pathRewrite: {
          "^/migu": "/"
        }
      }
    }
  }
};