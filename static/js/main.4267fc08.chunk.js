(this.webpackJsonpminimal_pairs=this.webpackJsonpminimal_pairs||[]).push([[0],{23:function(e,t,i){},25:function(e,t,i){},26:function(e){e.exports=JSON.parse('{"words":{"\u0251\u02d0":{"url":"\u0251.mp3","\u0251\u02d0":{"clip":[0,1]},"barn":{"spelling":"barn","phonetic":"/b\u0251\u02d0n/","image":"img/\u0251/barn.jpg","clip":[1.1,2.25]},"heart":{"spelling":"heart","phonetic":"/h\u0251\u02d0t/","image":"img/\u0251/heart.jpg","clip":[2.45,3.55]},"marsh":{"spelling":"marsh","phonetic":"/m\u0251\u02d0\u222b/","image":"img/\u0251/marsh.jpg","clip":[3.75,4.9]},"park":{"spelling":"park","phonetic":"/p\u0251\u02d0k/","image":"img/\u0251/park.jpg","clip":[5.1,6.25]},"staff":{"spelling":"staff","phonetic":"/st\u0251\u02d0f/","image":"img/\u0251/staff.jpg","clip":[6.45,7.7]}},"i\u02d0":{"url":"i.mp3","i\u02d0":{"clip":[0,0.85]},"beach":{"spelling":"beach","phonetic":"/bi\u02d0\u02a7/","image":"img/i/beach.jpg","clip":[1,2.15]},"cheek":{"spelling":"cheek","phonetic":"/\u02a7i\u02d0k/","image":"img/i/cheek.jpg","clip":[2.3,3.45]},"feast":{"spelling":"feast","phonetic":"/fi\u02d0st/","image":"img/i/feast.jpg","clip":[3.6,4.75]},"peeler":{"spelling":"peeler","phonetic":"/pi\u02d0l\u0259/","image":"img/i/peeler.jpg","clip":[4.85,6]},"sheep":{"spelling":"sheep","phonetic":"/\u222bi\u02d0p/","image":"img/i/sheep.jpg","clip":[6.15,7.3]},"sheet":{"spelling":"sheet","phonetic":"/\u222bi\u02d0t/","image":"img/i/sheet.jpg","clip":[7.45,8.55]},"teat":{"spelling":"teat","phonetic":"/ti\u02d0t/","image":"img/i/teat.jpg","clip":[8.7,9.482]}},"\u026a":{"url":"\u026a.mp3","\u026a":{"clip":[0,0.65]},"bitch":{"spelling":"bitch","phonetic":"/b\u026a\u02a7/","image":"img/\u026a/bitch.jpg","image_":"img/\u026a/bitch_.jpg","clip":[0.8,1.85]},"chick":{"spelling":"chick","phonetic":"/\u02a7\u026ak/","image":"img/\u026a/chick.jpg","clip":[2,2.95]},"fist":{"spelling":"fist","phonetic":"/f\u026ast/","image":"img/\u026a/fist.jpg","clip":[3.1,4.2]},"pillar":{"spelling":"pillar","phonetic":"/p\u026al\u0259/","image":"img/\u026a/pillar.jpg","clip":[4.35,5.35]},"ship":{"spelling":"ship","phonetic":"/\u222b\u026ap/","image":"img/\u026a/ship.jpg","clip":[5.5,6.5]},"shit":{"spelling":"shit","phonetic":"/\u222b\u026at/","image":"img/\u026a/shit_.png","clip":[6.65,7.75]},"tit":{"spelling":"tit","phonetic":"/t\u026at/","image":"img/\u026a/tit.jpg","image_":"img/\u026a/tit_.jpg","clip":[7.859,8.683]}},"\u028c":{"url":"\u028c.mp3","\u028c":{"clip":[0,0.65]},"bun":{"spelling":"bun","phonetic":"/b\u028cn/","image":"img/\u028c/bun.jpg","clip":[0.8,1.85]},"hut":{"spelling":"hut","phonetic":"/h\u028ct/","image":"img/\u028c/hut.jpg","clip":[2,3.05]},"mush":{"spelling":"mush","phonetic":"/m\u028c\u222b/","image":"img/\u028c/mush.jpg","clip":[3.2,4.1]},"puck":{"spelling":"puck","phonetic":"/p\u028ck/","image":"img/\u028c/puck.jpg","clip":[4.25,5.25]},"stuff":{"spelling":"stuff","phonetic":"/st\u028cf/","image":"img/\u028c/stuff.jpg","clip":[5.3,6.415]}}},"pairs":{"\u026ai":{"\u026a":"i\u02d0","ship":"sheep","bitch":"beach","chick":"cheek","fist":"feast","pillar":"peeler","shit":"sheet","tit":"teat"},"\u0251\u028c":{"\u0251\u02d0":"\u028c","heart":"hut","barn":"bun","marsh":"mush","park":"puck","staff":"stuff"}}}')},27:function(e,t,i){},28:function(e,t,i){"use strict";i.r(t);var n,c,s,a,r,o,l,u=i(1),p=i.n(u),d=i(17),h=i.n(d),m=(i(23),i(2)),f=i(0),g=Object(u.createContext)(),j=function(e){var t=e.children,i=new Audio,n=g.Provider,c=function(){i.pause()};return Object(f.jsx)(n,{value:{playClip:function(e,t){!function(e,t){i.src!==e&&(i.src=e);var n=Object(m.a)(t,2),s=n[0],a=1e3*(n[1]-s);i.currentTime=s,setTimeout(c,a),i.play().then((function(e){})).catch((function(e){console.log("Audio.play() error:)",e)}))}(e,t)}},children:t})},b=function(e){return Object(f.jsx)("h1",{children:"About page goes here"})},v=(i(25),Object(u.forwardRef)((function(e,t){var i=e.card,n=i.spelling,c=i.phonetic,s=i.clip,a=i.url,r=i.image,o=i.image_,l="card"+(e.role?" flipped":""),p="card-holder"+(e.role?" space":""),d=e.taboo&&o||r,h=Object(u.useContext)(g),m=e.action||function(){return h.playClip(a,s)};return Object(f.jsx)("div",{className:p,ref:t,children:Object(f.jsxs)("div",{className:l,onMouseDown:m,children:[Object(f.jsx)("img",{className:"back",src:"img/icons/sound.svg",alt:"play icon"}),Object(f.jsxs)("div",{className:"front",children:[Object(f.jsx)("img",{src:d,alt:n}),Object(f.jsx)("p",{className:"phonetic",children:c}),Object(f.jsx)("p",{className:"spelling",children:n})]})]},n)})}))),O=Object(u.forwardRef)((function(e,t){var i=Object(u.useContext)(g),n=e.index,c=e.cardData,s=e.phonemeData,a=e.role,r=e.cardRef,o=e.played,l=e.action,p=s.phoneme,d=s.url,h=s.clip,m=Object(f.jsx)(v,{card:c,role:a,ref:r,action:l}),j=o.map((function(e,t){var i=e.spelling;return Object(f.jsx)("li",{children:Object(f.jsx)(v,{card:e})},i)})),b="phoneme-".concat(n," ").concat(a);return Object(f.jsxs)("div",{className:b,ref:t,children:[Object(f.jsx)("ul",{children:j}),m," ",Object(f.jsxs)("div",{className:"pocket unselectable",children:["/",p,"/",Object(f.jsx)("button",{className:"play-phoneme",onClick:function(){return i.playClip(d,h)}})]})]})})),x=i(5),k=i(7),y=(i(18),i(15),function e(t,i,n){var c,s,a=0;if(Array.isArray(i))return a=i.reduce((function(i,c){return i+=e(t,c,n)}),0);do{(s=!((c="function"===typeof i?t.findIndex(i):t.indexOf(i))<0))&&(t.splice(c,1),a+=1)}while(n&&s);return a}),L=function(e){return e.targetTouches&&e.targetTouches.length&&(e=e.targetTouches[0]||{}),{x:e.pageX,y:e.pageY}},C=function(e){var t=e.actions,i=e.event,n=e.drag,c=e.drop,s=document.body;return i?("object"!==typeof t&&(t={}),"touchstart"===i.type?(t.move="touchmove",t.end="touchend"):(t.move="mousemove",t.end="mouseup"),s.addEventListener(t.move,n,!1),s.addEventListener(t.end,c,!1)):(s.removeEventListener(t.move,n,!1),s.removeEventListener(t.end,c,!1)),{actions:t,drag:n,drop:c}},M=function(e,t,i){return i.x<=e&&i.y<=t&&i.right>e&&i.bottom>t},w=i(26),T=Object.keys(w.pairs),N="audio/";function A(e){var t,i;n!==e&&(T.indexOf(e)<0&&(e=T[0]),i=w.pairs[e],c=Object.entries(i),s=c.shift(),a=s.map(E),function(e){for(var t=e.length;t;){var i=Math.floor(Math.random()*t);t-=1;var n=[e[i],e[t]];e[t]=n[0],e[i]=n[1]}}(c),o=l=void 0,t={},Object(k.a)(t,s[0],[]),Object(k.a)(t,s[1],[]),r=t,n=e)}function R(e,t){var i=w.words[e],n=Object(x.a)({},i[t]);return n.url=N+i.url,n}function E(e){var t=w.words[e],i=Object(x.a)({},t[e]);return i.url=N+t.url,i.phoneme=e,i}A("\u0251\u028c");var S=function(){var e=[0,1,0,1],t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=Math.max(0,Math.min(1,2*Math.random()+e));return Math.floor(t)};return function(){var i;switch(e.reduce((function(e,t){return e+t}),0)){case 0:i=1;break;case 1:i=t(.5);break;case 3:i=t(-.5);break;case 4:i=0;break;default:i=t()}return e.shift(),e.push(i),i}}(),P=function(e){var t,i,n,p,d,h,j,b,v,x,k,w,T,N=Object(u.useContext)(g),A=Object(u.useRef)(),E=Object(u.useRef)(),P=Object(u.useRef)(),_=Object(u.useRef)(),D=Object(u.useState)(0),F=Object(m.a)(D,2),H=F[0],B=F[1],I=function(){var e=s,t=Object(m.a)(e,2),i=t[0],n=t[1];o&&r[i].map((function(e){return e.spelling})).indexOf(o.spelling)<0&&(r[i].push(o),r[n].push(l));var u=c.shift();return c.push(u),o=R(i,u[0]),l=R(n,u[1]),y(r[i],o),y(r[n],l),{phonemes:a,word1:o,word2:l,played:r}}(),z=I.phonemes,J=I.word1,Y=I.word2,q=I.played,X=!1,G=function(e){var t=L(e),i=t.x,c=t.y;T=function(e,t){return["client","page","offset"].indexOf(t)<0&&(t="client"),e.targetTouches&&e.targetTouches.length&&(e=e.targetTouches[0]||{}),{x:e[t+"X"],y:e[t+"Y"]}}(e),n.style.left=w.x+i+"px",n.style.top=w.y+c+"px"},K=function(){X||(X=!0,j.classList.add("wrong"),b.classList.add("wrong"),n.classList.add("active","outside-pocket"),setTimeout((function(){h.classList.add("active","reveal","outside-pocket")}),1e3))},Q=function(){C(v),n.style={},M(T.x,T.y,x)?ne():M(T.x,T.y,k)&&K()},U=function(){N.playClip(t,i)},V=function(e){var t=e.target.closest(".space");if(t){var i=t.classList;if(i.contains("active")||i.contains("reveal"))return U()}(function(e,t){var i=t*t;return new Promise((function(t,n){var c=L(e),s=c.x,a=c.y,r={event:e,drag:function(e){var n=L(e),c=n.x,r=n.y,l=s-c,u=a-r;l*l+u*u>i&&(C(o),t())},drop:function(e){C(o),n()}},o=C(r)}))})(e,16).then((function(){return function(e){n.style.transitionDuration="0s";var t=L(e),i=t.x,c=t.y,s=document.querySelector(".cue .pocket"),a=document.querySelector(".decoy .pocket");x=s.getBoundingClientRect(),k=a.getBoundingClientRect();var r=n.getBoundingClientRect(),o=r.left,l=r.top;w={x:o-i,y:l-c},v=C({event:e,drag:G,drop:Q})}(e)})).catch(U)},W=function(){n.classList.remove("active","inside-pocket"),h.classList.remove("reveal","active","inside-pocket"),n.classList.add("deal"),h.classList.add("deal"),B(H+1)},Z=function(){h.classList.add("active","inside-pocket"),setTimeout(W,1e3)},$=function(){N.playClip(p,d),setTimeout(Z,1e3)},ee=function(){h.classList.add("reveal"),setTimeout($,200)},te=function(){n.classList.remove("outside-pocket"),n.classList.add("inside-pocket"),setTimeout(ee,200)},ie=function(){n.classList.add("outside-pocket"),setTimeout(te,200)},ne=function(){X||(n.classList.add("active"),N.playClip(t,i),setTimeout(ie,2e3))},ce=function(){var e,n=S(),c=z.map((function(c,s){var a=s===n?["decoy",E]:["cue",A],r=Object(m.a)(a,2),o=r[0],l=r[1],u=s?[Y,_]:[J,P],h=Object(m.a)(u,2),g=h[0],j=h[1],b=q[c.phoneme];return s!==n?(t=g.url,i=g.clip,e=V):(p=g.url,d=g.clip,e=null),Object(f.jsx)(O,{index:s,cardData:g,phonemeData:c,role:o,cardRef:l,ref:j,played:b,action:e})}));return n&&c.push(c.shift()),c}(),se=Object(m.a)(ce,2),ae=se[0],re=se[1];return Object(u.useEffect)((function(){n=A.current,h=E.current,j=P.current,b=_.current,h.classList.remove("deal"),setTimeout((function(){n.classList.remove("deal"),U()}),300)})),Object(f.jsxs)("div",{className:"activity",onClick:function(e){var t=e.target;t.classList.contains("pocket")&&(t.closest("[class|=phoneme").classList.contains("cue")?ne():K())},children:[ae,re,Object(f.jsx)("p",{className:"rule",children:"Tap or drag to here"}),Object(f.jsx)("button",{className:"done",onClick:function(){j.classList.remove("wrong"),b.classList.remove("wrong"),n.classList.remove("outside-pocket"),h.classList.remove("outside-pocket"),n.classList.add("inside-pocket"),h.classList.add("inside-pocket"),setTimeout(W,1e3)},children:"\u27a4"})]})},_=function(e){return Object(f.jsx)("h1",{children:"Contact page goes here"})},D=i(11),F=i(12),H=i(3),B=i(14),I=i(13),z={About:b,Activity:P,Contact:_,Index:function(e){Object(B.a)(i,e);var t=Object(I.a)(i);function i(e){var n;return Object(D.a)(this,i),(n=t.call(this,e)).itemClicked=n.itemClicked.bind(Object(H.a)(n)),n}return Object(F.a)(i,[{key:"getList",value:function(){var e=this,t=T.map((function(t){return Object(f.jsx)("li",{onClick:function(){return e.itemClicked(t)},children:t},t)}));return Object(f.jsx)("ul",{id:"index",children:t})}},{key:"itemClicked",value:function(e){A(e),this.props.startActivity()}},{key:"render",value:function(){return this.getList()}}]),i}(u.Component),Preferences:function(e){return Object(f.jsx)("h1",{children:"Preferences page goes here"})}},J=(i(27),function(){return Object(f.jsxs)("g",{className:"menu",children:[Object(f.jsx)("path",{d:" M5,20 L5,80 H95 L95,20 z",opacity:"0"}),Object(f.jsx)("path",{d:" M15,10 H85 a 10 10 180 0 1 0 20 H15 a 10 10 180 0 1 0 -20 z"}),Object(f.jsx)("path",{d:" M15,40 H85 a 10 10 180 0 1 0 20 H15 a 10 10 180 0 1 0 -20 z"}),Object(f.jsx)("path",{d:" M15,70 H85 a 10 10 180 0 1 0 20 H15 a 10 10 180 0 1 0 -20 z"})]})}),Y=function(e){var t=e.itemSelected;return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("li",{className:"unselectable",onClick:function(){return t("Index")},children:"Select minimal pair"},"index"),Object(f.jsx)("li",{className:"unselectable",onClick:function(){return t("Activity")},children:"Return to activity"},"activity"),Object(f.jsx)("li",{className:"unselectable",onClick:function(){return t("Preferences")},children:"Preferences"},"preferencs"),Object(f.jsx)("li",{className:"unselectable",onClick:function(){return t("About")},children:"About this activity"},"about"),Object(f.jsx)("li",{className:"unselectable",onClick:function(){return t("Contact")},children:"Contact us"},"contact")]})},q=function(e){var t=e.closeMenu,i=e.selectFromMenu,n=e.pane,c=e.className;return Object(f.jsx)("ul",{id:"items",className:c,ref:n,children:Object(f.jsx)(Y,{itemSelected:function(e){t(),i(e)}})})},X=function(e){Object(B.a)(i,e);var t=Object(I.a)(i);function i(e){var n;return Object(D.a)(this,i),(n=t.call(this,e)).pane=p.a.createRef(),n.callback=e.callback,n.openMenu=n.openMenu.bind(Object(H.a)(n)),n.closeMenu=n.closeMenu.bind(Object(H.a)(n)),n.state={open:!0},n.openMenu(),setTimeout(n.closeMenu,1e3),n}return Object(F.a)(i,[{key:"openMenu",value:function(e){if(!this.ignoreOpen){e&&this.toggleMenu(!0);var t=this.closeMenu;document.body.addEventListener("touchstart",t,!0),document.body.addEventListener("mousedown",t,!0)}}},{key:"closeMenu",value:function(e){var t=this;if(e&&"touchstart"===e.type)this.timeout=setTimeout((function(){return t.timeout=0}),300);else if(this.timeout)return;var i=this.pane.current;if(!e||i&&!i.contains(e.target)){this.toggleMenu(!1),this.ignoreOpen=!0,setTimeout((function(){return t.ignoreOpen=!1}),100);var n=this.closeMenu;document.body.removeEventListener("touchstart",n,!0),document.body.removeEventListener("mousedown",n,!0)}}},{key:"toggleMenu",value:function(e){var t=!this.state.open;this.setState({open:t})}},{key:"render",value:function(){var e=this.state.open?"open":"";return Object(f.jsxs)("div",{id:"menu",children:[Object(f.jsx)(q,Object(x.a)(Object(x.a)({},this.props),{},{className:e,pane:this.pane,closeMenu:this.closeMenu})),Object(f.jsx)("svg",{id:"openMenu",viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid meet",onClick:this.openMenu,children:Object(f.jsx)(J,{})})]})}}]),i}(u.Component),G=function(e){var t=Object(u.useState)("Activity"),i=Object(m.a)(t,2),n=i[0],c=i[1],s=function(e){e||(e="Activity"),c(e)},a=z[n];return Object(f.jsx)(j,{children:Object(f.jsxs)("main",{className:"split left--handed show--phonetic",children:[Object(f.jsx)(a,{startActivity:s}),Object(f.jsx)(X,{selectFromMenu:s})]})})},K=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,29)).then((function(t){var i=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;i(e),n(e),c(e),s(e),a(e)}))};h.a.render(Object(f.jsx)(G,{}),document.getElementById("root")),window.addEventListener("load",(function(){setTimeout((function(){window.scrollTo(0,1)}),0)})),K()}},[[28,1,2]]]);
//# sourceMappingURL=main.4267fc08.chunk.js.map