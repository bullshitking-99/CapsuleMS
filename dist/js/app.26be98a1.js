(function(e){function t(t){for(var o,c,i=t[0],l=t[1],s=t[2],u=0,d=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&d.push(a[c][0]),a[c]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);b&&b(t);while(d.length)d.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,c=1;c<n.length;c++){var i=n[c];0!==a[i]&&(o=!1)}o&&(r.splice(t--,1),e=l(l.s=n[0]))}return e}var o={},c={app:0},a={app:0},r=[];function i(e){return l.p+"js/"+({403:"403",404:"404",login:"login",permission:"permission",charts:"charts",dashboard:"dashboard",donate:"donate",form:"form",i18n:"i18n",icon:"icon",table:"table",tabs:"tabs",upload:"upload"}[e]||e)+"."+{403:"460d67b5",404:"677c582e","chunk-2d21eaec":"6fb69b0f","chunk-37095d75":"35ef5406","chunk-0b3a3f9e":"3f081125","chunk-27998625":"19342ad9","chunk-4fc3ce9e":"723e0ea4","chunk-91cbb864":"ea8df3b2","chunk-50fdeab2":"49841467","chunk-cadb40e8":"9119725d",login:"ff973dfb",permission:"163705b0",charts:"56595dac",dashboard:"dfda80c6",donate:"bfda9bcd",form:"c77611e4",i18n:"a39093f7",icon:"db486c7d",table:"e5cf2a7d",tabs:"bd5afed2",upload:"03573ddd"}[e]+".js"}function l(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={403:1,404:1,"chunk-27998625":1,"chunk-50fdeab2":1,"chunk-cadb40e8":1,login:1,permission:1,charts:1,dashboard:1,i18n:1,icon:1,table:1,tabs:1,upload:1};c[e]?t.push(c[e]):0!==c[e]&&n[e]&&t.push(c[e]=new Promise((function(t,n){for(var o="css/"+({403:"403",404:"404",login:"login",permission:"permission",charts:"charts",dashboard:"dashboard",donate:"donate",form:"form",i18n:"i18n",icon:"icon",table:"table",tabs:"tabs",upload:"upload"}[e]||e)+"."+{403:"3b5c16e2",404:"c9df1634","chunk-2d21eaec":"31d6cfe0","chunk-37095d75":"31d6cfe0","chunk-0b3a3f9e":"31d6cfe0","chunk-27998625":"87949f3e","chunk-4fc3ce9e":"31d6cfe0","chunk-91cbb864":"31d6cfe0","chunk-50fdeab2":"e86f0be7","chunk-cadb40e8":"92936cfc",login:"a2db7048",permission:"5558d4ac",charts:"7260381f",dashboard:"6f0d24d4",donate:"31d6cfe0",form:"31d6cfe0",i18n:"8eb980b2",icon:"7763cc2b",table:"8f5dda57",tabs:"77635a52",upload:"e7981d8a"}[e]+".css",a=l.p+o,r=document.getElementsByTagName("link"),i=0;i<r.length;i++){var s=r[i],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===o||u===a))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){s=d[i],u=s.getAttribute("data-href");if(u===o||u===a)return t()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=t,b.onerror=function(t){var o=t&&t.target&&t.target.src||a,r=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=o,delete c[e],b.parentNode.removeChild(b),n(r)},b.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(b)})).then((function(){c[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var r=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=r);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=i(e);var d=new Error;s=function(t){u.onerror=u.onload=null,clearTimeout(b);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+c+")",d.name="ChunkLoadError",d.type=o,d.request=c,n[1](d)}a[e]=void 0}};var b=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=o,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)l.d(n,o,function(t){return e[t]}.bind(null,o));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/",l.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var b=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1a83":function(e,t,n){"use strict";n("c9e7")},"27e9":function(e,t,n){},"2a72":function(e,t,n){"use strict";n("7951")},3407:function(e,t,n){},"4c9e":function(e,t,n){"use strict";n("27e9")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23");function c(e,t,n,c,a,r){var i=Object(o["resolveComponent"])("router-view");return Object(o["openBlock"])(),Object(o["createBlock"])(i)}var a={};n("eed4");a.render=c;var r=a,i=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),l={class:"about"},s={class:"content"};function u(e,t,n,c,a,r){var i=Object(o["resolveComponent"])("v-header"),u=Object(o["resolveComponent"])("v-sidebar"),d=Object(o["resolveComponent"])("v-tags"),b=Object(o["resolveComponent"])("router-view");return Object(o["openBlock"])(),Object(o["createBlock"])("div",l,[Object(o["createVNode"])(i),Object(o["createVNode"])(u),Object(o["createVNode"])("div",{class:["content-box",{"content-collapse":r.collapse}]},[Object(o["createVNode"])(d),Object(o["createVNode"])("div",s,[Object(o["createVNode"])(b,null,{default:Object(o["withCtx"])((function(e){var t=e.Component;return[Object(o["createVNode"])(o["Transition"],{name:"move",mode:"out-in"},{default:Object(o["withCtx"])((function(){return[(Object(o["openBlock"])(),Object(o["createBlock"])(o["KeepAlive"],{include:r.tagsList},[(Object(o["openBlock"])(),Object(o["createBlock"])(Object(o["resolveDynamicComponent"])(t)))],1032,["include"]))]})),_:2},1024)]})),_:1})])],2)])}n("d81d"),n("b0c0");var d=n("7159"),b=n.n(d),p=Object(o["withScopeId"])("data-v-052ae8a0");Object(o["pushScopeId"])("data-v-052ae8a0");var h={class:"header"},m={key:0,class:"el-icon-s-fold"},f={key:1,class:"el-icon-s-unfold"},O=Object(o["createVNode"])("div",{class:"logo"},"时空商用版后台管理系统",-1),j={class:"header-right"},g={class:"header-user-con"},v={class:"btn-bell"},k=Object(o["createVNode"])("i",{class:"el-icon-bell"},null,-1),x={key:0,class:"btn-bell-badge"},C=Object(o["createVNode"])("div",{class:"user-avator"},[Object(o["createVNode"])("img",{src:b.a})],-1),y={class:"el-dropdown-link"},N=Object(o["createVNode"])("i",{class:"el-icon-caret-bottom"},null,-1),w=Object(o["createTextVNode"])("退出登录");Object(o["popScopeId"])();var V=p((function(e,t,n,c,a,r){var i=Object(o["resolveComponent"])("router-link"),l=Object(o["resolveComponent"])("el-tooltip"),s=Object(o["resolveComponent"])("el-dropdown-item"),u=Object(o["resolveComponent"])("el-dropdown-menu"),d=Object(o["resolveComponent"])("el-dropdown");return Object(o["openBlock"])(),Object(o["createBlock"])("div",h,[Object(o["createVNode"])("div",{class:"collapse-btn",onClick:t[1]||(t[1]=function(){return r.collapseChage&&r.collapseChage.apply(r,arguments)})},[r.collapse?(Object(o["openBlock"])(),Object(o["createBlock"])("i",f)):(Object(o["openBlock"])(),Object(o["createBlock"])("i",m))]),O,Object(o["createVNode"])("div",j,[Object(o["createVNode"])("div",g,[Object(o["createVNode"])("div",v,[Object(o["createVNode"])(l,{effect:"dark",content:a.message?"有".concat(a.message,"条未读消息"):"消息中心",placement:"bottom"},{default:p((function(){return[Object(o["createVNode"])(i,{to:"/tabs"},{default:p((function(){return[k]})),_:1})]})),_:1},8,["content"]),a.message?(Object(o["openBlock"])(),Object(o["createBlock"])("span",x)):Object(o["createCommentVNode"])("",!0)]),C,Object(o["createVNode"])(d,{class:"user-name",trigger:"click",onCommand:r.handleCommand},{dropdown:p((function(){return[Object(o["createVNode"])(u,null,{default:p((function(){return[Object(o["createVNode"])(s,{divided:"",command:"loginout"},{default:p((function(){return[w]})),_:1})]})),_:1})]})),default:p((function(){return[Object(o["createVNode"])("span",y,[Object(o["createTextVNode"])(Object(o["toDisplayString"])(r.username)+" ",1),N])]})),_:1},8,["onCommand"])])])])})),B={data:function(){return{fullscreen:!1,name:"linxin",message:2}},computed:{username:function(){var e=localStorage.getItem("ms_username");return e||this.name},collapse:function(){return this.$store.state.collapse}},methods:{handleCommand:function(e){"loginout"==e&&(localStorage.removeItem("ms_username"),this.$router.push("/login"))},collapseChage:function(){this.$store.commit("hadndleCollapse",!this.collapse)}},mounted:function(){document.body.clientWidth<1500&&this.collapseChage()}};n("4c9e");B.render=V,B.__scopeId="data-v-052ae8a0";var T=B,L=Object(o["withScopeId"])("data-v-5fb5d719");Object(o["pushScopeId"])("data-v-5fb5d719");var _={class:"sidebar"};Object(o["popScopeId"])();var S=L((function(e,t,n,c,a,r){var i=Object(o["resolveComponent"])("el-menu-item"),l=Object(o["resolveComponent"])("el-submenu"),s=Object(o["resolveComponent"])("el-menu");return Object(o["openBlock"])(),Object(o["createBlock"])("div",_,[Object(o["createVNode"])(s,{class:"sidebar-el-menu","default-active":r.onRoutes,collapse:r.collapse,"background-color":"#324157","text-color":"#bfcbd9","active-text-color":"#20a0ff","unique-opened":"",router:""},{default:L((function(){return[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(a.items,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[e.subs?(Object(o["openBlock"])(),Object(o["createBlock"])(l,{index:e.index,key:e.index},{title:L((function(){return[Object(o["createVNode"])("i",{class:e.icon},null,2),Object(o["createVNode"])("span",null,Object(o["toDisplayString"])(e.title),1)]})),default:L((function(){return[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(e.subs,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[e.subs?(Object(o["openBlock"])(),Object(o["createBlock"])(l,{index:e.index,key:e.index},{title:L((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.title),1)]})),default:L((function(){return[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(e.subs,(function(e,t){return Object(o["openBlock"])(),Object(o["createBlock"])(i,{key:t,index:e.index},{default:L((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.title),1)]})),_:2},1032,["index"])})),128))]})),_:2},1032,["index"])):(Object(o["openBlock"])(),Object(o["createBlock"])(i,{index:e.index,key:e.index},{default:L((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.title),1)]})),_:2},1032,["index"]))],64)})),256))]})),_:2},1032,["index"])):(Object(o["openBlock"])(),Object(o["createBlock"])(i,{index:e.index,key:e.index},{title:L((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.title),1)]})),default:L((function(){return[Object(o["createVNode"])("i",{class:e.icon},null,2)]})),_:2},1032,["index"]))],64)})),256))]})),_:1},8,["default-active","collapse"])])})),P=(n("ac1f"),n("5319"),{data:function(){return{items:[{icon:"el-icon-lx-home",index:"dashboard",title:"系统首页"},{icon:"el-icon-s-order",index:"0",title:"课堂考勤",subs:[{index:"attendance",title:"增加考勤"},{index:"checkAttendance",title:"查看考勤"}]},{icon:"el-icon-s-operation",index:"1",title:"聊天室管理",subs:[{index:"addChatRoom",title:"增加聊天室"},{index:"deleteChatRoom",title:"管理聊天室"}]},{icon:"el-icon-menu",index:"",title:"类别管理"},{icon:"el-icon-s-comment",index:"2",title:"评论管理",subs:[{index:"",title:"评论审核"},{index:"",title:"评论信息管理"}]},{icon:"el-icon-user",index:"3",title:"个人信息管理",subs:[{index:"",title:"修改个人信息"}]},{icon:"el-icon-setting",index:"4",title:"系统管理",subs:[{index:"",title:"友情链接管理"},{index:"",title:"修改密码"},{index:"",title:"刷新系统缓存"},{index:"",title:"安全退出"}]},{icon:"el-icon-lx-warn",index:"7",title:"权限管理",subs:[{index:"permission",title:"权限测试"},{index:"404",title:"404页面"}]}]}},computed:{onRoutes:function(){return this.$route.path.replace("/","")},collapse:function(){return this.$store.state.collapse}}});n("2a72");P.render=S,P.__scopeId="data-v-5fb5d719";var $=P,I={key:0,class:"tags"},A=Object(o["createVNode"])("i",{class:"el-icon-close"},null,-1),R={class:"tags-close-box"},D=Object(o["createTextVNode"])(" 标签选项 "),E=Object(o["createVNode"])("i",{class:"el-icon-arrow-down el-icon--right"},null,-1),F=Object(o["createTextVNode"])("关闭其他"),J=Object(o["createTextVNode"])("关闭所有");function M(e,t,n,c,a,r){var i=Object(o["resolveComponent"])("router-link"),l=Object(o["resolveComponent"])("el-button"),s=Object(o["resolveComponent"])("el-dropdown-item"),u=Object(o["resolveComponent"])("el-dropdown-menu"),d=Object(o["resolveComponent"])("el-dropdown");return r.showTags?(Object(o["openBlock"])(),Object(o["createBlock"])("div",I,[Object(o["createVNode"])("ul",null,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(r.tagsList,(function(e,t){return Object(o["openBlock"])(),Object(o["createBlock"])("li",{class:["tags-li",{active:r.isActive(e.path)}],key:t},[Object(o["createVNode"])(i,{to:e.path,class:"tags-li-title"},{default:Object(o["withCtx"])((function(){return[Object(o["createTextVNode"])(Object(o["toDisplayString"])(e.title),1)]})),_:2},1032,["to"]),Object(o["createVNode"])("span",{class:"tags-li-icon",onClick:function(e){return r.closeTags(t)}},[A],8,["onClick"])],2)})),128))]),Object(o["createVNode"])("div",R,[Object(o["createVNode"])(d,{onCommand:r.handleTags},{dropdown:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,{size:"small"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(s,{command:"other"},{default:Object(o["withCtx"])((function(){return[F]})),_:1}),Object(o["createVNode"])(s,{command:"all"},{default:Object(o["withCtx"])((function(){return[J]})),_:1})]})),_:1})]})),default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{size:"mini",type:"primary"},{default:Object(o["withCtx"])((function(){return[D,E]})),_:1})]})),_:1},8,["onCommand"])])])):Object(o["createCommentVNode"])("",!0)}n("4de4");var q={computed:{tagsList:function(){return this.$store.state.tagsList},showTags:function(){return this.tagsList.length>0}},methods:{isActive:function(e){return e===this.$route.fullPath},closeTags:function(e){var t=this.tagsList[e];this.$store.commit("delTagsItem",{index:e});var n=this.tagsList[e]?this.tagsList[e]:this.tagsList[e-1];n?t.path===this.$route.fullPath&&this.$router.push(n.path):this.$router.push("/")},closeAll:function(){this.$store.commit("clearTags"),this.$router.push("/")},closeOther:function(){var e=this,t=this.tagsList.filter((function(t){return t.path===e.$route.fullPath}));this.$store.commit("closeTagsOther",t)},setTags:function(e){var t=this.tagsList.some((function(t){return t.path===e.fullPath}));t||(this.tagsList.length>=8&&this.$store.commit("delTagsItem",{index:0}),this.$store.commit("setTagsItem",{name:e.name,title:e.meta.title,path:e.fullPath}))},handleTags:function(e){"other"===e?this.closeOther():this.closeAll()}},watch:{$route:function(e){this.setTags(e)}},created:function(){this.setTags(this.$route)}};n("1a83");q.render=M;var z=q,H={components:{vHeader:T,vSidebar:$,vTags:z},computed:{tagsList:function(){return this.$store.state.tagsList.map((function(e){return e.name}))},collapse:function(){return this.$store.state.collapse}}};H.render=u;var K=H,U=[{path:"/",redirect:"/dashboard"},{path:"/",name:"Home",component:K,children:[{path:"/dashboard",name:"dashboard",meta:{title:"系统首页"},component:function(){return Promise.all([n.e("chunk-91cbb864"),n.e("dashboard")]).then(n.bind(null,"7277"))}},{path:"/attendance",name:"attendance",meta:{title:"增加考勤"},component:function(){return Promise.all([n.e("chunk-37095d75"),n.e("chunk-0b3a3f9e")]).then(n.bind(null,"89c4"))}},{path:"/checkAttendance",name:"checkAttendance",meta:{title:"查看考勤"},component:function(){return Promise.all([n.e("chunk-37095d75"),n.e("chunk-27998625")]).then(n.bind(null,"9fd2"))}},{path:"/addChatRoom",name:"addChatRoom",meta:{title:"增加聊天室"},component:function(){return Promise.all([n.e("chunk-37095d75"),n.e("chunk-4fc3ce9e")]).then(n.bind(null,"ff16"))}},{path:"/deleteChatRoom",name:"deleteChatRoom",meta:{title:"管理聊天室"},component:function(){return Promise.all([n.e("chunk-37095d75"),n.e("chunk-cadb40e8")]).then(n.bind(null,"53d0"))}},{path:"/chatRoomInfo",name:"chatRoomInfo",meta:{title:"聊天室详情页"},component:function(){return Promise.all([n.e("chunk-37095d75"),n.e("chunk-91cbb864"),n.e("chunk-50fdeab2")]).then(n.bind(null,"1df1"))}},{path:"/editChatRoom",name:"editChatRoom",meta:{title:"编辑聊天室"},component:function(){return n.e("chunk-2d21eaec").then(n.bind(null,"d736"))}},{path:"/table",name:"basetable",meta:{title:"表格"},component:function(){return n.e("table").then(n.bind(null,"b2b5"))}},{path:"/charts",name:"basecharts",meta:{title:"图表"},component:function(){return Promise.all([n.e("chunk-91cbb864"),n.e("charts")]).then(n.bind(null,"e93d"))}},{path:"/form",name:"baseform",meta:{title:"表单"},component:function(){return n.e("form").then(n.bind(null,"5945"))}},{path:"/tabs",name:"tabs",meta:{title:"tab标签"},component:function(){return n.e("tabs").then(n.bind(null,"36e0"))}},{path:"/donate",name:"donate",meta:{title:"鼓励作者"},component:function(){return n.e("donate").then(n.bind(null,"8125"))}},{path:"/permission",name:"permission",meta:{title:"权限管理",permission:!0},component:function(){return Promise.all([n.e("chunk-37095d75"),n.e("permission")]).then(n.bind(null,"ea4b"))}},{path:"/i18n",name:"i18n",meta:{title:"国际化语言"},component:function(){return n.e("i18n").then(n.bind(null,"e172"))}},{path:"/upload",name:"upload",meta:{title:"上传插件"},component:function(){return n.e("upload").then(n.bind(null,"2679"))}},{path:"/icon",name:"icon",meta:{title:"自定义图标"},component:function(){return n.e("icon").then(n.bind(null,"771a"))}},{path:"/404",name:"404",meta:{title:"找不到页面"},component:function(){return n.e("404").then(n.bind(null,"8cdb"))}},{path:"/403",name:"403",meta:{title:"没有权限"},component:function(){return n.e("403").then(n.bind(null,"00a5"))}}]},{path:"/login",name:"Login",meta:{title:"登录"},component:function(){return Promise.all([n.e("chunk-37095d75"),n.e("login")]).then(n.bind(null,"a55b"))}}],W=Object(i["a"])({history:Object(i["b"])("/"),routes:U});W.beforeEach((function(e,t,n){document.title="".concat(e.meta.title," | vue-manage-system");var o=localStorage.getItem("user");if(o||"/login"===e.path)if(e.meta.permission){var c=JSON.parse(o).accessfield;"0"===c?n():n("/403")}else n();else n("/login")}));var G=W,Q=(n("a434"),n("5502")),X=Object(Q["a"])({state:{tagsList:[],collapse:!1,user:JSON.parse(window.localStorage.getItem("user"))},mutations:{delTagsItem:function(e,t){e.tagsList.splice(t.index,1)},setTagsItem:function(e,t){e.tagsList.push(t)},clearTags:function(e){e.tagsList=[]},closeTagsOther:function(e,t){e.tagsList=t},closeCurrentTag:function(e,t){for(var n=0,o=e.tagsList.length;n<o;n++){var c=e.tagsList[n];if(c.path===t.$route.fullPath){n<o-1?t.$router.push(e.tagsList[n+1].path):n>0?t.$router.push(e.tagsList[n-1].path):t.$router.push("/"),e.tagsList.splice(n,1);break}}},hadndleCollapse:function(e,t){e.collapse=t}},actions:{},modules:{}}),Y=n("3fd4"),Z=n("47e2"),ee=(n("7dd6"),n("3ef0")),te=n.n(ee),ne=n("b40f"),oe=n.n(ne),ce={"zh-cn":{i18n:{breadcrumb:"国际化产品",tips:"通过切换语言按钮，来改变当前内容的语言。",btn:"切换英文",title1:"常用用法",p1:"要是你把你的秘密告诉了风，那就别怪风把它带给树。",p2:"没有什么比信念更能支撑我们度过艰难的时光了。",p3:"只要能把自己的事做好，并让自己快乐，你就领先于大多数人了。"}},en:{i18n:{breadcrumb:"International Products",tips:"Click on the button to change the current language. ",btn:"Switch Chinese",title1:"Common usage",p1:"If you reveal your secrets to the wind you should not blame the wind for  revealing them to the trees.",p2:"Nothing can help us endure dark times better than our faith. ",p3:"If you can do what you do best and be happy, you're further along in life  than most people."}}},ae=Object(Z["a"])({locale:te.a.name,fallbackLocale:oe.a.name,messages:ce}),re=function(e){e.use(Y["a"],{locale:te.a}),e.use(ae)},ie=(n("d21e"),Object(o["createApp"])(r));re(ie),ie.use(X).use(G).mount("#app")},7159:function(e,t,n){e.exports=n.p+"img/img.146655c9.jpg"},7951:function(e,t,n){},c9e7:function(e,t,n){},d21e:function(e,t,n){},eed4:function(e,t,n){"use strict";n("3407")}});
//# sourceMappingURL=app.26be98a1.js.map