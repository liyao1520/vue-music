(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-347a71e0"],{"19de":function(t,n){t.exports=function(t,n,e,i){var o="undefined"!==typeof i?[i,t]:[t],r=new Blob(o,{type:e||"application/octet-stream"});if("undefined"!==typeof window.navigator.msSaveBlob)window.navigator.msSaveBlob(r,n);else{var a=window.URL&&window.URL.createObjectURL?window.URL.createObjectURL(r):window.webkitURL.createObjectURL(r),c=document.createElement("a");c.style.display="none",c.href=a,c.setAttribute("download",n),"undefined"===typeof c.download&&c.setAttribute("target","_blank"),document.body.appendChild(c),c.click(),setTimeout((function(){document.body.removeChild(c),window.URL.revokeObjectURL(a)}),200)}}},"3b54":function(t,n,e){},"53cb":function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"title"},t._l(t.titles,(function(n,i){return e("h1",{key:i,class:{active:i===t.currentIndex},on:{click:function(n){return t.titleClick(i)}}},[t._v(" "+t._s(n)+" ")])})),0),e("song-list",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.isLoad,expression:"isLoad",modifiers:{fullscreen:!0,lock:!0}}],attrs:{"song-list":t.currentInfo}})],1)},o=[],r=e("8137"),a=e("ae94"),c={name:"TopList",components:{SongList:a["a"]},data:function(){return{titles:["热歌榜","新歌榜","原创榜","飙升榜"],topListId:[3778678,3779629,2884035,19723756],currentIndex:0,list:[[],[],[],[]],currentInfo:[],isLoad:!0}},methods:{titleClick:function(t){var n=this;if(this.currentIndex!==t){if(0!==this.list[t].length)return this.currentIndex=t,void(this.currentInfo=this.list[t]);this.isLoad=!0,this.currentIndex=t,Object(r["o"])(this.topListId[t]).then((function(e){n.list[t]=e.playlist.tracks,n.currentInfo=e.playlist.tracks,n.isLoad=!1}))}}},created:function(){var t=this;Object(r["o"])(this.topListId[0]).then((function(n){t.list[0]=n.playlist.tracks,t.currentInfo=n.playlist.tracks,t.isLoad=!1}))}},s=c,l=(e("554a"),e("2877")),u=Object(l["a"])(s,i,o,!1,null,"4abb90a8",null);n["default"]=u.exports},"554a":function(t,n,e){"use strict";e("8bca")},"8bca":function(t,n,e){},ae94:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,i=t._self._c||n;return 0!==t.songList.length?i("div",{staticClass:"song-list"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.songListInfo,lazy:!0}},[i("el-table-column",{attrs:{"min-width":t.tableWidth[0]},scopedSlots:t._u([{key:"default",fn:function(n){return[t.currentIndex===n.row.indexNum?i("i",{staticClass:"iconfont",staticStyle:{color:"#d33a31","font-size":"20px"}},[t._v("")]):i("span",[t._v(t._s(n.row.indexNum+1))])]}}],null,!1,2595150372)}),i("el-table-column",{attrs:{label:"封面",prop:"picUrl","min-width":t.tableWidth[1]},scopedSlots:t._u([{key:"default",fn:function(n){return[i("div",{staticClass:"click-play"},[i("el-image",{staticStyle:{width:"63px",height:"63px",cursor:"pointer"},attrs:{src:n.row.al.picUrl,alt:"",lazy:""},on:{click:function(e){return t.songClick(n.row.id,n.row.indexNum,n.row,e)}}}),i("i",{staticClass:"iconfont",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.songClick(n.row.id,n.row.indexNum,n.row)}}},[t._v("")])],1)]}}],null,!1,461514088)}),i("el-table-column",{attrs:{prop:"name",label:"歌名","min-width":t.tableWidth[2]}}),i("el-table-column",{attrs:{label:"歌手","min-width":t.tableWidth[3]},scopedSlots:t._u([{key:"default",fn:function(n){return[i("div",t._l(n.row.ar,(function(e,o){return i("span",{key:e.id,staticStyle:{cursor:"pointer"},on:{click:function(n){return t.singerClick(e.id)}}},[t._v(t._s(e.name+(o===n.row.ar.length-1?"":" / ")))])})),0)]}}],null,!1,2931869036)}),i("el-table-column",{attrs:{prop:"al.name",label:"专辑","min-width":t.tableWidth[4]}}),i("el-table-column",{attrs:{prop:"mv",label:"MV","min-width":t.tableWidth[5]},scopedSlots:t._u([{key:"default",fn:function(n){return[0!==n.row.mv?i("img",{staticStyle:{cursor:"pointer"},attrs:{src:e("c956"),alt:""},on:{click:function(e){return t.mvClick(n.row.mv)}}}):t._e()]}}],null,!1,3696630993)}),i("el-table-column",{attrs:{prop:"dt",label:"时长","min-width":t.tableWidth[6]}}),i("el-table-column",{attrs:{label:"下载","min-width":t.tableWidth[7]},scopedSlots:t._u([{key:"default",fn:function(n){return[i("i",{staticClass:"iconfont download",on:{click:function(e){return t.download(n.row.id,n.row.name)}}},[t._v("")])]}}],null,!1,822670995)})],1)],1):t._e()},o=[],r=(e("4160"),e("d81d"),e("b0c0"),e("159b"),e("5530")),a=e("8137"),c=e("19de"),s=e.n(c),l=e("2f62"),u={name:"SongList",data:function(){return Object(r["a"])({tableWidth:[30,70,140,120,100,50,50,50]},Object(l["c"])(["currentIndex"]))},props:{songList:{type:Array,default:function(){return[]}}},computed:{songListInfo:function(){var t=this.songList.map((function(t,n){t.indexNum=n;var e="",i=parseInt(t.dt/1e3),o=parseInt(i/60),r=i-60*o;return r=parseInt(r)<10?"0"+r:r,o=parseInt(o)<10?"0"+o:r,t.dt=o+":"+r,t.ar.forEach((function(t,n){e+=0!==n?" / "+t.name:t.name})),t.arName=e,t}));return t}},methods:{songClick:function(t,n,e){var i=this;this.$store.commit("changeCurrentList",this.songListInfo),this.$store.commit("changeCurrentInfo",e),this.$store.commit("changeCurrentIndex",e.indexNum),Object(a["s"])(t).then((function(t){i.currentIndex=n,i.$store.commit("changeUrl",t.data[0].url)}))},playAll:function(){var t=this,n=this.songListInfo[0];this.$store.commit("changeCurrentList",this.songListInfo),this.$store.commit("changeCurrentInfo",n),this.$store.commit("changeCurrentIndex",n.indexNum),Object(a["s"])(this.songListInfo[0].id).then((function(n){t.currentIndex=0,t.$store.commit("changeUrl",n.data[0].url)}))},download:function(t,n){Object(a["s"])(t).then((function(t){return t.data[0].url})).then((function(t){return Object(a["a"])(t)})).then((function(t){s()(t,n+".mp3")}))},mvClick:function(t){this.$store.commit("pause"),document.getElementById("audio").pause(),this.$router.push("/mv/"+t)},singerClick:function(t){this.$router.push("/singer/"+t)}},mounted:function(){}},d=u,f=(e("d8a9"),e("2877")),m=Object(f["a"])(d,i,o,!1,null,"32ae42ce",null);n["a"]=m.exports},b0c0:function(t,n,e){var i=e("83ab"),o=e("9bf2").f,r=Function.prototype,a=r.toString,c=/^\s*function ([^ (]*)/,s="name";i&&!(s in r)&&o(r,s,{configurable:!0,get:function(){try{return a.call(this).match(c)[1]}catch(t){return""}}})},c956:function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABNUlEQVRIS73VsUrDQBgH8P+Xxkdw7wP0bJqpBoQ+guDm1NXF2c2KCG4Gurh1rGPfoFXxKgq9Sn0DR59AhPvKSVKaYjTXXpoxhP/v7vu+3BFKfqjkfGwHmDWDlvbQcrkbT2Mknqejnx28RUHHA527BDT4oi6nnQxgXhp5E8hUwiw2FzDqJkBajcKAagZVH6iaehaBrYH3KOwxuA2g+13BZfioPv+CrIHZfmMIWkzYFwHtmlR3ecjaABGumXGWBE/g+4fi4fVjFVobEFKR6cdOha6YcZwEnwqpusuIW4BwIp7UrRMgWyIaMHO8N1b3zkqUBL1oRlwfq767JkdhDPARgLgm1Q0B2umYmrDJQWP3v/lPUesmF/l7rZpsG/jb97mHnYvwNCNz2JV+4bhc+WrWdu7kMncwB7tRLCjc4lCJAAAAAElFTkSuQmCC"},d81d:function(t,n,e){"use strict";var i=e("23e7"),o=e("b727").map,r=e("1dde"),a=e("ae40"),c=r("map"),s=a("map");i({target:"Array",proto:!0,forced:!c||!s},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},d8a9:function(t,n,e){"use strict";e("3b54")}}]);
//# sourceMappingURL=chunk-347a71e0.4ef99d03.js.map