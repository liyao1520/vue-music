module.exports = {
  presets: [
    'transform-remove-console',
    '@vue/cli-plugin-babel/preset'
  ],
  plugins,
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        //在Vue的手脚架3里面，内部已经默认配置了`'@':'src'`
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://a.ly1520.top',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/miguapi': {
        target: 'http://49.232.192.248:8849',
        changeOrigin: true,
        pathRewrite: {
          '^/miguapi': '/'
        }
      }
    }
  }
};
