import Vue from "vue";
import VueRouter from "vue-router";
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const Recommend = () => import("../views/recommend/Recommend");
const PlayList = () => import("../views/playlist/playList");
const Search = () => import("../views/search/Search");
const SearchPlayList = () => import("../views/search/SearchPlayList");
const SearchSongs = () => import("../views/search/SearchSongs");
const SearchMv = () => import("../views/search/SearchMv");
const SearchSinger = () => import("../views/search/SearchSinger");
const TopList = () => import("../views/toplist/TopList");
const PlayLists = () => import("../views/playlists/PlayLists");
const MV = () => import("../views/mv/MV");
const MVPlay = () => import("../views/mv/MVPlay");
const Singer = () => import("../views/singer/Singer");
const SingerInfo = () => import("../views/singer/SingerInfo");
const Login = () => import("../views/login/Login");
const User = () => import("../views/user/User");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: Recommend,
  },
  {
    path: "/playlist/:id",
    component: PlayList,
  },
  {
    path: "/search",
    component: Search,
    children: [
      {
        path: "/",
        redirect: "songs",
      },
      {
        path: "songs",
        component: SearchSongs,
      },
      {
        path: "playlist",
        component: SearchPlayList,
      },
      {
        path: "mv",
        component: SearchMv,
      },
      {
        path: "singer",
        component: SearchSinger,
      },
    ],
  },
  {
    path: "/toplist",
    component: TopList,
  },
  {
    path: "/playlists",
    component: PlayLists,
  },
  {
    path: "/mv",
    component: MV,
  },
  {
    path: "/mv/:id",
    component: MVPlay,
  },
  {
    path: "/singer",
    component: Singer,
  },
  {
    path: "/singer/:id",
    component: SingerInfo,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/user",
    component: User,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/vue-music",
  routes,
});
export default router;
