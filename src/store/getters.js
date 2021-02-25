export default {
  formatDuration(state) {
    return format(state.duration);
  },
  formatCurrentTime(state) {
    return format(state.currentTime);
  }
};
function format(time) {
  let m = parseInt(time / 60);
  let s = parseInt(time - m * 60);
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  return m + ":" + s;
}
