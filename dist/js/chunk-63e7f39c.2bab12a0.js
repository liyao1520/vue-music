(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63e7f39c"],{"4a02":function(t,i,e){"use strict";e("c18e")},"84a8":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return t.singerList?e("div",[e("singer-list",{attrs:{list:t.singerList}})],1):t._e()},s=[],r=e("8137"),a=e("c215"),c={name:"SearchSinger",components:{SingerList:a["a"]},data:function(){return{singerList:null}},created:function(){var t=this;Object(r["p"])(this.$route.query.keywords,100).then((function(i){t.singerList=i.result.artists}))}},l=c,u=e("2877"),o=Object(u["a"])(l,n,s,!1,null,"52f6f7aa",null);i["default"]=o.exports},c18e:function(t,i,e){},c215:function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"singer-list"},t._l(t.list,(function(i){return e("div",{key:i.id,staticClass:"singer-list-item",on:{click:function(e){return t.itemClick(i.id)}}},[e("div",{staticClass:"img-wrap"},[e("el-image",{attrs:{src:i.img1v1Url+"?param=200y200",lazy:""}})],1),e("span",[t._v(t._s(i.name))])])})),0)},s=[],r={name:"SingerList",props:{list:null},methods:{itemClick:function(t){this.$router.push("/singer/"+t)}}},a=r,c=(e("4a02"),e("2877")),l=Object(c["a"])(a,n,s,!1,null,"0b36db8d",null);i["a"]=l.exports}}]);
//# sourceMappingURL=chunk-63e7f39c.2bab12a0.js.map