(function(){/*
 http://pcjs.org/modules/devices/device.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/input.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/led.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/rom.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/time.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/tms1500.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/machine.js (C) Jeff Parsons 2012-2017
*/
var p,aa="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},ba;if("function"==typeof Object.setPrototypeOf)ba=Object.setPrototypeOf;else{var ca;a:{var da={ya:!0},ea={};try{ea.__proto__=da;ca=ea.ya;break a}catch(a){}ca=!1}ba=ca?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var fa=ba;
function r(a,b){a.prototype=aa(b.prototype);a.prototype.constructor=a;if(fa)fa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.Fa=b.prototype}var ha="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},u="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;
function ia(){ia=function(){};u.Symbol||(u.Symbol=ja)}var ja=function(){var a=0;return function(b){return"jscomp_symbol_"+(b||"")+a++}}();function ka(){ia();var a=u.Symbol.iterator;a||(a=u.Symbol.iterator=u.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&ha(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return la(this)}});ka=function(){}}function la(a){var b=0;return ma(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}
function ma(a){ka();a={next:a};a[u.Symbol.iterator]=function(){return this};return a}function na(a){ka();var b=a[Symbol.iterator];return b?b.call(a):la(a)}function oa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}function w(a,b){if(b){var c=u;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ha(c,a,{configurable:!0,writable:!0,value:b})}}w("Number.parseInt",function(a){return a||parseInt});
w("Math.trunc",function(a){return a?a:function(a){a=Number(a);if(isNaN(a)||Infinity===a||-Infinity===a||0===a)return a;var b=Math.floor(Math.abs(a));return 0>a?-b:b}});w("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}});w("Math.log2",function(a){return a?a:function(a){return Math.log(a)/Math.LN2}});var pa="Machine";
function x(a,b,c,d){this.M=d||{};this.I=a;this.na=b;this.version=c||0;this.O={};y[this.I]||(y[this.I]=[]);y[this.I].push(this);qa(this,this.M);ra(this,this.M);sa(this,this.M.bindings);this.ga=""}var ta;
x.prototype.fa=function(a,b){var c=this;switch(a){case ua:b.onclick=function(){var a=va(c);a&&(a.value="")};break;case wa:b.value="",b.addEventListener("keypress",function(a){a=a||window.event;var d=a.which||a.keyCode;if(d){var f=b.value;b.setSelectionRange(f.length,f.length);a.stopPropagation();13==d&&(a.preventDefault(),f=b.value+="\n",b.blur(),b.focus(),xa(c,f))}})}};
function sa(a,b){var c=Array.isArray(b),d;for(d in b){var e=b[d];c&&(d=e);var f=document.getElementById(e);f?(a.O[d]=f,a.fa(d,f)):c||z(a,"unable to find device ID: "+e)}}
function ra(a,b){if(b.overrides){var c,d=ta;if(!d){d={};if(window){c||(c=window.location.search.substr(1));for(var e,f=/\+/g,h=/([^&=]+)=?([^&]*)/g;e=h.exec(c);)d[decodeURIComponent(e[1].replace(f," ")).trim()]=decodeURIComponent(e[2].replace(f," ")).trim()}ta=d}c=d;for(var g in c)0<=b.overrides.indexOf(g)&&(e=c[g],e.match(/^[+-]?[0-9.]+$/)?d=Number.parseInt(e,10):"true"==e?d=!0:"false"==e?d=!1:(d=e,e='"'+e+'"'),b[g]=d,z(a,"overriding "+a.na+" property '"+g+"' with "+e))}}
function qa(a,b){if(a.version){var c="",d=ya(a,a.I);if(d.version!=a.version){c="Machine";var e=d.version}else b.version&&b.version>a.version&&(c="Config",e=b.version);c&&(b="Error: "+a.ca("%s Device version (%3.2f) incompatible with %s version (%3.2f)",b.Ea,a.version,c,e)+"\n\nClearing your browser's cache may resolve the issue.",(c=za)&&0>Aa.indexOf(c)&&(alert(b),Aa.push(c)),z(a,b))}}
function xa(a,b){var c=Ba(a);if(c){var d=b.slice(b.lastIndexOf("\n",b.length-2)+1,-1)||a.ga;a.ga="";d=d.trim();b=d.split(" ");switch(b[0]){case "c":(c=b[1])?(z(a,"set category '"+c+"'"),Ca(a,c)):(c=Ca(a))?z(a,"cleared category '"+c+"'"):z(a,"no category set");break;case "?":var e="";Da.forEach(function(a){e+="\n"+a});e&&z(a,"default commands:"+e);default:for(b.unshift(d),d=0;d<c.length&&!c[d](b,a);d++);}}}
function va(a){var b=wa,c=a.O[b];if(void 0===c){var d=y[a.I],e;for(e in d)if(c=d[e].O[b])break;c||(c=null);a.O[b]=c}return c}function ya(a,b){if(a=y[a.I])for(var c in a)if(a[c].na==b){var d=a[c];break}return d}function A(a,b){if(a=y[a.I])for(var c in a)if(a[c].M["class"]==b){var d=a[c];break}return d}function Ba(a){var b=Ea;return B[a.I]&&B[a.I][b]}function Fa(a){var b=Ga;return a.M.bindings&&a.M.bindings[b]}function Ha(a){if(a=a.O[Ia])var b=a.textContent;return b}
function C(a,b,c){a=+a||0;a<b&&(a=b);a>c&&(a=c);return a}function D(a,b,c){a=a.M[b];void 0===a?a=c:(b=typeof c,typeof a!=b&&("boolean"==b?a=!!a:"number"==typeof c&&(a=+a)));return a}function Ja(a){if(void 0===Ka){var b=!1;if(window)try{window.localStorage.setItem(E,E),b=window.localStorage.getItem(E)==E,window.localStorage.removeItem(E)}catch(c){z(a,c.message),b=!1}Ka=b}return!!Ka}
function La(a){if(window){var b=window.navigator.userAgent;return"iOS"==a&&!!b.match(/(iPod|iPhone|iPad)/)&&!!b.match(/AppleWebKit/)||"MSIE"==a&&!!b.match(/(MSIE|Trident)/)||0<=b.indexOf(a)}return!1}function Ma(a,b){if(F&&0<=F.indexOf(Na))G+=b;else{if(a=va(a))a.value+=b,8192<a.value.length&&(a.value=a.value.substr(a.value.length-4096)),a.scrollTop=a.scrollHeight;a||(a=b.lastIndexOf("\n"),0<=a&&(console.log(G+b.substr(0,a)),G="",b=b.substr(a+1)),G+=b)}}function z(a,b){Ma(a,b+"\n")}
x.prototype.ia=function(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];Ma(this,this.ca.apply(this,[].concat([a],c instanceof Array?c:oa(na(c)))))};function H(a,b,c){if(a=a.O[b])a.textContent=c}function Ca(a,b){b=void 0===b?"":b;var c=F,d=!b&&F&&0<=F.indexOf(Na);F=b;d&&(b=G,G="",Ma(a,b));return c}
x.prototype.ca=function(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d="";var e=a.split(/%([-+ 0#]?)([0-9]*)(\.?)([0-9]*)([hlL]?)([A-Za-z%])/),f=0,h;for(h=0;h<e.length-7;h+=7){d+=e[h];var g=c[f++],n=e[h+1],k=+e[h+2]||0,q=+e[h+4]||0,l=e[h+6],m=null;switch(l){case "d":g=Math.trunc(g);case "f":l=Math.trunc(g)+"";q&&(k-=q+1);l.length<k&&("0"==n?(0>g&&k--,l=("0000000000"+Math.abs(g)).slice(-k),0>g&&(l="-"+l)):l=("          "+l).slice(-k));q&&(g=Math.trunc((g-Math.trunc(g))*Math.pow(10,
q)),l+="."+("0000000000"+Math.abs(g)).slice(-q));d+=l;break;case "s":for(;g.length<k;)g="-"==n?g+" ":" "+g;d+=g;break;case "X":m=I;case "x":m||(m=Oa);l="";do l=m[g&15]+l,g>>>=4;while(0<--k||g);d+=l;break;default:d+="(unrecognized printf conversion %"+l+")"}}return d+=e[h]};var ua="clear",wa="print",Na="buffer",Da=["c\tset category"],Ea="command",Aa=[],za="version",Ka=void 0,E="PCjs.localStorage",B={},y={},F="",G="",Oa="0123456789abcdef",I="0123456789ABCDEF";
function Pa(a,b,c){x.call(this,a,b,Qa,c);this.time=A(this,J);this.N=this.L=this.f=this.K=null;this.la=D(this,"drag",!1);this.V=D(this,"scroll",!1);this.h=!1;if(a=this.O[Ra]){b=this.M.location;this.oa=b[0];this.pa=b[1];this.g=b[2];this.s=b[3];this.u=b[4]||1;this.H=b[5]||1;this.ha=b[6]||a.naturalWidth||this.g;this.ka=b[7]||a.naturalHeight||this.s;this.Z=b[8]||0;this.$=b[9]||0;this.da=b[10]||0;this.ja=b[11]||0;(this.b=this.M.map)?(this.w=this.b.length,this.l=this.b[0].length):(this.l=this.u,this.w=this.H,
this.u=this.H=0);this.aa=D(this,"hexagonal",!1);this.a=D(this,"buttonDelay",0);this.S=this.g/(this.l+this.l*this.u)|0;this.T=this.s/(this.w+this.w*this.H)|0;this.ba=this.S*this.u|0;this.U=this.T*this.H|0;this.m=this.J=-1;Sa(this,a);Ta(this,a);if(this.time){var d=this;this.a&&(this.Y=Ua(this.time,"timerInputRelease",function(){0>d.m&&0>d.J&&K(d,-1,-1)}));this.b&&(this.a&&(this.ma=Ua(this.time,"timerKeyRelease",function(){Va(d)})),this.j=0,this.v=[],Wa(this))}this.R=this.X=-1}}r(Pa,x);
Pa.prototype.fa=function(a,b){var c=this;switch(a){case Xa:b.onclick=function(){c.f&&c.f()};break;case Ya:b.onclick=function(){c.L&&c.L()}}x.prototype.fa.call(this,a,b)};function Za(a,b){a.N=b}function $a(a){a.a?L(a.time,a.ma,a.a):Va(a)}
function Wa(a){var b=document;b.addEventListener("keydown",function(b){b=b||window.event;if(document.activeElement==a.O[Xa]){var c=ab[b.which||b.keyCode];c&&bb(a,c)&&b.preventDefault()}});b.addEventListener("keypress",function(b){b=b||window.event;var c=String.fromCharCode(b.which||b.charCode);c&&bb(a,c)&&b.preventDefault()})}
function Sa(a,b){b.addEventListener("mousedown",function(c){if(!a.h){var d=a.O[Xa];if(d){var e=window.scrollX,f=window.scrollY;d.focus();window.scrollTo(e,f)}c.button||M(a,b,cb,c)}});b.addEventListener("mousemove",function(c){a.h||M(a,b,db,c)});b.addEventListener("mouseup",function(c){a.h||c.button||M(a,b,N,c)});b.addEventListener("mouseout",function(c){a.h||(0>a.m?M(a,b,db,c):M(a,b,N,c))})}
function Ta(a,b){b.addEventListener("touchstart",function(c){a.V&&(a.h=!0);M(a,b,cb,c)});b.addEventListener("touchmove",function(c){M(a,b,db,c)});b.addEventListener("touchend",function(c){M(a,b,N,c)})}function bb(a,b){for(var c=0;c<a.b.length;c++)for(var d=a.b[c],e=0;e<d.length;e++)if(0<=d[e].split("|").indexOf(b))return a.j?16>a.v.length&&a.v.push(b):(a.j=1,K(a,e,c),$a(a)),!0;a.ia("unrecognized key '%s' (0x%02x)\n",b,b.charCodeAt(0));return!1}
function Va(a){1==a.j?(a.j++,K(a,-1,-1),$a(a)):(a.j=0,a.v.length&&bb(a,a.v.shift()))}
function M(a,b,c,d){var e=-1,f=-1,h=!1,g;if(c<N){d=d||window.event;if(d.targetTouches&&d.targetTouches.length){var n=d.targetTouches[0].pageX;var k=d.targetTouches[0].pageY;h=1<d.targetTouches.length}else n=d.pageX,k=d.pageY;var q=g=0;var l=b;do isNaN(l.offsetLeft)||(g+=l.offsetLeft,q+=l.offsetTop);while(l=l.offsetParent);n=a.ha/b.offsetWidth*(n-g)|0;k=a.ka/b.offsetHeight*(k-q)|0;b=n-a.oa;var m=k-a.pa;q=g=!1;l=n>=a.Z&&n<a.Z+a.da&&k>=a.$&&k<a.$+a.ja;if(0<=b&&b<a.g&&0<=m+a.U||l)if(h||a.V||d.preventDefault(),
0<=b&&b<a.g&&0<=m&&m<a.s){q=!0;d=a.g/a.l|0;var v=a.s/a.w|0,t=b/d|0,R=m/v|0;!a.aa||R&1||(b-=d>>1,t=b/d|0,t==a.l-1&&(b=-1));v=R*v+(a.U>>1);b-=t*d+(a.ba>>1);m-=v;0<=b&&b<a.S&&0<=m&&m<a.T&&(e=t,f=R,g=!0)}}if(!h)if(c==cb)a.m=n,a.J=k,q?(K(a,e,f),g&&a.a&&L(a.time,a.Y,a.a,!0)):l&&a.f&&a.f();else if(c==db)0<=a.m&&0<=a.J&&a.la?K(a,e,f):a.N&&a.N(e,f);else if(c==N){if(c=a.a)c=a.time,e=a.Y,c=c.a&&0<e&&e<=c.b.length?0<=c.b[e-1].W:!1;c||K(a,-1,-1);a.m=a.J=-1}else z(a,"unrecognized action: "+c)}
function K(a,b,c){if(b!=a.R||c!=a.X)a.R=b,a.X=c,a.K&&a.K(b,c)}var cb=1,db=2,N=3,Xa="power",Ya="reset",Ra="surface",ab={8:"\b"},Qa=1.11;
function eb(a,b,c){x.call(this,a,b,fb,c);a=this.O[gb];if(!a)throw Error("LED binding for '"+gb+"' missing: '"+this.M.O[gb]+"'");b=document.createElement("canvas");if(!b||!b.getContext)throw a.innerHTML="LED device requires HTML5 canvas support",Error("LED device requires HTML5 canvas support");this.ha=a;this.type=C(D(this,"type",hb),ib,jb);this.f=kb[this.type][0];this.j=kb[this.type][1];this.width=D(this,"width",this.f);this.height=D(this,"height",this.j);this.g=D(this,"cols",1);this.v=this.g+D(this,
"colsExtra",0);this.S=D(this,"rows",1);this.J=this.S+D(this,"rowsExtra",0);this.U=this.width*this.g;this.N=this.height*this.S;this.s=O("black",0);this.h=lb(this.M.color)||this.s;this.Z=O(this.h,1,.25);this.Y=O(this.h,1,2);this.m=lb(this.M.backgroundColor);this.$=D(this,"fixed",!1);this.$||(b.style.width="100%",b.style.height="auto");this.X=D(this,"hexagonal",!1);this.aa=D(this,"highlight",!0);this.K=D(this,"persistent",this.type<jb);b.setAttribute("width",this.U.toString());b.setAttribute("height",
this.N.toString());b.style.backgroundColor=this.s;a.appendChild(b);this.V=b.getContext("2d");if(this.l=document.createElement("canvas"))this.l.width=this.T=this.f*this.g,this.l.height=this.u=this.j*this.S,this.a=this.l.getContext("2d");this.ba=(this.J+1)*this.v*4;this.b=Array(this.ba);this.da=this.g<this.v?4*(this.v-this.g):0;this.w=this.H=this.L=!1;this.R=-1;var d=this;(this.time=A(this,J))&&mb(this.time,function(){P(d)})}r(eb,x);
function nb(a){for(var b=a.b,c=0;c<b.length;c+=4){var d=a,e=b,f=c;e[f]=d.type<jb?ob:" ";e[f+1]=d.h==d.s?null:d.h;e[f+2]=0;e[f+3]=Q}a.w=a.H=!0;P(a,!0)}function pb(a){a.m?(a.a.fillStyle=a.m,a.a.fillRect(0,0,a.T,a.u)):a.a.clearRect(0,0,a.T,a.u)}
function P(a,b){b=void 0===b?!1:b;if(a.w||b){if(a.type<jb){var c=-1;if(!a.K||b)pb(a);else if(a.L){c=a.g-1;var d=a.f*c;a.a.drawImage(a.l,a.f,0,d,a.u,0,0,d,a.u)}for(var e=d=0;e<a.J;e++){for(var f=0;f<a.g;f++){var h=a.b[d],g=a.b[d+1]||a.s,n=a.aa&&d==a.R;if(a.b[d+3]&Q||n||b){if(0>c||f==c)a:{var k=a,q=h;h=g;var l=f;g=e;var m=n;l=void 0===l?0:l;g=void 0===g?0:g;m=void 0===m?!1:m;var v=0;if(k.X&&!(g&1)&&(v=k.f>>1,l==k.g-1))break a;if(h&&h!=k.h){m=m?O(h,1,2):h;var t=O(h,1,.25)}else m=m?k.Y:k.h,t=k.Z;h=!1;
q=q?m:t;m==k.s&&(q=k.m,h=!0);m=l*k.f+v;t=g*k.j;k.K&&(l=l*k.f+v,g*=k.j,k.m?(k.a.fillStyle=k.m,k.a.fillRect(l,g,k.f,k.j)):k.a.clearRect(l,g,k.f,k.j));k.a.fillStyle=q;g=qb[k.type];3==g.length?(k.a.beginPath(),k.a.arc(m+g[0],t+g[1],g[2],0,2*Math.PI),h?(k.a.globalCompositeOperation="destination-out",k.a.fill(),k.a.globalCompositeOperation="source-over"):k.a.fill()):k.a.fillRect(m+g[0],t+g[1],g[2],g[3])}a.b[d+3]=n?a.b[d+3]|Q:a.b[d+3]&~Q}d+=4}d+=a.da}a.L=!1}else{b="";for(c=0;c<a.b.length;c+=4)b+=a.b[c]||
" ",a.b[c+3]&rb&&(b+=".");pb(a);for(e=d=c=0;c<b.length;c++){g=b[c];"."==g&&d&&d--;f=a;n=d;k=e;n=void 0===n?0:n;k=void 0===k?0:k;if(g=sb[g])for(h=0;h<g.length;h++)if(l=f,v=tb[g[h]]){q=(void 0===n?0:n)*l.f;m=(void 0===k?0:k)*l.j;l.a.fillStyle=l.h;l.a.beginPath();if(3==v.length)l.a.arc(q+v[0],m+v[1],v[2],0,2*Math.PI);else for(t=0;t<v.length;t+=2)t?l.a.lineTo(q+v[t],m+v[t+1]):l.a.moveTo(q+v[t],m+v[t+1]);l.a.closePath();l.a.fill()}if(++d==a.g&&(d=0,++e==a.J))break}}a.V.globalCompositeOperation=a.m&&a.h!=
a.s?"source-over":"copy";a.V.drawImage(a.l,0,0,a.T,a.u,0,0,a.U,a.N);a.w=!1;a.R=-1}else a.K||a.H||nb(a);a.H=!1}function lb(a){return(a=a||void 0)&&ub[a]||a}
function O(a,b,c){b=void 0===b?1:b;c=void 0===c?1:c;if(a){var d=[];a=ub[a]||a;var e=a;var f=16;var h=e.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);h||(f=10,h=e.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,?\s*(\d+|)\)$/i));if(h){for(e=1;e<h.length;e++)d[e-1]=Number.parseInt(h[e],f);d.length=e-1;f=!0}else f=!1;if(f){a="rgba(";for(f=0;3>f;f++)h=Math.round(d[f]*c),h=0>h?0:255<h?255:h,a+=h+",";a+=(f<d.length?d[f]:b)+")"}}return a}
function vb(a,b,c,d,e){var f=!1;e=(void 0===e?0:e)&wb;b=4*(c*a.v+b);if(b<=a.b.length-4){if(a.b[b]!==d||(a.b[b+3]&wb)!==e)a.b[b]=d,a.b[b+3]=a.b[b+3]&~wb|e|Q,a.w=f=!0;a.L=!1;a.R=b;a.H=!0}return f}
var ib=0,hb=1,jb=3,gb="container",ub={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",
darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",
goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",
lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",
olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",
slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},ob=0,wb=129,rb=1,Q=128,xb={},qb=(xb[ib]=[4,4,3],xb[hb]=[16,16,14],xb[2]=[2,2,28,28],xb),kb=[[8,8],[32,32],[32,32],[96,128]],tb={A:[30,8,79,8,67,19,37,19],B:[83,10,77,52,67,46,70,22],C:[77,59,71,100,61,89,64,64],
D:[28,91,58,91,69,104,15,104],E:[18,59,28,64,25,88,12,100],F:[24,10,34,21,31,47,18,52],G:[24,56,34,50,60,50,71,56,61,61,33,61],P:[80,102,8]},sb={" ":[],0:"ABCDEF".split(""),1:["B","C"],2:["A","B","D","E","G"],3:["A","B","C","D","G"],4:["B","C","F","G"],5:["A","C","D","F","G"],6:"ACDEFG".split(""),7:["A","B","C"],8:"ABCDEFG".split(""),9:"ABCDFG".split(""),"-":["G"],E:["A","D","E","F","G"],".":["P"]},fb=1.11;
function yb(a,b,c){x.call(this,a,b,zb,c);this.data=c.values;this.h=this.data.length-1;if(this.O[Ga]){var d=this;c=Math.log2(this.data.length)/2;this.f=Math.pow(2,Math.ceil(c));this.g=Math.pow(2,Math.floor(c));this.a=new eb(a,b+"LEDs",{"class":"LED",bindings:{container:Fa(this)},type:hb,cols:this.f,rows:this.g,color:D(this,"colorROM","green"),backgroundColor:D(this,"backgroundColorROM","black"),persistent:!0}),nb(this.a);this.j=new Pa(a,b+"Input",{"class":"Input",location:[0,0,this.a.U,this.a.N,this.f,
this.g],bindings:{surface:Fa(this)}});this.l=Ha(this);Za(this.j,function(a,b){if(d.b){var c=d.l;0<=a&&0<=b&&(a=b*d.f+a,c=Ab(d.b,d.data[a],a));H(d,Ia,c)}})}}r(yb,x);function Bb(a,b,c){a.a&&!c&&vb(a.a,b%a.f,b/a.f|0,1,Q);return a.data[b]}function Cb(a,b){(b=b.shift())&&a.a&&a.a.b.length==b.length&&(a.a.b=b,P(a.a,!0))}function Db(a,b){a.a&&b.push(a.a.b)}var Ga="array",Ia="cellDesc",zb=1.11;
function S(a,b,c){x.call(this,a,b,Eb,c);this.da=D(this,"cyclesMinimum",1E5);this.oa=D(this,"cyclesMaximum",3E6);this.Y=C(D(this,"cyclesPerSecond",65E4),this.da,this.oa);this.L=C(D(this,"yieldsPerSecond",Fb),30,120);this.pa=C(D(this,"yieldsPerUpdate",Gb),1,this.L);this.aa=(this.m=D(this,"clockByFrame",!0))||D(this,"requestAnimationFrame",!0);this.ka=this.la=this.U=1;this.ba=this.Y/1E4/100;this.h=this.u=this.ba*this.U;this.w=0;this.X=Math.round(1E3/this.L);this.Z=[];this.V=[];this.b=[];this.$=[];this.a=
this.H=this.s=!1;this.J=this.g=0;this.sa=this.Ca.bind(this);this.ra=this.ja.bind(this);this.ha=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.setTimeout).bind(window);if(this.m)this.K=this.ma=0;else{var d=this;Ua(this,"timerYield",function(){d.H=!0;var a=d.w,b=Hb(d);b>=d.L?d.w++:d.w+=Math.ceil(d.L/b);d.w>=d.pa&&a<d.pa&&T(d);d.w>=d.L&&(d.w=0)},this.X)}this.S=this.R=this.l=0;Ib(this)||Jb(this,this.ka)}r(S,x);function mb(a,b){a.Z.push(b)}
S.prototype.fa=function(a,b){var c=this;switch(a){case Kb:b.onclick=function(){c.a?U(c):c.start()};break;case Lb:b.onclick=function(){Mb(c)};break;case Nb:b.addEventListener("mousedown",function(){c.s=!0}),b.addEventListener("mouseup",function(){Ib(c);c.s=!1}),b.addEventListener("mousemove",function(){c.s&&Ib(c)}),b.addEventListener("change",function(){c.s=!0;Ib(c);c.s=!1})}x.prototype.fa.call(this,a,b)};
function Ua(a,b,c,d){d=void 0===d?-1:d;var e=a.b.length+1;a.b.push({id:b,za:c,qa:d,W:-1});0<=d&&L(a,e,d);return e}S.prototype.ja=function(){if(this.m){if(!this.a)return;Ob(this);try{this.H=!1;do{var a=this.K+=this.ma;if(1>a)a=0;else{a|=0;for(var b=this.b.length;0<b;b--){var c=this.b[b-1];!(0>c.W)&&a>c.W&&(a=c.W)}}Pb(this,V(this,Qb(this,a)))}while(this.a&&!this.H)}catch(d){z(this,d.message);U(this);return}Rb(this)}for(a=0;a<this.Z.length;a++)this.Z[a]();this.a&&this.aa&&this.ha(this.ra)};
function Sb(a){var b=a.h/a.ba;if(!b||b>a.U)b=a.U;a.Ba=a.Y/a.L*b;a.la=b}function Qb(a,b,c){a.R=a.l=b;if(!a.V.length)return a.l=0,a.R;for(var d=0;0<a.l;)d<a.V.length?b=a.V[d++](c?0:b)||1:d=b=0,a.l-=b;return a.R-a.l}function Tb(a,b){var c=Date.now();b()&&(a.N+=Date.now()-c)}function V(a,b){b=void 0===b?a.R-a.l:b;a.m&&a.a&&(a.K-=b,1>a.K&&(a.H=!0));a.R=a.l=0;a.T+=b;a.S+=b;a.a||(a.S=0);return b}function Hb(a,b){return Math.ceil(a.Y*a.la/1E3*(void 0===b?1E3:b))}
function Ub(a){1<=a?a=a.toFixed(2)+"Mhz":(a=Math.round(1E6*a),a=999>=a?a+"Hz":Math.ceil(a/1E3)+"Khz");return a}function Mb(a,b){a.a?z(a,"already running"):a.g?U(a):Vb(a,b)}S.prototype.Ca=function(){this.J=0;if(this.a){Ob(this);try{this.H=!1;do{for(var a=Hb(this,this.X),b=this.b.length;0<b;b--){var c=this.b[b-1];!(0>c.W)&&a>c.W&&(a=c.W)}Pb(this,V(this,Qb(this,a)))}while(this.a&&!this.H)}catch(d){z(this,d.message);U(this);return}this.a&&(this.J=setTimeout(this.sa,Rb(this)),this.aa||this.ja())}};
function Ib(a){var b=a.O[Nb];return b?(Jb(a,Math.floor((b.value-b.min)/(b.max-b.min)*(a.oa-a.da)+a.da)/a.Y),!0):!1}function Jb(a,b){void 0!==b&&(!a.s&&0<a.h&&a.h<.9*a.u&&(b=a.ka),a.U=b,b=a.ba*a.U,a.u!=b&&(a.u=b,H(a,Wb,Ub(a.u))),a.h=a.u);a.m&&(a.ma=1E6*a.h/60+1e-8,a.K=0);a.S=0;a.f=a.j=0;Sb(a);for(b=a.b.length;0<b;b--){var c=a.b[b-1];0<=c.qa&&L(a,b,c.qa,!0)}}function L(a,b,c,d){0<b&&b<=a.b.length&&(b=a.b[b-1],d||0>b.W)&&(c=Hb(a,c),a.a&&(c+=V(a)),b.W=c)}
function Ob(a){Sb(a);a.T=0;a.N=0;a.v=Date.now();a.f||(a.f=a.v);if(a.j){var b=a.v-a.j;b>a.X&&(a.f+=b,a.f>a.v&&(a.f=a.v))}}function Rb(a){a.j=Date.now();a.N&&(a.f+=a.N,a.v+=a.N);var b=a.X;a.T&&(b=Math.round(b*a.T/a.Ba));b-=a.j-a.v;var c=a.j-a.f;c&&(a.h=a.S/(10*c)/100);0>b?(-1E3>b&&(a.f-=b),b=0):a.h<a.u&&(b=0);a.j+=b;F&&0<=F.indexOf("time")&&a.ia("after running %d cycles, resting for %dms\n",a.T,b);return b}
S.prototype.start=function(){if(this.a||this.g)return!1;this.J&&(clearTimeout(this.J),this.J=0);this.a=!0;this.f=this.j=0;T(this,!0);this.m||(this.J=setTimeout(this.sa,0));this.aa&&this.ha(this.ra);return!0};function Vb(a,b){b=void 0===b?1:b;a.a||(b&&!a.g&&(a.g=b),a.g&&(a.g--,Pb(a,V(a,Qb(a,1,!0))),T(a),a.g&&setTimeout(function(){Vb(a,0)},0)))}function U(a){return a.g?(a.g=0,T(a,!0),!0):a.a?(a.a=!1,V(a),T(a,!0),!0):!1}
function T(a,b){b&&(a.a?z(a,"starting ("+Ub(a.u)+" target by "+(a.m?"frame":"timer")+")"):z(a,"stopping"));H(a,Kb,a.a?"Halt":"Run");H(a,Lb,a.g?"Stop":"Step");a.s||H(a,Wb,a.a&&a.h?Ub(a.h):"Stopped");for(var c=0;c<a.$.length;c++)a.$[c](b)}function Pb(a,b){if(1<=b)for(var c=a.b.length;0<c;c--){var d=a.b[c-1];0>d.W||(d.W-=b,0>=d.W&&(d.W=-1,d.za(),0<=d.qa&&L(a,c,d.qa)))}}var Kb="run",Wb="speed",Lb="step",Nb="throttle",Fb=120,Gb=60,Eb=1.11;
function W(a,b,c){x.call(this,a.I,b,a.version);this.b=a;this.name=b;this.c=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];if(!c){b=[];c="reg"+this.name;b.push(c);a.Y[c]=[this,-1];for(var d=0;d<this.c.length;d++)c=this.ca("reg%s-%02d",this.name,d),b.push(c),a.Y[c]=[this,d];sa(a,b)}}r(W,x);p=W.prototype;p.add=function(a,b,c,d){for(var e=0,f=c[0],h=c[1];f<=h;f++)this.c[f]=a.c[f]+b.c[f]+e,e=0,this.c[f]>=d&&(this.c[f]-=d,e=1);e&&(this.b.l=!0);X(this,c)};p.get=function(){return this.c};
function Xb(a,b,c){c=void 0===c?[0,15]:c;for(var d=0;d<a.c.length;d++)a.c[d]=0;d=c[0];for(c=c[1];d<=c;d++)a.c[d]=b&15,b>>>=4;return a}p.move=function(a,b){for(var c=b[0],d=b[1];c<=d;c++)this.c[c]=a.c[c];X(a,b)};p.set=function(a){if(a&&a.length==this.c.length)for(var b=0;b<this.c.length;b++)this.c[b]=a[b]};p.store=function(a){for(var b=0,c=this.c.length;b<c;b++)this.c[b]=a.c[b]};
p.sub=function(a,b,c,d){for(var e=0,f=c[0],h=c[1];f<=h;f++)this.c[f]=a.c[f]-b.c[f]-e,e=0,0>this.c[f]&&(this.c[f]+=d,e=1);e&&(this.b.l=!0);X(this,c)};p.toString=function(a){a=void 0===a?!1:a;var b=this.na+"\x3d";a&&3>b.length&&(b+=" ");for(var c=this.c.length-1;0<=c;c--)b=a?b+I[this.c[c]]:b+(Oa[this.c[c]]+(c%4?"":" "));return b};function X(a,b){a.b.j=a.c[b[0]];b[0]<b[1]&&(a.b.j|=a.c[b[0]+1]<<4)}
function Yb(a,b,c){x.call(this,a,b,Zb,c);this.type=Number.parseInt(D(this,"type","1501").slice(-4),10);this.Y={};this.a=Array(4);for(a=0;4>a;a++)this.a[a]=new W(this,String.fromCharCode(65+a));this.H=this.a[0];this.L=this.a[1];this.aa=this.a[2];this.ba=this.a[3];this.v=Array(8);for(a=0;8>a;a++)this.v[a]=new W(this,"X"+a);this.J=Array(8);for(a=0;8>a;a++)this.J[a]=new W(this,"Y"+a);this.Z=new W(this,"Supp",!0);this.R=new W(this,"Temp",!0);this.s=10;this.l=!1;this.N=this.b=this.j=this.m=0;this.h=[-1,
-1,-1];this.u=0;this.$=ya(this,this.M.input);this.$.K=this.va.bind(this);a=this.$;b=this.wa.bind(this);a.f=this.ea.bind(this);a.L=b;this.g=ya(this,this.M.output);if(this.f=A(this,$b))this.f.b=this;(this.time=A(this,J))&&this.f&&(this.time.V.push(this.Aa.bind(this)),this.time.$.push(this.xa.bind(this)));this.V=this.X=this.K=void 0;this.U=this.S=-1;this.w={};this.T=ac;a=this.Da.bind(this);b=Ea;B[this.I]||(B[this.I]={});B[this.I][b]||(B[this.I][b]=[]);B[this.I][b].push(a)}r(Yb,x);
function bc(a,b){a.w[b]&&(a.w[b]=!1,z(a,"break on "+cc[b]),U(a.time))}function dc(a){a.g&&nb(a.g);if(a.f){var b=a.f;b.a&&nb(b.a)}ec(a,!1)}p=Yb.prototype;p.Aa=function(a){a=void 0===a?0:a;for(this.u=0;this.u<=a;){if(this.U==this.b){this.U=-1;z(this,"break");U(this.time);break}var b=Bb(this.f,this.b),c=this.b;this.b=c+1&this.f.h;if(void 0==b||!fc(this,b,c)){this.b=c;z(this,"unimplemented opcode");U(this.time);break}this.u+=gc}if(0>=a){var d=this;Tb(this.time,function(){var a=d.f;a.a&&P(a.a);z(d,d.toString())})}return this.u};
function fc(a,b,c){if(b&4096)return b&2048?!!(b&1024)==a.l&&(a.b=c&1024|b&1023):(a.push(a.b),a.b=b&2047),a.l=!1,!0;var d;c=b&hc;switch(c){case ic:case jc:case kc:case lc:case mc:case nc:case oc:case pc:case qc:case rc:case sc:case tc:c=uc[c];var e=(b&vc)>>wc;var f=(b&xc)>>yc;var h=(b&zc)>>Ac;var g=(d=b&Bc)?Cc:Dc;switch(f){case 0:case 1:case 2:case 3:var n=a.a[f];break;case 4:n=Xb(a.R,1,c);break;case 5:g=d?Ec:Fc;break;case 6:n=Xb(a.R,a.j&15,c);break;case 7:n=Xb(a.R,a.j&255,c)}switch(h){case 0:var k=
a.a[e];break;case 1:k=4>f?a.a[f]:void 0;break;case 2:k=5>f?a.Z:5==f?a.a[e]:void 0;break;case 3:if(d)a.a[e].move(n,c);else{a=a.H;e=n;b=c[0];for(n=c[1];b<=n;b++)k=a.c[b],a.c[b]=e.c[b],e.c[b]=k;X(e,c)}return!0}if(!k)break;b=b>=pc?16:a.s;switch(g){case Dc:k.add(a.a[e],n,c,b);break;case Cc:k.sub(a.a[e],n,c,b);break;case Fc:b=k;a=a.a[e];e=c[1];for(n=c[0];e>n;e--)b.c[e]=a.c[e-1];b.c[e]=0;X(b,c);break;case Ec:b=k;a=a.a[e];e=c[0];for(n=c[1];e<n;e++)b.c[e]=a.c[e+1];b.c[e]=0;X(b,c)}return!0;case Gc:e=(b&Hc)>>
Ic;c=(b&Jc)>>Kc;n=1<<((b&Lc)>>Mc);if(!c)break;c+=12;switch(b&Nc){case Oc:a.a[e].c[c]|=n;break;case Pc:a.a[e].c[c]&=~n;break;case Qc:a.a[e].c[c]&n&&(a.l=!0);break;case Rc:a.a[e].c[c]^=n}return!0;case Sc:switch(b&Tc){case Uc:a.H.store(a.J[a.m]);break;case Vc:a.m=b>>4&7;break;case Wc:a.b=a.j;break;case Xc:a.l=!1;c=a.h[0];e=0;for(b=a.h.length-1;e<b;)a.h[e]=a.h[++e];a.h[e]=-1;a.b=c;break;case Yc:a.v[a.m].store(a.H);break;case Zc:a.H.store(a.v[a.m]);break;case $c:a.J[a.m].store(a.H);break;case ad:bc(a,
"o");if(a.g){c=0;for(e=11;0<=e;c++,e--)b=void 0,a.L.c[e]&8?b=" ":a.L.c[e]&1?b="-":b=I[a.H.c[e]],vb(a.g,c,0,b,a.L.c[e]&2?rb:0)&&bc(a,"om");ec(a)}a.u+=31*gc;a.N&&(a.j=a.N,a.l=!0,bc(a,"i"));break;case bd:a.s=10;break;case cd:a.s=16;break;case dd:a.m=a.j&7;break;default:return!1}return!0}return!1}
function Ab(a,b,c,d){var e="???",f="";if(b&4096)b&2048?(e="BR",e=b&1024?e+"C":e+"NC",f=c&1024|b&1023):(e="CALL",f=b&2047),f=a.ca("0x%04x",f);else if(0<=b){var h=b&hc;switch(h){case ic:case jc:case kc:case lc:case mc:case nc:case oc:case pc:case qc:case rc:case sc:case tc:f="";e=uc[h];for(h=0;16>h;h++)h%4||(f=" "+f),f=(e?h>=e[0]&&h<=e[1]?"F":"0":"?")+f;h=(b&vc)>>wc;var g=(b&xc)>>yc,n=(b&zc)>>Ac,k=b&Bc;e="LOAD";var q="?",l="?";var m=k?5==g?"\x3e\x3e":"-":5==g?"\x3c\x3c":"+";switch(n){case 0:q=Y[h];
break;case 1:4>g&&(q=Y[g]);break;case 2:6>g&&(q="NUL");break;case 3:k?(e="MOVE",q=Y[h],l=Y[g]):(e="XCHG",h||(q="A"),4>g&&(l=Y[g])),g=-1}switch(g){case 0:case 1:case 2:case 3:l=Y[h]+m+Y[g];break;case 4:case 5:l=Y[h]+m+"1";break;case 6:l=Y[h]+m+"R5L";break;case 7:l=Y[h]+m+"R5"}f=q+","+l+","+f;break;case Gc:switch(b&Nc){case Oc:e="SET";break;case Pc:e="CLR";break;case Qc:e="TST";break;case Rc:e="NOT"}f=a.a[(b&Hc)>>Ic].name;h=(b&Jc)>>Kc;f+="["+(h?h+12:"?")+":"+((b&Lc)>>Mc)+"]";break;case Sc:switch(b&
Tc){case Uc:e="STORE";f="A,Y[RAB]";break;case Vc:e="STORE";f="RAB,"+((b&112)>>4);break;case Wc:e="BR";f="R5";break;case Xc:e="RET";break;case Yc:e="STORE";f="X[RAB],A";break;case Zc:e="STORE";f="A,X[RAB]";break;case $c:e="STORE";f="Y[RAB],A";break;case ad:e="DISP";break;case bd:e="BCDS";break;case cd:e="BCDR";break;case dd:e="STORE",f="RAB,R5L"}}}return a.ca((void 0===d?0:d)?"%03X %04X\n":"0x%04x: 0x%04x  %-8s%s\n",c,b,e,f)}
function ed(a,b){if(b){var c=b.stateChip||b[0];if(c&&c.length){var d=c.shift();if((d|0)!==(Zb|0))a.ia("Saved state version mismatch: %3.2f\n",d);else{try{a.a.forEach(function(a){return a.set(c.shift())}),a.v.forEach(function(a){return a.set(c.shift())}),a.J.forEach(function(a){return a.set(c.shift())}),a.Z.set(c.shift()),a.R.set(c.shift()),a.s=c.shift(),a.l=c.shift(),a.m=c.shift(),a.j=c.shift(),a.b=c.shift(),a.h=c.shift(),a.N=c.shift()}catch(e){z(a,"Chip state error: "+e.message);return}(b=b.stateROM||
b[1])&&a.f&&Cb(a.f,b)}}else z(a,"Invalid saved state")}}
p.Da=function(a,b){var c="",d=a[1],e=Number.parseInt(a[2],16);isNaN(e)&&(e=-1);var f=Number.parseInt(a[3],10)||8;this.T=ac;switch(d[0]){case "b":a=d.substr(1);if("l"==a){for(a in cc)b=cc[a],c+="break on "+b+" (b"+a+"): "+(this.w[a]||!1)+"\n";break}(b=cc[a])?(this.w[a]=!this.w[a],c="break on "+b+" (b"+a+"): "+this.w[a]):a&&(c="unrecognized break option '"+a+"'");break;case "g":this.time.start()?this.U=e:c="already started";break;case "h":U(this.time)||(c="already stopped");break;case "t":"c"==d[1]&&
(this.T=fd);f=Number.parseInt(a[2],10)||1;Mb(this.time,f);b&&(b.ga=a[0]);break;case "r":"c"==d[1]&&(this.T=fd);gd(this,d.substr(1),e);c+=this.toString(d[1]);b&&(b.ga=a[0]);break;case "u":for(e=0<=e?e:0<=this.S?this.S:this.b;f--;){d=this.f&&Bb(this.f,e,!0);if(void 0==d)break;c+=Ab(this,d,e++)}this.S=e;b&&(b.ga=a[0]);break;case "?":c="additional commands:";hd.forEach(function(a){c+="\n"+a});break;default:a[0]&&(c="unrecognized command '"+a[0]+"' (try '?')")}c&&z(this,c.trim());return!0};
p.va=function(a,b){var c=0;0<=a&&0<=b&&(c=b|a+1<<4);this.N=c};p.ea=function(a){void 0==a&&(a=!this.time.a)&&(this.b=0);a?this.time.start():(U(this.time),dc(this))};p.wa=function(){z(this,"reset");this.b=0;dc(this);this.time.a||this.status()};p.ta=function(){var a=null;if(Ja(this)){var b;if(window)try{(b=window.localStorage.getItem(this.I))&&(a=JSON.parse(b))}catch(c){z(this,c.message)}}ed(this,a)};
p.ua=function(){var a=id(this);if(Ja(this)){a=JSON.stringify(a);try{window.localStorage.setItem(this.I,a)}catch(b){z(this,b.message)}}};p.push=function(a){for(var b=this.h.length-1;0<b;)this.h[b]=this.h[--b];this.h[0]=a};
function id(a){var b=[[],[]],c=b[0],d=b[1];c.push(Zb);a.a.forEach(function(a){return c.push(a.get())});a.v.forEach(function(a){return c.push(a.get())});a.J.forEach(function(a){return c.push(a.get())});c.push(a.Z.get());c.push(a.R.get());c.push(a.s);c.push(a.l);c.push(a.m);c.push(a.j);c.push(a.b);c.push(a.h);c.push(a.N);a.f&&Db(a.f,d);return b}function gd(a,b,c){if(b&&!(0>c))switch(b){case "pc":a.b=c;break;default:z(a,"unrecognized register: "+b)}}p.status=function(){z(this,this.toString())};
p.toString=function(a,b){var c=this;a=void 0===a?"":a;b=void 0===b?null:b;var d="";if(this.T){this.f&&(d+=Ab(this,Bb(this.f,this.b,!0),this.b,!0));d+="  ";b=0;for(a=this.a.length;b<a;b++)d+=this.a[b].toString()+" ";d+="\n ";d+=" COND\x3d"+(this.l?1:0);d+=" BASE\x3d"+this.s;d+=" R5\x3d"+this.ca("%02X",this.j);d+=" RAB\x3d"+this.m+" ST\x3d";this.h.forEach(function(a){d+=c.ca("%03X ",0>a?0:a&4095)});return d.trim()}if(b){var e=0;for(a=b.length>>1;e<a;e++)d+=b[e].toString(!0)+"  "+b[e+a].toString(!0)+
"\n";return d}d+=this.toString(a,this.a);0<=a.indexOf("a")&&(d+=this.toString(a,this.v),d+=this.toString(a,this.J));d+="COND\x3d"+(this.l?1:0);d+=" BASE\x3d"+this.s;d+=" R5\x3d"+this.ca("0x%02x",this.j);d+=" RAB\x3d"+this.m+" ";this.h.forEach(function(a,b){d+=c.ca("ST%d\x3d0x%04x ",b,a&65535)});this.f&&(d+="\n"+Ab(this,Bb(this.f,this.b,!0),this.b));this.S=this.b;return d.trim()};
function ec(a,b){b=void 0===b?!0:b;var c,d=b&&(a.type==jd?!!(a.aa.c[14]&8):!!(a.L.c[15]&4));if(a.V!==d){if(c=a.O["2nd"])c.style.opacity=d?"1":"0",void 0===a.V&&a.g&&(c.style.color=a.g.color);a.V=d}d=b&&(a.type==jd?!!(a.L.c[15]&4):!!(a.ba.c[15]&8));if(a.X!==d){if(c=a.O.INV)c.style.opacity=d?"1":"0",void 0===a.X&&a.g&&(c.style.color=a.g.color);a.X=d}c=a.type==jd?a.v[4].c[15]>>2:a.aa.c[15];b=b?c?1==c?kd:ld:md:nd;if(a.K!==b){if(c=a.O.Deg)c.style.opacity=b==md?"1":"0",void 0===a.K&&a.g&&(c.style.color=
a.g.color);if(c=a.O.Rad)c.style.opacity=b==kd?"1":"0",void 0===a.K&&a.g&&(c.style.color=a.g.color);if(c=a.O.Grad)c.style.opacity=b==ld?"1":"0",void 0===a.K&&a.g&&(c.style.color=a.g.color);a.K=b}}p.xa=function(a){for(var b in this.O){var c=this.Y[b];if(c){var d=c[0];c=c[1];H(this,b,0>c?d.toString():I[d.c[c]])}}a&&!this.time.a&&(a=this.f,a.a&&P(a.a),z(this,this.toString()))};
var hc=3840,ic=0,jc=256,kc=512,lc=768,mc=1024,nc=1280,oc=1792,pc=2048,qc=2304,rc=2560,Gc=3072,sc=3328,Sc=3584,tc=3840,vc=192,wc=6,xc=56,yc=3,zc=6,Ac=1,Bc=1,Nc=3,Oc=0,Pc=1,Qc=2,Rc=3,Hc=192,Ic=6,Jc=48,Kc=4,Lc=12,Mc=2,Tc=15,Uc=0,Vc=1,Wc=2,Xc=3,Yc=4,Zc=5,$c=6,ad=7,bd=8,cd=9,dd=10,Z={},uc=(Z[ic]=[12,12],Z[jc]=[0,15],Z[kc]=[2,12],Z[lc]=[0,12],Z[mc]=[2,2],Z[nc]=[0,1],Z[oc]=[0,13],Z[pc]=[14,14],Z[qc]=[13,15],Z[rc]=[14,15],Z[sc]=[13,13],Z[tc]=[15,15],Z),gc=128,Dc=0,Cc=1,Fc=2,Ec=3,jd=1501,nd=0,md=1,kd=2,ld=
3,cc={i:"input",o:"output",om:"output modification"},ac=0,fd=1,Y="A B C D 1 ? R5L R5".split(" "),hd="b[c]\t\tbreak on condition c;bl\t\tlist break conditions;g [addr]\trun (to addr);h\t\thalt;r[a]\t\tdump (all) registers;t [n]\t\tstep (n instructions);u [addr] [n]\tdisassemble (at addr)".split(";"),Zb=1.11;pa="TMS1500";
function od(a,b){x.call(this,a,a,pd);try{this.M=JSON.parse(b);var c=this.M[a];qa(this,c);ra(this,c);sa(this,c.bindings);this.a=!1!==c.autoPower}catch(h){c=h.message;var d=c.match(/position ([0-9]+)/);d&&(c+=" ('"+b.substr(+d[1],40).replace(/\s+/g," ")+"...')");z(this,"machine '"+a+"' initialization error: "+c)}var e=this,f=null;window.addEventListener("load",function(){for(var a,b,c,d,q=0;q<qd.length;q++)for(a in e.M)try{var l=e.M[a],m="";b=l["class"];if(b==qd[q]){switch(b){case rd:d=c=new Yb(e.I,
a,l);break;case sd:c=new Pa(e.I,a,l);break;case td:c=new eb(e.I,a,l);break;case $b:c=new yb(e.I,a,l);c.M.revision&&(m="revision "+c.M.revision);break;case J:c=new S(e.I,a,l);break;case ud:e.ia("PCjs %s v%3.2f\n",l.name,pd);z(e,vd);z(e,wd);continue;default:z(e,"unrecognized device class: "+b);continue}z(e,b+" device initialized"+(m?" ("+m+")":""))}}catch(R){z(e,"error initializing "+b+" device '"+a+"':\n"+R.message);m=void 0;var v=a,t=y[e.I];if(t)for(m in t)if(t[m].na==v){t.splice(m,1);break}}if(f=
d)f.ta&&f.ta(),f.ea&&e.a&&f.ea(!0)});window.addEventListener((La("iOS")?"pagehide":La("Opera")?"unload":void 0)||"beforeunload",function(){f&&(f.ua&&f.ua(),f.ea&&f.ea(!1))})}r(od,x);var rd="Chip",sd="Input",td="LED",ud="Machine",$b="ROM",J="Time",qd=[ud,J,td,sd,$b,rd],vd="Copyright \u00a9 2012-2017 Jeff Parsons \x3cJeff@pcjs.org\x3e",wd="License: GPL version 3 or later \x3chttp://gnu.org/licenses/gpl.html\x3e",pd=1.11;window[pa]=od;})()
//# sourceMappingURL=ti57.js.map
