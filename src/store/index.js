import Vue from "vue";
import Vuex from "vuex";
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPlay: false,
    src: "",
    currentInfo: null,
    duration: 0, //音乐时长
    currentTime: 0, //当前时长
    currentList: null, //当前list
    currentIndex: 0, //当前index
    playOrder: 1, //播放顺序
    songControlIsShow: false,
    userId: 0,
    userList: null
  },
  mutations,
  actions,
  getters
});
