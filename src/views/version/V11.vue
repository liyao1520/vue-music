<template>
  <div>
    <div>版本1.03</div>
    <div>
      <p style="font-size: 15px;text-align: center;color: #d33a31">
        基于Vue.js的网易云音乐pc版
      </p>
    </div>
    <div class="notice-content" style="margin-top: 20px">
      <p>1.新增外语歌歌词中文翻译</p>
      <p>2.新增歌词滚动</p>
      <p>3.新增热门搜索和搜索记录</p>
      <p>4.解决了音乐不能下载的问题</p>
      <p>5.新增歌曲开启评论功能</p>
      <p>6.解决了部分BUG</p>
    </div>
    <div
      style="position: absolute;bottom: 12px; display: flex;width: 320px;text-align: center"
    >
      <span style=" flex: 1">本项目仅用于学习</span>
      <span style=" flex: 1">2021.02.22</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "V1.1"
};
</script>

<style scoped>
.notice-content p {
  margin: 8px 0;
}
</style>
