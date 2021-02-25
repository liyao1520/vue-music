import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import animated from "animate.css";
import VideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
Vue.use(animated);
Vue.use(VideoPlayer);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
