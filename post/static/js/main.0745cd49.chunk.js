(this["webpackJsonpwildly-arrogant"]=this["webpackJsonpwildly-arrogant"]||[]).push([[0],{21:function(e,t,n){e.exports=n(46)},26:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"themeNames",(function(){return p})),n.d(a,"themeColors",(function(){return y})),n.d(a,"ThemeTypeNames",(function(){return g})),n.d(a,"ThemeType",(function(){return o})),n.d(a,"TextImage",(function(){return C}));var o,r=n(0),i=n.n(r),l=n(15),c=n.n(l),s=(n(26),n(5)),h=n.n(s),u=n(16),d=n(2),m=n(17),f=n.n(m),p=(n(45),["\u72c2\u8a00\u5984\u8a9e","\u751c\u8a00\u871c\u8a9e","\u81ea\u8a00\u81ea\u8a9e","\u9178\u8a00\u9178\u8a9e","\u6d41\u8a00\u871a\u8a9e","\u80e1\u8a00\u4e82\u8a9e","\u6c61\u8a00\u7a62\u8a9e","\u540d\u8a00\u52f5\u8a9e","\u8352\u8a00\u8b2c\u8a9e"]),y=["lightblue","hotpink","lightgray","mediumslateblue","lightsalmon","lightseagreen","crimson","gold","cornflowerblue"];!function(e){e[e.BlackBackground=0]="BlackBackground",e[e.WhiteText=1]="WhiteText",e[e.BlackText=2]="BlackText",e[e.BlackBackgroundWhiteText=3]="BlackBackgroundWhiteText",e[e.WhiteBackgroundBlackText=4]="WhiteBackgroundBlackText"}(o||(o={}));var g=["\u9ed1\u5e95\u539f\u8272","\u539f\u5e95\u767d\u8272","\u539f\u5e95\u9ed1\u8272","\u9ed1\u5e95\u767d\u8272","\u767d\u5e95\u9ed1\u8272"],x=n(20),v=n(4),k=n(18),b=n(19),T=function(){function e(t,n,a){Object(k.a)(this,e),this.text=void 0,this.canvasContext=void 0,this.themeStyle=void 0,this.themeSetting=void 0,this.text=t,this.canvasContext=n,this.themeSetting=a,this.themeStyle=this.applyThemeSetting()}return Object(b.a)(e,[{key:"applyThemeSetting",value:function(){var e=this.themeSetting,t=e.type,n=e.color;switch(t){case o.WhiteText:return this.themeStyle={textColor:"#f2f2f2",borderColor:"#888888",backgroundColor:n};case o.BlackText:return this.themeStyle={textColor:"#0d0d0d",borderColor:"#777777",backgroundColor:n};case o.BlackBackgroundWhiteText:return this.themeStyle={textColor:"#f2f2f2",borderColor:n,backgroundColor:" #0d0d0d"};case o.WhiteBackgroundBlackText:return this.themeStyle={textColor:"#0d0d0d",borderColor:n,backgroundColor:"#f2f2f2"};case o.BlackBackground:default:return this.themeStyle={textColor:n,borderColor:"#777777",backgroundColor:"#0d0d0d"}}}},{key:"paintThemeTemplate",value:function(){var e=this.canvasContext,t=this.themeStyle,n=this.themeSetting,a=t.textColor,o=t.borderColor,r=t.backgroundColor;e.textBaseline="middle",e.fillStyle=r,e.fillRect(5,5,490,290),e.lineWidth=10,e.strokeStyle=o,e.strokeRect(0,0,500,300),e.font="20px sens-serif",e.globalAlpha=.8,e.fillStyle=a,e.fillText(n.name,415,285),e.globalAlpha=1,e.font="30px sans-serif"}},{key:"getBreakedTextLinesWithStyleByFontSize",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:30,t=this.text,n=this.canvasContext,a=t.split("\n"),o=[],r=0;n.font="".concat(e,"px sans-serif");var i,l=Object(v.a)(a);try{for(l.s();!(i=l.n()).done;){var c=i.value,s=n.measureText(c).width;if(s>480){var h,u="",d=Object(v.a)(c);try{for(d.s();!(h=d.n()).done;){var m=h.value,f=n.measureText(u+m).width;f<=480?(u+=m,r=Math.max(f,r)):(o.push(u),u=m)}}catch(x){d.e(x)}finally{d.f()}u&&o.push(u)}else o.push(c),r=Math.max(s,r)}}catch(x){l.e(x)}finally{l.f()}var p=e+5,y=(300-o.length*p)/2+2.5,g=(500-r)/2;return{textLines:o,fontSize:e,lineHeight:p,paddingTop:y,paddingLeft:g}}},{key:"paintTextByTextLinesAndStyle",value:function(e){var t=e.textLines,n=Object(x.a)(e,["textLines"]),a=this.canvasContext,o=n.fontSize,r=n.lineHeight,i=n.paddingTop,l={x:n.paddingLeft,y:i+r/2};a.font="".concat(o,"px sans-serif");var c,s=Object(v.a)(t);try{for(s.s();!(c=s.n()).done;){var h=c.value;a.fillText(h,l.x,l.y),l.y+=o+5}}catch(u){s.e(u)}finally{s.f()}}},{key:"paintText",value:function(){for(var e=this.text.split("\n"),t=25;t<=60;t+=5){var n=this.getBreakedTextLinesWithStyleByFontSize(t),a=n.textLines;if(n.paddingTop<t||e.length<a.length){var o=this.getBreakedTextLinesWithStyleByFontSize(t-5);return this.paintThemeTemplate(),void this.paintTextByTextLinesAndStyle(o)}}var r=this.getBreakedTextLinesWithStyleByFontSize(60);this.paintThemeTemplate(),this.paintTextByTextLinesAndStyle(r)}}]),e}(),C=function(e){var t=e.text,n=e.themeType,a=e.themeColor,o=e.onRender,l=Object(r.useRef)(),c=Object(r.useRef)(),s=y.indexOf(a),h=p[s];return Object(r.useEffect)((function(){if(l.current&&c.current){var e=l.current,r=c.current,i=e.getContext("2d");if(i)new T(t,i,{type:n,name:h,color:a}).paintText(),r.src=e.toDataURL(),null===o||void 0===o||o(r.src)}}),[t,l,c,h,n,a,o]),i.a.createElement("div",null,i.a.createElement("canvas",{ref:l,width:500,height:300,style:{display:"none"}}),i.a.createElement("img",{ref:c,alt:t,style:{display:"block",margin:"0 auto",width:"95%",maxWidth:500}}))},S=function(){var e=Object(r.useState)(0),t=Object(d.a)(e,2),n=t[0],o=t[1],l=Object(r.useState)(0),c=Object(d.a)(l,2),s=c[0],m=c[1],p=Object(r.useState)(""),y=Object(d.a)(p,2),g=y[0],x=y[1],v=Object(r.useState)(""),k=Object(d.a)(v,2),b=k[0],T=k[1],C=Object(r.useState)({facebookPostId:"",isCreatingPost:!1}),S=Object(d.a)(C,2),B=S[0],w=B.facebookPostId,E=B.isCreatingPost,j=S[1],O=a.themeNames[s],W={color:a.themeColors[s]},L={maxWidth:90*a.themeColors.length};if(Object(r.useEffect)((function(){if(E){var e=function(){var t=Object(u.a)(h.a.mark((function t(){var n,a,o;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=new FormData).append("text",g),n.append("type",O),n.append("image",b),t.next=6,f.a.post("https://script.google.com/macros/s/AKfycbxf6RbMgUDvM82LudhJLUdaogyp5yKVVp6rMu8SyE0IE3rWQcej/exec",n);case 6:"error"!==(a=t.sent).data.status?j({facebookPostId:a.data.postId,isCreatingPost:!1}):"service unavailable"===a.data.message&&(o=a.data.timeRemains,setTimeout(e,o));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();e()}})),E){return i.a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100vw",height:"100vh"}},i.a.createElement("div",{id:"loading"}),i.a.createElement("div",{className:"blink",style:{marginTop:10}},"\u6b63\u5728\u5efa\u7acb\u8cbc\u6587..."))}if(w){var F=Math.floor(.9*window.innerWidth);return i.a.createElement(i.a.Fragment,null,i.a.createElement("header",{style:W},O),i.a.createElement("main",null,i.a.createElement("iframe",{title:"facebook \u8cbc\u6587",src:"https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FWildly.Arrogant%2Fposts%2F".concat(w,"%3A0&width=").concat(F),width:F,height:F,style:{display:"block",border:"none",overflow:"hidden",margin:"0 auto"},scrolling:"no",frameBorder:"0",allowTransparency:!0})),i.a.createElement("footer",null,i.a.createElement("input",{type:"button",value:"\u8fd4\u56de",onClick:function(){!function(e){j({facebookPostId:e,isCreatingPost:E})}("")}})))}return i.a.createElement(i.a.Fragment,null,i.a.createElement("header",{style:W},O),i.a.createElement("main",null,i.a.createElement("textarea",{value:g,placeholder:"\u4f60\u6700\u8fd1\u6700\u72c2\u7684\u4e8b\u60c5\u662f\u4ec0\u9ebc?",onChange:function(e){x(e.target.value)}}),i.a.createElement("ul",{id:"choose-theme-color",className:"choose",style:L},a.themeNames.map((function(e,t){var n={color:a.themeColors[t],opacity:t===s?1:.4};return i.a.createElement("li",{key:t,style:n,onClick:function(){return m(t)}},e)}))),i.a.createElement("ul",{id:"choose-theme-type",className:"choose",style:{maxWidth:450}},a.ThemeTypeNames.map((function(e,t){var a={opacity:t===n?1:.4};return i.a.createElement("li",{key:t,style:a,onClick:function(){return o(t)}},e)}))),i.a.createElement(a.TextImage,{text:g||"\u4f60\u6700\u8fd1\u5728\u72c2\u4ec0\u9ebc?",themeType:n,themeColor:a.themeColors[s],onRender:function(e){T(e)}})),i.a.createElement("footer",null,i.a.createElement("input",{type:"button",value:"\u9001\u51fa",onClick:function(){!function(e){j({facebookPostId:w,isCreatingPost:e})}(!0)}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[21,1,2]]]);
//# sourceMappingURL=main.0745cd49.chunk.js.map