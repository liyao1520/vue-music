export default {
  pause(state) {
    state.isPlay = false;
  },
  play(state) {
    state.isPlay = true;
  },
  changeUrl(state, payload) {
    state.src = payload;
  },
  changeCurrentInfo(stare, payload) {
    stare.currentInfo = payload;
  },
  changeDuration(state, payload) {
    state.duration = payload;
  },
  changeCurrentTime(state, payload) {
    state.currentTime = payload;
  },
  changeCurrentList(state, payload) {
    state.currentList = payload;
  },
  changeCurrentIndex(state, payload) {
    state.currentIndex = payload;
  },
  changePlayOrder(state, payload) {
    state.playOrder = payload;
  },
  changeSongControlIsShow(state, payload) {
    state.songControlIsShow = payload;
  },
  changeUserId(state, payload) {
    state.userId = payload;
  },
  changeUserList(state, payload) {
    state.userList = payload;
  }
};
