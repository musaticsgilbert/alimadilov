(this.webpackJsonpimagebook=this.webpackJsonpimagebook||[]).push([[0],{19:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a(1),o=a.n(i),r=a(9),s=a.n(r),l=(a(19),a(3)),c=a(10),g=a(13),h=a(12),u=a(11),d=a.n(u),p=(a(33),a(34),o.a.forwardRef((function(e,t){return Object(n.jsxs)("div",{className:"page page-cover page-cover-"+e.pos,ref:t,"data-density":"hard",children:[!0===e.bookmark?Object(n.jsx)("img",{className:"bookmark",src:"/imagebook/bookmark.png",style:{filter:"invert(10%) sepia(96%) saturate(6344%) hue-rotate(1deg) brightness(121%) contrast(113%)"},alt:"k\xf6nyvjelz\u0151",title:"Kinyit\xe1s a k\xf6nyvjelz\u0151n\xe9l",onClick:e.onBookmark}):null,Object(n.jsx)("div",{className:"page-content",children:Object(n.jsx)("h2",{children:e.children})})]})}))),m=o.a.forwardRef((function(e,t){var a="page "+(e.no_animation?"no-animation":"");return Object(n.jsx)("div",{className:a,ref:t,"data-density":"soft"|e.density,children:Object(n.jsxs)("div",{className:"page-content",children:[Object(n.jsxs)("div",{children:[void 0!==e.pageTitle?Object(n.jsx)("h2",{className:"page-header",children:e.pageTitle}):null,void 0!==e.image?Object(n.jsx)("div",{className:"page-image",children:Object(n.jsxs)("figure",{children:[Object(n.jsx)("img",{alt:e.imageCaption,src:e.image,onClick:function(a){console.log("props",e),console.log("ref",t),a.target.requestFullscreen().then((function(){}))},onLoad:function(e){e.target.style=e.target.width>e.target.height?"width: 100%":"height: 100%"}}),Object(n.jsx)("figcaption",{children:e.imageCaption})]})}):null]}),e.children?Object(n.jsx)("div",{className:"page-text",children:e.children}):null,Object(n.jsx)("div",{className:"page-footer",children:isNaN(e.pageNumber)?"":e.pageNumber})]})})})),b=function e(t){var a=this;Object(l.a)(this,e),this.routes=[],this.mode=null,this.root="/",this.add=function(e,t){return a.routes.push({path:e,cb:t}),a},this.remove=function(e){for(var t=0;t<a.routes.length;t+=1)if(a.routes[t].path===e)return a.routes.slice(t,1),a;return a},this.flush=function(){return a.routes=[],a},this.clearSlashes=function(e){return e.toString().replace(/\/$/,"").replace(/^\//,"")},this.getFragment=function(){var e="";if("history"===a.mode)e=(e=a.clearSlashes(decodeURI(window.location.pathname+window.location.search))).replace(/\?(.*)$/,""),e="/"!==a.root?e.replace(a.root,""):e;else{var t=window.location.href.match(/#(.*)$/);e=t?t[1]:""}return a.clearSlashes(e)},this.navigate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"history"===a.mode?window.history.pushState(null,null,a.root+a.clearSlashes(e)):window.location.href="".concat(window.location.href.replace(/#(.*)$/,""),"#").concat(e),a},this.listen=function(){clearInterval(a.interval),a.interval=setInterval(a.interval,50)},this.interval=function(){a.current!==a.getFragment()&&(a.current=a.getFragment(),a.routes.some((function(e){var t=a.current.match(e.path);return!!t&&(t.shift(),e.cb.apply({},t),t)})))},this.mode=window.history.pushState?"history":"hash",t.mode&&(this.mode=t.mode),t.root&&(this.root=t.root),this.listen()},j=a.p+"static/media/alimadilov.1cec68f4.jpg",k=[{type:"category",pagetitle:["Kateg\xf3ria 1","Category 1"],imagename:"h503.jpg",imagecaption:["Cser\xe9ped\xe9nyek","Earthenware"]},{type:"image",imagename:"h607.jpg",imagecaption:["Vir\xe1gok az ablakban","Flowers in the window"]},{type:"image",imagename:"f1014.jpg",imagecaption:["\xc1tj\xe1r\xf3","Passage"]},{type:"category",pagetitle:["Kateg\xf3ria 2","Category 2"],imagename:"h503.jpg",imagecaption:["Cser\xe9ped\xe9nyek","Earthenware"]},{type:"image",imagename:"h607.jpg",imagecaption:["Vir\xe1gok az ablakban","Flowers in the window"]},{type:"image",imagename:"f1014.jpg",imagecaption:["\xc1tj\xe1r\xf3","Passage"]}],f=function(e){Object(g.a)(a,e);var t=Object(h.a)(a);function a(e){var i;Object(l.a)(this,a),(i=t.call(this,e)).nextButtonClick=function(){i.setState((function(e,t){return{page:e.totalPage>e.page?e.page+1:e.page}}),(function(e){i.flipToPage()}))},i.prevButtonClick=function(){i.setState((function(e,t){return{page:0<e.page?e.page-1:e.page}}),(function(){i.flipToPage()}))},i.onPage=function(e){i.setState((function(t,a){return{page:e.data}}),(function(){i.state.router.navigate("/"+i.state.page)}))},i.onChangeOrientation=function(e){i.setState((function(t,a){return{orientation:e.data}}))},i.onChangeState=function(e){i.setState((function(t,a){return{state:e.data}}))},i.flipToPage=function(){console.log(i.state.page),i.flipBook.getPageFlip().flip(Number(i.state.page))},i.addPageToBookmark=function(){i.setState((function(e,t){return{bookmark:i.state.page}}),(function(){localStorage.setItem("bookmark",i.state.bookmark)}))},i.openBookmark=function(){i.setState((function(e,t){return{page:i.state.bookmark}}),(function(){i.flipToPage()}))},i.navigateToPage=function(e){e.preventDefault(),i.setState((function(t,a){return{page:Number(e.target.hash.substring(1).split("/")[1])}}),(function(){i.flipToPage()}))};var o="hash",r=window.innerWidth<480,s=[[Object(n.jsxs)("article",{style:{padding:"2%"},children:[Object(n.jsx)("img",{style:{margin:"1%",float:"left"},width:"40%",src:j,alt:"Alim Adilov"}),'Alim Adilov \xdczbegiszt\xe1n f\xf5v\xe1ros\xe1ban, Taskentben sz\xfcletett 1963 - ban \xe9s gyerekkor\xe1ban elkezdett j\xe1rni m\xfbv\xe9szeti szakk\xf6rre, ahol Z\xf3ja Grigorevna kiv\xe1l\xf3 fest\xf5m\xfbv\xe9szn\xf5 tan\xedtotta. 8 \xe9ves iskolai v\xe9gzetts\xe9g ut\xe1n Taskentben 4 \xe9ves M\xfbv\xe9szeti technikumot v\xe9gzett. Katonai szolg\xe1lat ut\xe1n felv\xe9telizett az eur\xf3pai hir\xfb szentp\xe9terv\xe1ri "Repin" K\xe9pz\xf5m\xfbv\xe9szeti Akad\xe9miara \xe9s ott 6 \xe9vig tanult, k\xf6zben r\xe9szt vett csoportos ki\xe1ll\xedt\xe1sokban Szovjetuni\xf3ban \xe9s sz\xe1mos k\xfclf\xf6ldi orsz\xe1gban. Az Akad\xe9mia elv\xe9gz\xe9se ut\xe1n elutazott Londonba, ahol r\xe9szt vett a "Canvas" m\xfbv\xe9szeti tanfolyamban.']}),Object(n.jsxs)("article",{style:{padding:"2%"},children:[Object(n.jsx)("br",{}),"1993 \xf3ta hazankban \xe9l \xe9s alkot. 2004-t\xf5l a Magyar Alkotom\xfbv\xe9szek Orsz\xe1gos Egyes\xfclet\xe9nek tagja. T\xf6bbnyire vegyes technik\xe1val, vegyes t\xe9m\xe1kban dolgozik. M\xfbv\xe9sztelepeknek rendszeres tagja.",Object(n.jsx)("br",{}),'"Alim Adilov fest\xf5m\xfbv\xe9sz rohan\xf3 \xe9let\xfcnk el\xe9 olyan festm\xe9nyeket \xe1ll\xedt, melyekb\xf5l sug\xe1rzik a term\xe9szet var\xe1zsa \xe9s a Teremt\xf5 j\xf3s\xe1ga. K\xe9pei, mint b\xe1sty\xe1k dacolnak a h\xe1borg\xf3 vil\xe1g forgatag\xe1val, id\xf5k \xe9s korok m\xfal\xe1s\xe1val."',Object(n.jsx)("br",{}),"Csoportos ki\xe1llit\xe1sok: Szentp\xe9terv\xe1r, Moszkva, Rosztov, Taskent, Tokyo, Kuala Lumpur, Budapest, Debrecen, B\xe9k\xe9scsaba \xd6n\xe1ll\xf3 ki\xe1ll\xedt\xe1sok: London, B\xe9k\xe9scsaba, Miskolc, Debrecen, G\xf6d\xf6ll\xf5, Kecskem\xe9t, Budapest, Malaysia (Puchong), Kuala Lumpur \xc1lland\xf3 ki\xe1ll\xedt\xe1s: Madeira"]})],[Object(n.jsxs)("article",{style:{padding:"2%"},children:[Object(n.jsx)("img",{style:{margin:"1%",float:"left"},width:"40%",src:j,alt:"Alim Adilov"}),"Alim Adilov is a painter, was born in 1963, Taskent, Uzbekistan.",Object(n.jsx)("br",{}),"During his elementary studies he was enrolled to the best drawing course in the city.",Object(n.jsx)("br",{}),"In 1979 he started the secondary art school, where strict but highly skilled teachers taught him, like the Korean Emil-Ki-Gajt, who did several successful\xa0book illustrations or the internationally reputed Vitrugonszkji. In his 5th year, he learned on advanced level.",Object(n.jsx)("br",{}),"He grew up to become an artist who is ready to work with full responsibility.",Object(n.jsx)("br",{}),"After 2 years military service, he applied to the world famous Repin Art Academy."]}),Object(n.jsxs)("article",{style:{padding:"2%"},children:[Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),"After graduating he went to England where he was a designer at a big company, so soon he could start working individually. In 1991, he got a work from an elegant gallery from the London Sloan Square, to organize an exhibition from his works. All of his paintings were purchased at once.",Object(n.jsx)("br",{}),"After settling down in Hungary, he soon became popular both in the professional and artistic fields. Besides his professional success, he found his personal happiness and his wife. They have 2 great sons. In the next couple of years, he was the regular invited member of the art camps in Hungary and in international camps."]}),Object(n.jsxs)("article",{style:{padding:"2%"},children:[Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),"He is the member of the Hungarian Art Association.",Object(n.jsx)("br",{}),"His paintings are often bought because this way the buyers can take home a slice from the East, from their holiday. The vivid colors of the paintings are reflecting the beach, the market, so the owners can feel these moments in their weekdays.",Object(n.jsx)("br",{}),"Favourably, he works on those topics which he experienced on his journey. Cities, landscapes, houses but also portraits, still lifes. All over the world he had solo and organised exhibitions and he has a permanent exhibition on Madeira."]})]],c=[],g=0,h={cv:["\xd6n\xe9letrajz","Autobiography"],toc:["Tartalomjegyz\xe9k","Contents"]};r?(c=s[1].map((function(e,t){return Object(n.jsx)(m,{pageNumber:t+1,pageTitle:h.cv[1],children:e},t+1)})),g=s[1].length):(c=Object(n.jsx)(m,{pageNumber:1,pageTitle:h.cv[1],children:s[1].reduce((function(e,t,a){return e.push(t.props.children),e}),[])},1),g=1);var u=k,d=u.reduce((function(e,t,a){return"category"===t.type&&e.push({pagenumber:a,page:t}),e}),[]),b=g+2,f=[Object(n.jsx)(p,{pos:"top",bookmark:!0,image:"/imagebook/h608.jpg",onBookmark:i.openBookmark,children:"Alim Adilov k\xe9pesk\xf6nyve"},0),c,Object(n.jsx)(m,{pageNumber:g+1,pageTitle:h.toc[1],children:Object(n.jsx)("ul",{className:"toc",children:d.map((function(e){return Object(n.jsx)("li",{children:Object(n.jsx)("a",{href:"#/"+String(b+e.pagenumber),onClick:i.navigateToPage,children:e.page.pagetitle[1]})})}))})},g+1),u.map((function(e,t){return i.createPage(e,b+t,1)})),Object(n.jsx)(p,{image:"/imagebook/h608.jpg",pos:"bottom"},g+6)];return i.state={bookmark:null,page:0,pages:f,orientation:"landscape",state:"read",totalPage:0,router:null,routingStrategy:o},i}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=new b({mode:this.state.routingStrategy}),a=0;this.isNumeric(t.getFragment())?a=Number(t.getFragment()):t.navigate("/0");var n=Number(localStorage.getItem("bookmark"));this.setState((function(i,o){return{totalPage:e.flipBook.getPageFlip().getPageCount(),page:a,bookmark:n,router:t}}),(function(){e.state.page>0&&e.flipToPage()}))}},{key:"createPage",value:function(e,t,a){return Object(n.jsx)(m,{pageNumber:t,image:"/imagebook/"+e.imagename,imageCaption:e.imagecaption[a],pageTitle:"category"===e.type?e.pagetitle[a]:void 0},t)}},{key:"isNumeric",value:function(e){return"string"==typeof e&&(!isNaN(e)&&!isNaN(parseFloat(e)))}},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"book-container container-md",children:[Object(n.jsx)("span",{children:this.state.isMobile}),Object(n.jsx)("button",{type:"button",className:"mt-1 btn btn-success",onClick:this.addPageToBookmark,title:"Oldal k\xf6nyvjelz\u0151z\xe9se",children:Object(n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-bookmark-plus",viewBox:"0 0 16 16",children:[Object(n.jsx)("path",{fillRule:"evenodd",d:"M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"}),Object(n.jsx)("path",{d:"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"})]})}),Object(n.jsx)("button",{type:"button",className:"mt-1 btn btn-danger",onClick:this.openBookmark,title:"Oldal kinyit\xe1sa a k\xf6nyvjelz\u0151h\xf6z",children:Object(n.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-bookmark-plus",viewBox:"0 0 16 16",children:[Object(n.jsx)("path",{fillRule:"evenodd",d:"M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"}),Object(n.jsx)("path",{d:"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"})]})}),Object(n.jsx)("span",{children:this.state.bookmark}),Object(n.jsx)(d.a,{width:550,height:733,size:"stretch",minWidth:315,minHeight:400,maxWidth:1e3,maxHeight:1533,maxShadowOpacity:.5,flippingTime:700,showCover:!0,mobileScrollSupport:!0,clickEventForward:["img","button","a"],drawShadow:!0,swipeDistance:0,useMouseEvents:!0,onFlip:this.onPage,onChangeOrientation:this.onChangeOrientation,onChangeState:this.onChangeState,className:"image-book",ref:function(t){return e.flipBook=t},children:this.state.pages})]})}}]),a}(o.a.Component),v=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,36)).then((function(t){var a=t.getCLS,n=t.getFID,i=t.getFCP,o=t.getLCP,r=t.getTTFB;a(e),n(e),i(e),o(e),r(e)}))};s.a.render(Object(n.jsx)(o.a.StrictMode,{children:Object(n.jsx)(f,{})}),document.getElementById("root")),v()}},[[35,1,2]]]);
//# sourceMappingURL=main.d9efb504.chunk.js.map