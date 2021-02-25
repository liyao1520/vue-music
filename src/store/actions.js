import { getSongUrl } from "@/network/api";

export default {
  ended(context) {
    if (context.state.playOrder === 1) {
      let index = context.state.currentIndex;
      let info;
      if (index !== context.state.currentList.length - 1) {
        info = context.state.currentList[index + 1];
        context.commit("changeCurrentInfo", info);
        getSongUrl(info.id).then(res => {
          context.commit("changeUrl", res.data[0].url);
          context.commit("changeCurrentIndex", index + 1);
        });
      } else {
        info = context.state.currentList[0];
        context.commit("changeCurrentInfo", info);
        getSongUrl(info.id).then(res => {
          context.commit("changeUrl", res.data[0].url);
          context.commit("changeCurrentIndex", 0);
        });
      }
    } else if (context.state.playOrder === 2) {
      let num = Math.floor(Math.random() * context.state.currentList.length);
      let info = context.state.currentList[num];
      context.commit("changeCurrentInfo", info);
      getSongUrl(info.id).then(res => {
        context.commit("changeUrl", res.data[0].url);
        context.commit("changeCurrentIndex", num);
      });
    } else if (context.state.playOrder === 3) {
      document.getElementById("audio").play();
    }
  },
  prevAndNext(context, payload) {
    let index = context.state.currentIndex;
    let info = null;
    if (payload === 0) {
      if (context.state.currentIndex === 0) {
        return;
      }
      info = context.state.currentList[index - 1];
      index -= 1;
    } else if (payload === 1) {
      if (context.state.currentIndex === context.state.currentList.length - 1) {
        info = context.state.currentList[0];
        index = 0;
      } else {
        info = context.state.currentList[index + 1];
        index += 1;
      }
    }
    context.commit("changeCurrentInfo", info);
    getSongUrl(info.id).then(res => {
      context.commit("changeUrl", res.data[0].url);
      context.commit("changeCurrentIndex", index);
    });
  }
};
