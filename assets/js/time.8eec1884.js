(()=>{var t={9236:()=>{var t=document.getElementById("logo-canvas"),e=t.getContext("2d"),r=document.getElementById("logo-wrap"),n=document.getElementById("splash");function o(){dimensions.update();var e=document.documentElement,o=(window.pageYOffset||e.scrollTop,e.clientTop,n.getBoundingClientRect()),i=o.top+o.height,a=o.height/2;r.style.opacity=Math.max(Math.min((i-a)/a,1),0),t.width=55*window.devicePixelRatio,t.style.width="55px",t.height=55*window.devicePixelRatio,t.style.height="55px"}function i(r){o(),e.clearRect(0,0,t.width,t.height);var n=r/1e4;e.strokeStyle=e.fillStyle="white";var a=tesseractwithrotation(n,2*n,3*n,mouse.x/100,mouse.y/100,0);drawtesseract(e,a,{x:t.width/2,y:t.height/2,size:.12*t.height,line_width:2}),requestAnimationFrame(i)}addEventListener("scroll",o),requestAnimationFrame((function(t){o(),requestAnimationFrame(i)}))},7217:()=>{var t={width:0,height:0,getWidth:function(){return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientWidth:document.body?document.body.clientWidth:0},getHeight:function(){return window.innerWidth?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body?document.body.clientHeight:0},update:function(){var t=this.getWidth(),e=this.getHeight();return(t!=this.width||e!=this.height)&&(this.width=t,this.height=e,!0)}};window.dimensions=t},2396:()=>{var t={x:0,y:0,direction:0,start:{x:0,y:0},dragging:!1,set:function(e,r){t.x=e,t.y=r,t.direction=Math.atan2(r-t.start.y,e-t.start.x)},coords:function(e){e.pageX?t.set(e.pageX,e.pageY):e.offsetX?t.set(e.offsetX,e.offsetY):e.layerX?t.set(e.layerX,e.layerY):e.targetTouches&&e.targetTouches.length>0&&t.set(e.targetTouches[0].pageX,e.targetTouches[0].pageY)},down:function(e){t.coords(e),t.start.x=t.x,t.start.y=t.y,t.dragging=!0},up:function(e){t.coords(e),t.dragging=!1}};document.addEventListener("touchstart",t.down,!0),document.addEventListener("touchend",t.up,!0),document.addEventListener("touchmove",t.coords,!0),document.addEventListener("mousedown",t.down,!0),document.addEventListener("mouseup",t.up,!0),document.addEventListener("mousemove",t.coords,!0),window.mouse=t},2308:()=>{!function(){var t=0,e=["ms","moz","webkit","o"];if("undefined"!=typeof window){for(var r=0;r<e.length&&!window.requestAnimationFrame;++r)window.requestAnimationFrame=window[e[r]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[r]+"CancelAnimationFrame"]||window[e[r]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,r){var n=(new Date).getTime(),o=Math.max(0,16-(n-t)),i=window.setTimeout((function(){e(n+o)}),o);return t=n+o,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}}()},7388:t=>{t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},8084:(t,e,r)=>{var n=r(1685),o=r(3264),i=r(3716),a=n("unscopables"),u=Array.prototype;null==u[a]&&i.f(u,a,{configurable:!0,value:o(null)}),t.exports=function(t){u[a][t]=!0}},889:(t,e,r)=>{var n=r(442);t.exports=function(t){if(!n(t))throw TypeError(String(t)+" is not an object");return t}},7165:(t,e,r)=>{"use strict";var n=r(5514),o=r(9198),i=r(9683);t.exports=function(t){for(var e=n(this),r=i(e.length),a=arguments.length,u=o(a>1?arguments[1]:void 0,r),c=a>2?arguments[2]:void 0,s=void 0===c?r:o(c,r);s>u;)e[u++]=t;return e}},9032:(t,e,r)=>{var n=r(3497),o=r(9683),i=r(9198),a=function(t){return function(e,r,a){var u,c=n(e),s=o(c.length),f=i(a,s);if(t&&r!=r){for(;s>f;)if((u=c[f++])!=u)return!0}else for(;s>f;f++)if((t||f in c)&&c[f]===r)return t||f||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},8314:(t,e,r)=>{var n=r(6907),o=r(490),i=r(5514),a=r(9683),u=r(858),c=[].push,s=function(t){var e=1==t,r=2==t,s=3==t,f=4==t,l=6==t,p=7==t,d=5==t||l;return function(v,h,y,m){for(var g,w,x=i(v),b=o(x),O=n(h,y,3),S=a(b.length),j=0,E=m||u,T=e?E(v,S):r||p?E(v,0):void 0;S>j;j++)if((d||j in b)&&(w=O(g=b[j],j,x),t))if(e)T[j]=w;else if(w)switch(t){case 3:return!0;case 5:return g;case 6:return j;case 2:c.call(T,g)}else switch(t){case 4:return!1;case 7:c.call(T,g)}return l?-1:s||f?f:T}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6),filterReject:s(7)}},5643:(t,e,r)=>{var n=r(3790),o=r(1685),i=r(8247),a=o("species");t.exports=function(t){return i>=51||!n((function(){var e=[];return(e.constructor={})[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},1707:(t,e,r)=>{var n=r(442),o=r(5042),i=r(1685)("species");t.exports=function(t){var e;return o(t)&&("function"!=typeof(e=t.constructor)||e!==Array&&!o(e.prototype)?n(e)&&null===(e=e[i])&&(e=void 0):e=void 0),void 0===e?Array:e}},858:(t,e,r)=>{var n=r(1707);t.exports=function(t,e){return new(n(t))(0===e?0:e)}},2972:t=>{var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},3086:(t,e,r)=>{var n=r(221),o=r(3028),i=r(7510),a=r(3716);t.exports=function(t,e){for(var r=o(e),u=a.f,c=i.f,s=0;s<r.length;s++){var f=r[s];n(t,f)||u(t,f,c(e,f))}}},9087:(t,e,r)=>{var n=r(9522),o=r(3716),i=r(5480);t.exports=n?function(t,e,r){return o.f(t,e,i(1,r))}:function(t,e,r){return t[e]=r,t}},5480:t=>{t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},9522:(t,e,r)=>{var n=r(3790);t.exports=!n((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]}))},2424:(t,e,r)=>{var n=r(819),o=r(442),i=n.document,a=o(i)&&o(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},4170:(t,e,r)=>{var n=r(8996);t.exports=n("navigator","userAgent")||""},8247:(t,e,r)=>{var n,o,i=r(819),a=r(4170),u=i.process,c=i.Deno,s=u&&u.versions||c&&c.version,f=s&&s.v8;f?o=(n=f.split("."))[0]<4?1:n[0]+n[1]:a&&(!(n=a.match(/Edge\/(\d+)/))||n[1]>=74)&&(n=a.match(/Chrome\/(\d+)/))&&(o=n[1]),t.exports=o&&+o},4400:t=>{t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},2389:(t,e,r)=>{var n=r(819),o=r(7510).f,i=r(9087),a=r(3727),u=r(7726),c=r(3086),s=r(6303);t.exports=function(t,e){var r,f,l,p,d,v=t.target,h=t.global,y=t.stat;if(r=h?n:y?n[v]||u(v,{}):(n[v]||{}).prototype)for(f in e){if(p=e[f],l=t.noTargetGet?(d=o(r,f))&&d.value:r[f],!s(h?f:v+(y?".":"#")+f,t.forced)&&void 0!==l){if(typeof p==typeof l)continue;c(p,l)}(t.sham||l&&l.sham)&&i(p,"sham",!0),a(r,f,p,t)}}},3790:t=>{t.exports=function(t){try{return!!t()}catch(t){return!0}}},6907:(t,e,r)=>{var n=r(7388);t.exports=function(t,e,r){if(n(t),void 0===e)return t;switch(r){case 0:return function(){return t.call(e)};case 1:return function(r){return t.call(e,r)};case 2:return function(r,n){return t.call(e,r,n)};case 3:return function(r,n,o){return t.call(e,r,n,o)}}return function(){return t.apply(e,arguments)}}},8996:(t,e,r)=>{var n=r(819),o=function(t){return"function"==typeof t?t:void 0};t.exports=function(t,e){return arguments.length<2?o(n[t]):n[t]&&n[t][e]}},819:(t,e,r)=>{var n=function(t){return t&&t.Math==Math&&t};t.exports=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof r.g&&r.g)||function(){return this}()||Function("return this")()},221:(t,e,r)=>{var n=r(5514),o={}.hasOwnProperty;t.exports=Object.hasOwn||function(t,e){return o.call(n(t),e)}},1597:t=>{t.exports={}},2689:(t,e,r)=>{var n=r(8996);t.exports=n("document","documentElement")},5321:(t,e,r)=>{var n=r(9522),o=r(3790),i=r(2424);t.exports=!n&&!o((function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},490:(t,e,r)=>{var n=r(3790),o=r(2972),i="".split;t.exports=n((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},6408:(t,e,r)=>{var n=r(4121),o=Function.toString;"function"!=typeof n.inspectSource&&(n.inspectSource=function(t){return o.call(t)}),t.exports=n.inspectSource},3016:(t,e,r)=>{var n,o,i,a=r(8078),u=r(819),c=r(442),s=r(9087),f=r(221),l=r(4121),p=r(8695),d=r(1597),v="Object already initialized",h=u.WeakMap;if(a||l.state){var y=l.state||(l.state=new h),m=y.get,g=y.has,w=y.set;n=function(t,e){if(g.call(y,t))throw new TypeError(v);return e.facade=t,w.call(y,t,e),e},o=function(t){return m.call(y,t)||{}},i=function(t){return g.call(y,t)}}else{var x=p("state");d[x]=!0,n=function(t,e){if(f(t,x))throw new TypeError(v);return e.facade=t,s(t,x,e),e},o=function(t){return f(t,x)?t[x]:{}},i=function(t){return f(t,x)}}t.exports={set:n,get:o,has:i,enforce:function(t){return i(t)?o(t):n(t,{})},getterFor:function(t){return function(e){var r;if(!c(e)||(r=o(e)).type!==t)throw TypeError("Incompatible receiver, "+t+" required");return r}}}},5042:(t,e,r)=>{var n=r(2972);t.exports=Array.isArray||function(t){return"Array"==n(t)}},6303:(t,e,r)=>{var n=r(3790),o=/#|\.prototype\./,i=function(t,e){var r=u[a(t)];return r==s||r!=c&&("function"==typeof e?n(e):!!e)},a=i.normalize=function(t){return String(t).replace(o,".").toLowerCase()},u=i.data={},c=i.NATIVE="N",s=i.POLYFILL="P";t.exports=i},442:t=>{t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},1424:t=>{t.exports=!1},4700:(t,e,r)=>{var n=r(8996),o=r(6816);t.exports=o?function(t){return"symbol"==typeof t}:function(t){var e=n("Symbol");return"function"==typeof e&&Object(t)instanceof e}},9391:(t,e,r)=>{var n=r(8247),o=r(3790);t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol();return!String(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&n&&n<41}))},8078:(t,e,r)=>{var n=r(819),o=r(6408),i=n.WeakMap;t.exports="function"==typeof i&&/native code/.test(o(i))},3264:(t,e,r)=>{var n,o=r(889),i=r(1793),a=r(4400),u=r(1597),c=r(2689),s=r(2424),f=r(8695)("IE_PROTO"),l=function(){},p=function(t){return"<script>"+t+"<\/script>"},d=function(t){t.write(p("")),t.close();var e=t.parentWindow.Object;return t=null,e},v=function(){try{n=new ActiveXObject("htmlfile")}catch(t){}v=document.domain&&n?d(n):function(){var t,e=s("iframe");if(e.style)return e.style.display="none",c.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(p("document.F=Object")),t.close(),t.F}()||d(n);for(var t=a.length;t--;)delete v.prototype[a[t]];return v()};u[f]=!0,t.exports=Object.create||function(t,e){var r;return null!==t?(l.prototype=o(t),r=new l,l.prototype=null,r[f]=t):r=v(),void 0===e?r:i(r,e)}},1793:(t,e,r)=>{var n=r(9522),o=r(3716),i=r(889),a=r(4605);t.exports=n?Object.defineProperties:function(t,e){i(t);for(var r,n=a(e),u=n.length,c=0;u>c;)o.f(t,r=n[c++],e[r]);return t}},3716:(t,e,r)=>{var n=r(9522),o=r(5321),i=r(889),a=r(5196),u=Object.defineProperty;e.f=n?u:function(t,e,r){if(i(t),e=a(e),i(r),o)try{return u(t,e,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[e]=r.value),t}},7510:(t,e,r)=>{var n=r(9522),o=r(3595),i=r(5480),a=r(3497),u=r(5196),c=r(221),s=r(5321),f=Object.getOwnPropertyDescriptor;e.f=n?f:function(t,e){if(t=a(t),e=u(e),s)try{return f(t,e)}catch(t){}if(c(t,e))return i(!o.f.call(t,e),t[e])}},7296:(t,e,r)=>{var n=r(6370),o=r(4400).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return n(t,o)}},4874:(t,e)=>{e.f=Object.getOwnPropertySymbols},6370:(t,e,r)=>{var n=r(221),o=r(3497),i=r(9032).indexOf,a=r(1597);t.exports=function(t,e){var r,u=o(t),c=0,s=[];for(r in u)!n(a,r)&&n(u,r)&&s.push(r);for(;e.length>c;)n(u,r=e[c++])&&(~i(s,r)||s.push(r));return s}},4605:(t,e,r)=>{var n=r(6370),o=r(4400);t.exports=Object.keys||function(t){return n(t,o)}},3595:(t,e)=>{"use strict";var r={}.propertyIsEnumerable,n=Object.getOwnPropertyDescriptor,o=n&&!r.call({1:2},1);e.f=o?function(t){var e=n(this,t);return!!e&&e.enumerable}:r},6794:(t,e,r)=>{var n=r(442);t.exports=function(t,e){var r,o;if("string"===e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!n(o=r.call(t)))return o;if("string"!==e&&"function"==typeof(r=t.toString)&&!n(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},3028:(t,e,r)=>{var n=r(8996),o=r(7296),i=r(4874),a=r(889);t.exports=n("Reflect","ownKeys")||function(t){var e=o.f(a(t)),r=i.f;return r?e.concat(r(t)):e}},3727:(t,e,r)=>{var n=r(819),o=r(9087),i=r(221),a=r(7726),u=r(6408),c=r(3016),s=c.get,f=c.enforce,l=String(String).split("String");(t.exports=function(t,e,r,u){var c,s=!!u&&!!u.unsafe,p=!!u&&!!u.enumerable,d=!!u&&!!u.noTargetGet;"function"==typeof r&&("string"!=typeof e||i(r,"name")||o(r,"name",e),(c=f(r)).source||(c.source=l.join("string"==typeof e?e:""))),t!==n?(s?!d&&t[e]&&(p=!0):delete t[e],p?t[e]=r:o(t,e,r)):p?t[e]=r:a(e,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&s(this).source||u(this)}))},9239:t=>{t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},7726:(t,e,r)=>{var n=r(819);t.exports=function(t,e){try{Object.defineProperty(n,t,{value:e,configurable:!0,writable:!0})}catch(r){n[t]=e}return e}},8695:(t,e,r)=>{var n=r(4344),o=r(2421),i=n("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},4121:(t,e,r)=>{var n=r(819),o=r(7726),i="__core-js_shared__",a=n[i]||o(i,{});t.exports=a},4344:(t,e,r)=>{var n=r(1424),o=r(4121);(t.exports=function(t,e){return o[t]||(o[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.16.0",mode:n?"pure":"global",copyright:"© 2021 Denis Pushkarev (zloirock.ru)"})},9198:(t,e,r)=>{var n=r(2621),o=Math.max,i=Math.min;t.exports=function(t,e){var r=n(t);return r<0?o(r+e,0):i(r,e)}},3497:(t,e,r)=>{var n=r(490),o=r(9239);t.exports=function(t){return n(o(t))}},2621:t=>{var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},9683:(t,e,r)=>{var n=r(2621),o=Math.min;t.exports=function(t){return t>0?o(n(t),9007199254740991):0}},5514:(t,e,r)=>{var n=r(9239);t.exports=function(t){return Object(n(t))}},3837:(t,e,r)=>{var n=r(442),o=r(4700),i=r(6794),a=r(1685)("toPrimitive");t.exports=function(t,e){if(!n(t)||o(t))return t;var r,u=t[a];if(void 0!==u){if(void 0===e&&(e="default"),r=u.call(t,e),!n(r)||o(r))return r;throw TypeError("Can't convert object to primitive value")}return void 0===e&&(e="number"),i(t,e)}},5196:(t,e,r)=>{var n=r(3837),o=r(4700);t.exports=function(t){var e=n(t,"string");return o(e)?e:String(e)}},2421:t=>{var e=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++e+r).toString(36)}},6816:(t,e,r)=>{var n=r(9391);t.exports=n&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},1685:(t,e,r)=>{var n=r(819),o=r(4344),i=r(221),a=r(2421),u=r(9391),c=r(6816),s=o("wks"),f=n.Symbol,l=c?f:f&&f.withoutSetter||a;t.exports=function(t){return i(s,t)&&(u||"string"==typeof s[t])||(u&&i(f,t)?s[t]=f[t]:s[t]=l("Symbol."+t)),s[t]}},3477:(t,e,r)=>{var n=r(2389),o=r(7165),i=r(8084);n({target:"Array",proto:!0},{fill:o}),i("fill")},3535:(t,e,r)=>{"use strict";var n=r(2389),o=r(8314).filter;n({target:"Array",proto:!0,forced:!r(5643)("filter")},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{"use strict";var t;function e(t,e,r,n){var o=Math.cos(e)*t[r]+Math.sin(e)*t[n],i=-Math.sin(e)*t[r]+Math.cos(e)*t[n];t[r]=o,t[n]=i}function n(t,e,r,n){var o=Math.cos(e)*t[r]-Math.sin(e)*t[n],i=Math.sin(e)*t[r]+Math.cos(e)*t[n];t[r]=o,t[n]=i}function o(t,r,o,i,a,u){for(var c=[],s=0;s<16;s++){var f={x:2*(1&s)-1,y:2*(s>>1&1)-1,z:2*(s>>2&1)-1,w:2*(s>>3&1)-1};e(f,t,"x","y"),e(f,r,"y","z"),e(f,o,"x","w"),n(f,i,"x","z"),n(f,a,"y","w"),n(f,u,"z","w"),c.push(f)}return c}function i(t,e){return{x:(t.x+Math.SQRT2*t.z)*e,y:(t.y+Math.SQRT2*t.w)*e}}r(3535),r(2308),r(2396),r(7217),r(3477),window.tesseractwithrotation=o,window.drawtesseract=function(e,r,n){for(var a=function(){if(!t){for(var e=o(0,0,0,0,0,0),r=[],n=["x","y","z","w"],i=0;i<e.length;i++)for(var a=i+1;a<e.length;a++){for(var u=0,c=0;c<4;c++)e[i][n[c]]===e[a][n[c]]&&u++;3===u&&r.push([i,a])}t=r}return t}(),u=0;u<r.length;u++){var c=i(r[u],n.size);e.beginPath(),e.arc(c.x+n.x,c.y+n.y,n.corner_radius,0,2*Math.PI),e.fill()}for(e.lineWidth=n.line_width||1,e.beginPath(),u=0;u<a.length;u++){var s=i(r[a[u][0]],n.size),f=i(r[a[u][1]],n.size);e.moveTo(s.x+n.x,s.y+n.y),e.lineTo(f.x+n.x,f.y+n.y)}e.stroke()},r(9236),$(document).ready((function(){$(".filter-search input").length&&$(".filter-search input").on("keyup touchend",(function(){var t=$(this).val().toLowerCase();$(".filter-results").hasClass("ui")?$(".filter-results tbody tr").filter((function(){$(this).text().toLowerCase().indexOf(t)>-1?$(this).removeAttr("style"):$(this).attr("style","display: none!important;")})):($(".filter-results tbody tr").filter((function(){$(this).toggle($(this).text().toLowerCase().indexOf(t)>-1)})),$(".filter-results tbody tr:visible:odd").css("background","#eeeeee"),$(".filter-results tbody tr:visible:even").css("background","#fff"))}))}))})()})();