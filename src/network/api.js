import { request } from "@/network/request";

//说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
export function getBanner(type) {
  return request({
    url: "/banner",
    params: { type }
  });
}
// 说明 : 调用此接口 , 可获取推荐歌单 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export function getPersonalized(limit) {
  return request({
    url: "/personalized",
    params: {
      limit
    }
  });
}
//说明 : 调用此接口 , 可获取推荐新音乐
export function getPersonalizedNewSong(limit) {
  return request({
    url: "/personalized/newsong",
    params: {
      limit
    }
  });
}
//说明 : 调用此接口 , 可获取推荐 mv
export function getPersonalizedMv() {
  return request({
    url: "/personalized/mv"
  });
}
// 获取歌曲详情
export function getSongDetail(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids
    }
  });
}
//获取音乐 url
export function getSongUrl(id) {
  return request({
    url: "/song/url",
    params: {
      id
    }
  });
}
//获取歌单详情/playlist/detail
export function getPlaylistDetail(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id
    }
  });
}
//搜索
export function getSearch(keywords, type = 1) {
  return request({
    url: "/search",
    params: {
      keywords,
      type
    }
  });
}
//搜索建议

export function getSearchSuggest(keywords) {
  return request({
    url: "/search/suggest",
    params: {
      keywords
    }
  });
}
//说明 : 调用此接口,可获取歌单分类,包含 category 信息
export function getPlayListsHot() {
  return request({
    url: "/playlist/hot"
  });
}
//说明 : 调用此接口 , 可获取网友精选碟歌单
// 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
export function getTopPlayList(cat, offset, limit = 50) {
  return request({
    url: "/top/playlist",
    params: {
      cat,
      limit,
      offset
    }
  });
}
//说明 : 调用此接口 , 可获取全部 mv
//`area`: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
// `type`: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
// `order`: 排序,可选值为上升最快,最热,最新,不填则为上升最快
// `limit`: 取出数量 , 默认为 30
// `offset`: 偏移数量 , 用于分页 , 如 :( 页数 -1)\*50, 其中 50 为 limit 的值 , 默认
// 为 0

export function getMv(area, type, order, limit, offset) {
  return request({
    url: "/mv/all",
    params: { area, type, order, limit, offset }
  });
}
//### 获取 mv 数据
export function getMvDetail(mvid) {
  return request({
    url: "/mv/detail",
    params: { mvid }
  });
}
//说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
export function getArtists(id) {
  return request({
    url: "/artists",
    params: { id }
  });
}
///mv/url
export function getMVUrl(id) {
  return request({
    url: "/mv/url",
    params: { id }
  });
}
//相似 mv    /simi/mv
export function getSimiMV(mvid) {
  return request({
    url: "/simi/mv",
    params: { mvid }
  });
}
//下载
export function downloadMp3(url) {
  return request({
    url,
    responseType: "blob",
    withCredentials: false
  });
}
//歌手分类列表
export function getArtistList(initial, type, area, limit = 50) {
  return request({
    url: "/artist/list",
    params: { initial, type, area, limit }
  });
}
//歌手描述 /artist/desc
export function getArtistDesc(id) {
  return request({
    url: "/artist/desc",
    params: { id }
  });
}
//全部歌曲 /artist/songs

export function getArtistSongsAll(id, order, limit, offset) {
  return request({
    url: "/artist/songs",
    params: { id, order, limit, offset }
  });
}
// 获取歌词
export function getLyric(id) {
  return request({
    url: "/lyric",
    params: { id }
  });
}
//获取user 信息
export function getUser(uid) {
  return request({
    url: "/user/playlist",
    params: {
      uid
    }
  });
}
// 热搜列表(简略)
export function getHotSearch() {
  return request({
    url: "/search/hot"
  });
}
//热门评论  /comment/hot
export function getHotComment(id, type, limit = 35) {
  return request({
    url: "/comment/hot",
    params: { id, type, limit }
  });
}
