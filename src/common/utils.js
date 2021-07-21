export const animateCSS = (element, animation, display, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise(resolve => {
    const animationName = `${prefix}${animation}`;
    const node = element;
    if (display === "block") {
      node.style.display = display;
    }
    if (display === "visible") {
      node.style.visibility = display;
    }
    node.classList.add(`${prefix}animated`, animationName);
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      if (display === "none") {
        node.style.display = display;
      }
      if (display === "hidden") {
        node.style.visibility = display;
      }
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, {
      once: true
    });
  });
export function dateFormat(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (!fmt) {
    fmt = "yyyy-MM-dd hh:mm:ss";
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
