(function(){/*
 http://pcjs.org/modules/devices/device.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/input.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/led.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/rom.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/time.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/ledctrl.js (C) Jeff Parsons 2012-2017
 http://pcjs.org/modules/devices/machine.js (C) Jeff Parsons 2012-2017
*/
var t,ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},v="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ca(){ca=function(){};v.Symbol||(v.Symbol=da)}var ea=0;function da(a){return"jscomp_symbol_"+(a||"")+ea++}
function fa(){ca();var a=v.Symbol.iterator;a||(a=v.Symbol.iterator=v.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&ba(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ga(this)}});fa=function(){}}function ga(a){var b=0;return ha(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})}function ha(a){fa();a={next:a};a[v.Symbol.iterator]=function(){return this};return a}function ia(a){fa();var b=a[Symbol.iterator];return b?b.call(a):ga(a)}
function ja(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}function y(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a;for(var d in b)if(Object.defineProperties){var e=Object.getOwnPropertyDescriptor(b,d);e&&Object.defineProperty(a,d,e)}else a[d]=b[d]}
function ka(a,b){if(b){var c=v;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ba(c,a,{configurable:!0,writable:!0,value:b})}}ka("Math.trunc",function(a){return a?a:function(a){a=Number(a);if(isNaN(a)||Infinity===a||-Infinity===a||!a)return a;var b=Math.floor(Math.abs(a));return 0>a?-b:b}});
ka("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}});ka("Math.log2",function(a){return a?a:function(a){return Math.log(a)/Math.LN2}});
ka("String.prototype.startsWith",function(a){return a?a:function(a,c){var b;if(null==this)throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");if(a instanceof RegExp)throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");b=this+"";a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var l=0;l<f&&c<e;)if(b[c++]!=a[l++])return!1;return l>=f}});var la="Machine";
function z(a,b,c,d){this.c=d||{};this.s=a;this.ma=b;this.version=c||0;this.j={};A[this.s]||(A[this.s]=[]);A[this.s].push(this);ma(this,this.c);na(this,this.c);oa(this,this.c.bindings)}var pa;
z.prototype.Z=function(a,b){var c=this;switch(a){case qa:b.onclick=function(){var a=ra(c);a&&(a.value="")};break;case sa:b.value="",b.addEventListener("keypress",function(a){a=a||window.event;var d=a.which||a.keyCode;if(d){var f=b.value;b.setSelectionRange(f.length,f.length);a.stopPropagation();if(13==d&&(d=ta,d=B[c.s]&&B[c.s][d]))for(a.preventDefault(),f=b.value+="\n",b.blur(),b.focus(),a=f.slice(f.lastIndexOf("\n",f.length-2)+1,-1),f=0;f<d.length&&!d[f](a);f++);}})}};
function oa(a,b){var c=Array.isArray(b),d;for(d in b){var e=b[d];c&&(d=e);var f=document.getElementById(e);f?(a.j[d]=f,a.Z(d,f)):c||C(a,"unable to find device ID: "+e)}}function ua(a,b,c,d){c&&(a.options.length=0);if(b)for(var e in b)c=document.createElement("option"),c.text=e,c.value="string"==typeof b[e]?b[e]:e,a.appendChild(c),c.value==d&&(a.selectedIndex=a.options.length-1)}function va(a,b){var c=ta;B[a.s]||(B[a.s]={});B[a.s][c]||(B[a.s][c]=[]);B[a.s][c].push(b)}z.prototype.assert=function(){};
function na(a,b){if(b.overrides){var c=wa(),d;for(d in c)if(0<=b.overrides.indexOf(d)){var e,f=c[d];f.match(/^[+-]?[0-9.]+$/)?e=Number.parseInt(f,10):"true"==f?e=!0:"false"==f?e=!1:(e=f,f='"'+f+'"');b[d]=e;C(a,"overriding "+a.ma+" property '"+d+"' with "+f)}}}
function ma(a,b){if(a.version){var c="",d,e,f=A[a.s];if(f)for(var l in f)if(f[l].ma==a.s){e=f[l];break}e.version!=a.version?(c="Machine",d=e.version):b.version&&b.version!=a.version&&(c="Config",d=b.version);c&&(b="Error: "+a.ca("%s Device version (%3.2f) does not match %s version (%3.2f)",b.ka,a.version,c,d)+"\n\nClearing your browser's cache may resolve the issue.",(c=xa)&&0>ya.indexOf(c)&&(alert(b),ya.push(c)),C(a,b))}}
function ra(a){var b=sa,c=a.j[b];if(void 0===c){var d=A[a.s],e;for(e in d)if(c=d[e].j[b])break;c||(c=null);a.j[b]=c}return c}function D(a,b){var c;if(a=A[a.s])for(var d in a)if(a[d].c["class"]==b){c=a[d];break}return c}function za(a){var b=Aa;return a.c.bindings&&a.c.bindings[b]}function Ba(a){var b;if(a=a.j[Ca])b=a.textContent;return b}function Da(a,b,c,d){a.assert(c<=d);b=+b||0;b<c&&(b=c);b>d&&(b=d);return b}function Ea(a,b){return void 0!==a?a:b}
function Fa(a){if(void 0===Ga){var b=!1;if(window)try{window.localStorage.setItem(E,E),b=window.localStorage.getItem(E)==E,window.localStorage.removeItem(E)}catch(c){C(a,c.message),b=!1}Ga=b}return!!Ga}function Ha(a){if(window){var b=window.navigator.userAgent;return"iOS"==a&&!!b.match(/(iPod|iPhone|iPad)/)&&!!b.match(/AppleWebKit/)||"MSIE"==a&&!!b.match(/(MSIE|Trident)/)||0<=b.indexOf(a)}return!1}
function Ia(a,b){if(F&&0<=F.indexOf(Ja))G+=b;else{if(a=ra(a))a.value+=b,8192<a.value.length&&(a.value=a.value.substr(a.value.length-4096)),a.scrollTop=a.scrollHeight;a||(a=b.lastIndexOf("\n"),0<=a&&(console.log(G+b.substr(0,a)),G="",b=b.substr(a+1)),G+=b)}}function C(a,b){Ia(a,b+"\n")}z.prototype.$=function(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];Ia(this,this.ca.apply(this,[].concat([a],c instanceof Array?c:ja(ia(c)))))};function H(a,b,c){if(a=a.j[b])a.textContent=c}
function Ka(a,b){b=void 0===b?"":b;var c=F,d=!b&&F&&0<=F.indexOf(Ja);F=b;d&&(b=G,G="",Ia(a,b));return c}
z.prototype.ca=function(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];var d="",e=a.split(/%([-+ 0#]?)([0-9]*)(\.?)([0-9]*)([hlL]?)([A-Za-z%])/),f=0,l;for(l=0;l<e.length-7;l+=7){var d=d+e[l],k=c[f++],g=e[l+1],m=+e[l+2]||0,n=+e[l+4]||0,h=e[l+6],p=null;switch(h){case "d":k=Math.trunc(k);case "f":h=Math.trunc(k)+"";n&&(m-=n+1);h.length<m&&("0"==g?(0>k&&m--,h=("0000000000"+Math.abs(k)).slice(-m),0>k&&(h="-"+h)):h=("          "+h).slice(-m));n&&(k=Math.trunc((k-Math.trunc(k))*Math.pow(10,
n)),h+="."+("0000000000"+Math.abs(k)).slice(-n));d+=h;break;case "s":for(;k.length<m;)k="-"==g?k+" ":" "+k;d+=k;break;case "X":p=La;case "x":p||(p=Na);h="";do h=p[k&15]+h,k>>>=4;while(0<--m||k);d+=h;break;default:d+="(unrecognized printf conversion %"+h+")"}}return d+=e[l]};
function wa(){var a,b=pa;if(!b){b={};if(window){a||(a=window.location.search.substr(1));for(var c,d=/\+/g,e=/([^&=]+)=?([^&]*)/g;c=e.exec(a);)b[decodeURIComponent(c[1].replace(d," ")).trim()]=decodeURIComponent(c[2].replace(d," ")).trim()}pa=b}return b}var qa="clear",sa="print",Ja="buffer",ta="command",ya=[],xa="version",Ga=void 0,E="PCjs.localStorage",B={},A={},F="",G="",Na="0123456789abcdef",La="0123456789ABCDEF";
function I(a,b,c){z.call(this,a,b,Oa,c);this.a=D(this,J);this.K=this.J=this.g=this.I=null;if(a=this.j[Pa]){b=this.c.location;this.ha=b[0];this.ia=b[1];this.h=b[2];this.m=b[3];this.o=b[4]||1;this.w=b[5]||1;this.ea=b[6]||a.naturalWidth||this.h;this.fa=b[7]||a.naturalHeight||this.m;this.V=b[8]||0;this.W=b[9]||0;this.da=b[10]||0;this.ba=b[11]||0;(this.b=this.c.map)?(this.v=this.b.length,this.i=this.b[0].length):(this.i=this.o,this.v=this.w,this.o=this.w=0);this.ga=!!this.c.drag;this.X=!!this.c.hexagonal;
this.N=this.h/(this.i+this.i*this.o)|0;this.O=this.m/(this.v+this.v*this.w)|0;this.Y=this.N*this.o|0;this.R=this.O*this.w|0;this.l=this.H=-1;Qa(this,a);Ra(this,a);if(this.a){var d=this;this.T=Sa(this.a,"timerInputRelease",function(){0>d.l&&0>d.H&&K(d,-1,-1)});this.b&&(this.U=Sa(this.a,"timerKeyRelease",function(){d.assert(d.f);1==d.f?(d.f++,K(d,-1,-1),L(d.a,d.U,Ta)):(d.f=0,d.u.length&&Ua(d,d.u.shift()))}),this.f=0,this.u=[],Va(this))}this.M=this.S=-1}}y(I,z);
I.prototype.Z=function(a,b){var c=this;switch(a){case Wa:b.onclick=function(){c.g&&c.g()};break;case Xa:b.onclick=function(){c.J&&c.J()}}z.prototype.Z.call(this,a,b)};function Ya(a,b,c){a.g=b;a.J=c}function Za(a,b){a.K=b}function $a(a,b){a.I=b}
function Va(a){var b=document;b.addEventListener("keydown",function(b){b=b||window.event;if(document.activeElement==a.j[Wa]){var c=ab[b.which||b.keyCode];c&&Ua(a,c)&&b.preventDefault()}});b.addEventListener("keypress",function(b){b=b||window.event;var c=String.fromCharCode(b.which||b.charCode);c&&Ua(a,c)&&b.preventDefault()})}
function Ua(a,b){for(var c=0;c<a.b.length;c++)for(var d=a.b[c],e=0;e<d.length;e++)if(0<=d[e].split("|").indexOf(b))return a.f?16>a.u.length&&a.u.push(b):(a.f=1,K(a,e,c),L(a.a,a.U,Ta)),!0;a.$("unrecognized key '%s' (0x%02x)\n",b,b.charCodeAt(0));return!1}
function Qa(a,b){b.addEventListener("mousedown",function(c){var d=a.j[Wa];if(d){var e=window.scrollX,f=window.scrollY;d.focus();window.scrollTo(e,f)}c.button||M(a,b,bb,c)});b.addEventListener("mousemove",function(c){M(a,b,cb,c)});b.addEventListener("mouseup",function(c){c.button||M(a,b,N,c)});b.addEventListener("mouseout",function(c){0>a.l?M(a,b,cb,c):M(a,b,N,c)})}
function Ra(a,b){b.addEventListener("touchstart",function(c){M(a,b,bb,c)});b.addEventListener("touchmove",function(c){M(a,b,cb,c)});b.addEventListener("touchend",function(c){M(a,b,N,c)})}
function M(a,b,c,d){var e=-1,f=-1,l,k,g,m,n,h;if(c<N){d=d||window.event;d.targetTouches&&d.targetTouches.length?(l=d.targetTouches[0].pageX,k=d.targetTouches[0].pageY):(l=d.pageX,k=d.pageY);n=m=0;h=b;do isNaN(h.offsetLeft)||(m+=h.offsetLeft,n+=h.offsetTop);while(h=h.offsetParent);l=a.ea/b.offsetWidth*(l-m)|0;k=a.fa/b.offsetHeight*(k-n)|0;b=l-a.ha;g=k-a.ia;n=m=!1;h=l>=a.V&&l<a.V+a.da&&k>=a.W&&k<a.W+a.ba;if(0<=b&&b<a.h&&0<=g+a.R||h)if(d.preventDefault(),0<=b&&b<a.h&&0<=g&&g<a.m){n=!0;d=a.h/a.i|0;var p=
a.m/a.v|0,r=b/d|0,q=g/p|0;!a.X||q&1||(b-=d>>1,r=b/d|0,r==a.i-1&&(b=-1));p=q*p+(a.R>>1);b-=r*d+(a.Y>>1);g-=p;0<=b&&b<a.N&&0<=g&&g<a.O&&(e=r,f=q,m=!0)}}c==bb?(a.l=l,a.H=k,n?(K(a,e,f),m&&L(a.a,a.T,Ta,!0)):h&&a.g&&a.g()):c==cb?0<=a.l&&0<=a.H&&a.ga?K(a,e,f):a.K&&a.K(e,f):c==N?(c=a.a,e=a.T,c.a&&0<e&&e<=c.f.length&&0<=c.f[e-1].L||K(a,-1,-1),a.l=a.H=-1):C(a,"unrecognized action: "+c)}function K(a,b,c){if(b!=a.M||c!=a.S)a.M=b,a.S=c,a.I&&a.I(b,c)}
var bb=1,cb=2,N=3,Wa="power",Xa="reset",Pa="surface",ab={8:"\b"},Ta=50,Oa=1.1;
function db(a,b,c){z.call(this,a,b,eb,c);a=this.j[Aa];if(!a)throw Error("LED binding for '"+Aa+"' missing: '"+this.c.j[Aa]+"'");b=document.createElement("canvas");if(!b||!b.getContext)throw a.innerHTML="LED device requires HTML5 canvas support",Error("LED device requires HTML5 canvas support");this.la=a;this.type=Da(this,this.c.type||fb,fb,gb);this.i=hb[this.type][0];this.m=hb[this.type][1];this.V=this.c.width||this.i;this.U=this.c.height||this.m;this.cols=this.c.cols||1;this.rows=this.c.rows||1;
this.J=this.V*this.cols;this.I=this.U*this.rows;this.g=P("black",0);this.f=ib(this.c.color)||this.g;this.X=P(this.f,1,.25);this.W=P(this.f,1,2);this.h=ib(this.c.backgroundColor);this.Y=this.c.fixed||!1;this.Y||(b.style.width="100%",b.style.height="auto");this.u=this.c.persistent;void 0==this.u&&(this.u=this.type<gb);this.O=this.c.hexagonal||!1;this.K=this.c.highlight;void 0===this.K&&(this.K=!0);b.setAttribute("width",this.J.toString());b.setAttribute("height",this.I.toString());b.style.backgroundColor=
this.g;a.appendChild(b);this.S=b.getContext("2d");if(this.w=document.createElement("canvas"))this.w.width=this.N=this.i*this.cols,this.w.height=this.M=this.m*this.rows,this.b=this.w.getContext("2d");this.T=(this.rows+1)*this.cols*4;this.a=Array(this.T);this.o=null;this.l=this.v=!1;this.H=-1;var d=this;(this.R=D(this,J))&&jb(this.R,function(){Q(d)})}y(db,z);function R(a,b){kb(a,a.a);a.l=a.v=!0;b&&Q(a,!0)}function lb(a){a.h?(a.b.fillStyle=a.h,a.b.fillRect(0,0,a.N,a.M)):a.b.clearRect(0,0,a.N,a.M)}
function Q(a,b){b=void 0===b?!1:b;if(a.l||b){if(a.type<gb){a.u&&!b||lb(a);for(var c=0,d=0;d<a.rows;d++)for(var e=0;e<a.cols;e++){var f=a.a[c],l=a.a[c+1]||a.g,k=a.K&&c==a.H;if(a.a[c+3]&S||k||b){a:{var g=a,m=l,n=e,l=d,h=k,n=void 0===n?0:n,l=void 0===l?0:l,h=void 0===h?!1:h,p=0;if(g.O&&!(l&1)&&(p=g.i>>1,n==g.cols-1))break a;if(g.u){var r=n*g.i+p,q=l*g.m;g.h?(g.b.fillStyle=g.h,g.b.fillRect(r,q,g.i,g.m)):g.b.clearRect(r,q,g.i,g.m)}m&&m!=g.f?(r=h?P(m,1,2):m,m=P(m,1,.25)):(r=h?g.W:g.f,m=g.X);h=!1;m=f?r:
m;r==g.g&&(m=g.h,h=!0);g.b.fillStyle=m;f=n*g.i+p;l*=g.m;n=mb[g.type];3==n.length?(g.b.beginPath(),g.b.arc(n[0]+f,n[1]+l,n[2],0,2*Math.PI),h?(g.b.globalCompositeOperation="destination-out",g.b.fill(),g.b.globalCompositeOperation="source-over"):g.b.fill()):g.b.fillRect(n[0]+f,n[1]+l,n[2],n[3])}a.a[c+3]&=~S;k&&(a.a[c+3]|=S)}c+=4}}else{b="";for(c=0;c<a.a.length;c+=4)b+=a.a[c]||" ",a.a[c+3]&nb&&(b+=".");lb(a);for(e=d=c=0;c<b.length;c++){l=b[c];"."==l&&d&&d--;k=a;g=d;f=e;g=void 0===g?0:g;f=void 0===f?0:
f;if(l=ob[l])for(n=0;n<l.length;n++)if(p=k,h=pb[l[n]]){m=(void 0===g?0:g)*p.i;r=(void 0===f?0:f)*p.m;p.b.fillStyle=p.f;p.b.beginPath();if(3==h.length)p.b.arc(h[0]+m,h[1]+r,h[2],0,2*Math.PI);else for(q=0;q<h.length;q+=2)q?p.b.lineTo(h[q]+m,h[q+1]+r):p.b.moveTo(h[q]+m,h[q+1]+r);p.b.closePath();p.b.fill()}if(++d==a.cols&&(d=0,++e==a.rows))break}}a.S.globalCompositeOperation=a.h&&!a.u?"source-over":"copy";a.S.drawImage(a.w,0,0,a.N,a.M,0,0,a.J,a.I);a.l=!1;a.H=-1}else a.u||a.v||R(a,!0);a.v=!1}
function qb(a,b,c){b=4*(c*a.cols+b);return b<=a.a.length-4?a.a[b+2]:0}function T(a,b,c){var d,e=4*(c*a.cols+b);a.assert(0<=c&&c<a.rows&&0<=b&&b<a.cols);0<=e&&e<=a.a.length-4&&(d=a.a[e]);return d}function ib(a){return(a=a||void 0)&&rb[a]||a}function P(a,b,c){b=void 0===b?1:b;c=void 0===c?1:c;if(a){var d=[];a=rb[a]||a;if(sb(a,d)){a="rgba(";var e;for(e=0;3>e;e++){var f=Math.round(d[e]*c),f=0>f?0:255<f?255:f;a+=f+","}a+=(e<d.length?d[e]:b)+")"}}return a}
function kb(a,b){for(var c=0;c<b.length;c+=4)b[c]=a.type<gb?U:" ",b[c+1]=a.f==a.g?null:a.f,b[c+2]=0,b[c+3]=S}function sb(a,b){var c=16,d=a.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);d||(c=10,d=a.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,?\s*(\d+|)\)$/i));if(d){for(a=1;a<d.length;a++)b[a-1]=Number.parseInt(d[a],c);b.length=a-1;return!0}return!1}
function tb(a,b,c,d){var e=null;0<=c&&c<a.rows&&0<=b&&b<a.cols&&(e=!1,d=d||a.f,d==a.g&&(d=null),b=4*(c*a.cols+b),a.a[b+1]!==d&&((a.a[b+1]=d)||(a.a[b]=U),a.a[b+3]|=S,a.l=e=!0),a.H=b,a.v=!0);return e}function ub(a,b,c,d){if(0<=c&&c<a.rows&&0<=b&&b<a.cols){b=4*(c*a.cols+b);c=0;if(a.a[b+1])for(var e=0;e<d.length;e++)c=c<<4|d[e]&15;a.a[b+2]!==c&&(a.a[b+2]=c,a.a[b+3]|=S,a.l=!0);a.H=b;a.v=!0}}
function V(a,b,c,d){var e;e=void 0===e?0:e;var f=null;a.assert(!(e&~vb));if(0<=c&&c<a.rows&&0<=b&&b<a.cols){f=!1;b=4*(c*a.cols+b);if(a.a[b]!==d||(a.a[b+3]&vb)!==e)a.a[b]=d,a.a[b+3]=a.a[b+3]&~vb|e|S,a.l=f=!0;a.H=b;a.v=!0}return f}
var fb=1,gb=3,Aa="container",rb={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",
darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",
goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4","indianred ":"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",
lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",
olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",
slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"},U=0,vb=129,nb=1,S=128,wb={},mb=(wb[fb]=[16,16,14],wb[2]=[2,2,28,28],wb),hb=[[],[32,32],[32,32],[96,128]],pb={A:[30,8,79,8,67,19,37,19],B:[83,10,77,52,67,46,70,22],C:[77,59,71,100,61,89,64,64],D:[28,91,58,91,69,
104,15,104],E:[18,59,28,64,25,88,12,100],F:[24,10,34,21,31,47,18,52],G:[24,56,34,50,60,50,71,56,61,61,33,61],P:[80,102,8]},ob={" ":[],0:"ABCDEF".split(""),1:["B","C"],2:["A","B","D","E","G"],3:["A","B","C","D","G"],4:["B","C","F","G"],5:["A","C","D","F","G"],6:"ACDEFG".split(""),7:["A","B","C"],8:"ABCDEFG".split(""),9:"ABCDFG".split(""),"-":["G"],E:["A","D","E","F","G"],".":["P"]},eb=1.1;
function xb(a,b,c){z.call(this,a,b,yb,c);this.a=c.values;this.f=this.a.length-1;this.assert(!(this.f+1&this.f));if(this.j[zb]){var d=this,e=Math.log2(this.a.length)/2;this.cols=Math.pow(2,Math.ceil(e));this.rows=Math.pow(2,Math.floor(e));this.b=new db(a,b+"LEDs",{ka:"LED",j:{la:c.j[zb]},type:fb,cols:this.cols,rows:this.rows,color:c.colorROM||"green",backgroundColor:c.backgroundColorROM||"black",Ca:!0}),R(this.b,!0);this.g=new I(a,b+"Input",{ka:"Input",location:[0,0,this.b.J,this.b.I,this.cols,this.rows],
j:{surface:c.j[zb]}});this.i=Ba(this);Za(this.g,function(a,b){if(d.h){var c=d.i;0<=a&&0<=b&&(a=b*d.cols+a,this.assert(0<=a&&a<d.a.length),c=d.h.za(d.a[a],a));H(d,Ca,c)}})}}y(xb,z);var zb="array",Ca="cellDesc",yb=1.1;
function W(a,b,c){z.call(this,a,b,Ab,c);this.Y=this.c.cyclesMinimum||1E5;this.ga=this.c.cyclesMaximum||3E6;this.S=Da(this,this.c.cyclesPerSecond||65E4,this.Y,this.ga);this.H=Da(this,this.c.yieldsPerSecond||Bb,30,120);this.ha=Da(this,this.c.yieldsPerUpdate||Cb,1,this.H);this.I=this.c.requestAnimationFrame;void 0===this.I&&(this.I=!0);this.ba=this.fa=this.N=1;this.W=this.S/1E4/100;this.i=this.v=this.W*this.N;this.w=0;this.R=Math.round(1E3/this.H);this.T=[];this.O=[];this.f=[];this.U=[];this.a=this.V=
this.u=!1;this.h=this.g=0;this.pa=this.xa.bind(this);this.ia=this.ea.bind(this);this.da=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.setTimeout).bind(window);var d=this;Sa(this,"timerYield",function(){d.V=!0;var a=d.w,b=Db(d);b>=d.H?d.w++:d.w+=Math.ceil(d.H/b);d.w>=d.ha&&a<d.ha&&X(d);d.w>=d.H&&(d.w=0)},this.R);this.K=this.J=this.o=0;Eb(this)||Fb(this,this.ba)}y(W,z);function jb(a,b){a.T.push(b)}
W.prototype.Z=function(a,b){var c=this;switch(a){case Gb:b.onclick=function(){c.a?Hb(c):c.start()};break;case Ib:b.onclick=function(){c.a?C(c,"already running"):c.g?Hb(c):Jb(c,void 0)};break;case Kb:b.addEventListener("mousedown",function(){c.u=!0}),b.addEventListener("mouseup",function(){Eb(c);c.u=!1}),b.addEventListener("mousemove",function(){c.u&&Eb(c)}),b.addEventListener("change",function(){c.u=!0;Eb(c);c.u=!1})}z.prototype.Z.call(this,a,b)};
function Sa(a,b,c,d){d=void 0===d?-1:d;var e=a.f.length+1;a.f.push({id:b,ua:c,ja:d,L:-1});0<=d&&L(a,e,d);return e}W.prototype.ea=function(){for(var a=0;a<this.T.length;a++)this.T[a]();this.a&&this.I&&this.da(this.ia)};function Lb(a){var b=a.i/a.W;if(!b||b>a.N)b=a.N;a.wa=a.S/a.H*b;a.fa=b}function Mb(a,b,c){a.J=a.o=b;if(!a.O.length)return a.o=0,a.J;for(var d=0;0<a.o;)d<a.O.length?b=a.O[d++](c?0:b)||1:d=b=0,a.o-=b;return a.J-a.o}
function Nb(a,b){b=void 0===b?a.J-a.o:b;a.J=a.o=0;a.M+=b;a.K+=b;a.a||(a.K=0);return b}function Db(a,b){return Math.ceil(a.S*a.fa/1E3*(void 0===b?1E3:b))}function Ob(a){1<=a?a=a.toFixed(2)+"Mhz":(a=Math.round(1E6*a),a=999>=a?a+"Hz":Math.ceil(a/1E3)+"Khz");return a}
W.prototype.xa=function(){this.h=0;if(this.a){Lb(this);this.X=this.M=0;this.m=Date.now();this.b||(this.b=this.m);var a;this.l&&(a=this.m-this.l,a>this.R&&(this.b+=a,this.assert(this.b<=this.m),this.b>this.m&&(this.b=this.m)));try{this.V=!1;do{for(var b=Db(this,this.R),c=this.f.length;0<c;c--){var d=this.f[c-1];this.assert(!isNaN(d.L));!(0>d.L)&&b>d.L&&(b=d.L)}Pb(this,Nb(this,Mb(this,b)))}while(this.a&&!this.V)}catch(e){C(this,e.message);Hb(this);return}if(this.a){this.assert(!this.h);a=setTimeout;
b=this.pa;this.l=Date.now();this.X&&(this.b+=this.X,this.m+=this.X);c=this.R;this.M&&(c=Math.round(c*this.M/this.wa));c-=this.l-this.m;if(d=this.l-this.b)this.i=this.K/(10*d)/100;0>c?(-1E3>c&&(this.b-=c),c=0):this.i<this.v&&(c=0);this.l+=c;F&&0<=F.indexOf("time")&&this.$("after running %d cycles, resting for %dms\n",this.M,c);this.h=a(b,c);this.I||this.ea()}}};function Eb(a){var b=a.j[Kb];return b?(b=Math.floor((b.value-b.min)/(b.max-b.min)*(a.ga-a.Y)+a.Y)/a.S,a.assert(1<=b),Fb(a,b),!0):!1}
function Fb(a,b){void 0!==b&&(!a.u&&0<a.i&&a.i<.9*a.v&&(b=a.ba),a.N=b,b=a.W*a.N,a.v!=b&&(a.v=b,H(a,Qb,Ob(a.v))),a.i=a.v);a.K=0;a.b=a.l=0;Lb(a);for(b=a.f.length;0<b;b--){var c=a.f[b-1];0<=c.ja&&L(a,b,c.ja,!0)}}function L(a,b,c,d){0<b&&b<=a.f.length&&(b=a.f[b-1],d||0>b.L)&&(c=Db(a,c),a.a&&(c+=Nb(a)),b.L=c)}
W.prototype.start=function(){if(this.a||this.g)return!1;this.h&&(clearTimeout(this.h),this.h=0);this.a=!0;this.b=this.l=0;X(this,!0);this.assert(!this.h);this.h=setTimeout(this.pa,0);this.I&&this.da(this.ia);return!0};function Jb(a,b){b=void 0===b?1:b;a.a||(b&&!a.g&&(a.g=b),a.g&&(a.g--,Pb(a,Nb(a,Mb(a,1,!0))),X(a),a.g&&setTimeout(function(){Jb(a,0)},0)))}function Hb(a){a.g?(a.g=0,X(a,!0)):a.a&&(a.a=!1,Nb(a),X(a,!0))}
function X(a,b){b&&(a.a?C(a,"starting (target speed: "+Ob(a.v)+")"):C(a,"stopping"));H(a,Gb,a.a?"Halt":"Run");H(a,Ib,a.g?"Stop":"Step");a.u||H(a,Qb,a.a&&a.i?Ob(a.i):"Stopped");for(var c=0;c<a.U.length;c++)a.U[c](b)}function Pb(a,b){for(var c=a.f.length;0<c;c--){var d=a.f[c-1];a.assert(!isNaN(d.L));0>d.L||(d.L-=b,0>=d.L&&(d.L=-1,d.ua(),0<=d.ja&&L(a,c,d.ja)))}}var Gb="run",Qb="speed",Ib="step",Kb="throttle",Bb=120,Cb=60,Ab=1.1;
function Rb(a,b,c){z.call(this,a,b,Sb,c);this.I=Ea(this.c.toggle,!0);this.i=Ea(this.c.wrap,!1);this.m=Ea(this.c.rule,"B3/S23");this.l=Ea(this.c.pattern,"");this.H=Array(Tb(this).length);if(c=D(this,Ub)){this.a=c;Vb(this)||R(c,!0);var d=this;this.v=new I(a,b+"Input",{ka:"Input",location:[0,0,c.J,c.I,c.cols,c.rows],Aa:!0,Ba:c.O,j:{surface:za(c)}});$a(this.v,function(a,b){var c=d.a;if(0<=a&&0<=b){d.h?tb(c,a,b,d.h)?V(c,a,b,1):d.I?V(c,a,b,1-T(c,a,b)):tb(c,a,b):V(c,a,b,1-T(c,a,b));var e=!!T(c,a,b);ub(c,
a,b,Tb(d,e));Q(c)}});this.f=[];this.w=c.f;Wb(this,this.w);Xb(this);Yb(this,this.c[Zb]);this.u=D(this,$b);Ya(this.u,this.aa.bind(this),this.oa.bind(this));if(this.g=D(this,J))this.g.O.push(this.va.bind(this)),this.g.U.push(this.ta.bind(this));this.o="";va(this,this.ya.bind(this))}}y(Rb,z);t=Rb.prototype;
t.Z=function(a,b){var c=this;switch(a){case ac:case bc:b.onchange=function(){cc(c,a)};cc(this);break;case Zb:b.onchange=function(){Yb(c)};break;case Y:ua(b,dc(this.c[Y]),!1,this.c.pattern);b.onchange=function(){var a=c.j[Y];a&&a.options.length&&((a=a.options[a.selectedIndex].value)?Vb(c,a):c.oa())};break;case ec:b.onclick=function(){var a=fc(c);C(c,a);var b=window.location.href,b=0<=b.indexOf("pattern\x3d")?b.replace(/(pattern=)[^&]*/,"$1"+a.replace(/\$/g,"$$$$")):b+((0>b.indexOf("?")?"?":"\x26")+
"pattern\x3d"+a);window.location=b};break;default:if(a.startsWith(gc))b.onclick=function(){Xb(c,a)};else{var d=this.c[Y];d&&d[a]&&(b.onclick=function(){Vb(c,a)})}}z.prototype.Z.call(this,a,b)};function dc(a){var b={},c;for(c in a){for(var d=c,e=a[c],f=0;f<e.length;f++)if(0==e[f].indexOf("#N")){d=e[f].substr(2).trim();break}b[d]=c}return b}
t.va=function(a){a=void 0===a?0:a;var b=0;if(0<=a){var c;do{switch(this.m){case "C8":c=0;for(var d=this.a,e=d.cols,f=d.rows,l=this.H,k=0;k<f;k++)for(var g=0;g<e;g++){var m=l,n=!1,h=4*(k*d.cols+g);if(h<=d.a.length-4&&d.a[h+1])for(var n=!0,h=d.a[h+2],p=m.length-1;0<=p;p--)m[p]=h&15,h>>>=4;if(n){c++;if(l[0])l[0]--;else{n=(m=T(d,g,k))||0;switch(m){case 1:if(n=U,l[0]=l[2],l[0]){l[0]--;break}case U:if(l[3]&&(n=this.f.indexOf(d.a[4*(k*d.cols+g)+1]||d.g),0<=n)){for(n+=l[3];n>=this.f.length;)n-=this.f.length;
tb(d,g,k,this.f[n])}n=1;l[0]=l[1];l[0]&&l[0]--}n!==m&&V(d,g,k,n)}ub(d,g,k,l)}}break;default:c=0;d=this.a.a;e=this.a;e.o||(e.o=Array(e.T),kb(e,e.o));for(var e=e.o,f=this.a.cols,l=this.a.rows,k=4*f,g=l*k,m=0,n=m-k,h=n-4,p=n+4,r=m-4,q=m+4,u=m+k,w=u-4,x=u+4,O=0;O<l;O++){O?O==l-1&&(this.i?(u-=g,w-=g,x-=g):u=w=x=g):this.i?(n+=g,h+=g,p+=g):n=h=p=g;for(var Z=0;Z<f;Z++){Z?1==Z?this.i?(r-=k,h-=k,w-=k):(r=m-4,h=n-4,w=u-4):Z==f-1&&(this.i?(q-=k,p-=k,x-=k):q=p=x=g):this.i?(r+=k,h+=k,w+=k):r=h=w=g;var aa=d[m],
Ma=d[h]+d[n]+d[p]+d[q]+d[x]+d[u]+d[w]+d[r];this.assert(!isNaN(Ma));3==Ma?aa=1:2!=Ma&&(aa=U);e[m]=aa;e[m+1]=d[m+1];e[m+2]=d[m+2];e[m+3]=d[m+3]|(d[m]!==aa?S:0);m+=4;h+=4;n+=4;p+=4;q+=4;x+=4;u+=4;w+=4;r+=4;1==aa&&c++}this.i?(O||(n-=g,h-=g,p-=g),q+=k,p+=k,x+=k):(O||(n=m-k,h=n-4),q=m+4,p=n+4,x=u+4)}this.assert(m==g);d=this.a;e=d.a;d.a=d.o;d.o=e;d.l=!0}a||C(this,"living cells: "+c);b+=1}while(b<a)}return b};
function hc(a,b){var c=0;(a=a.j[b])&&a.options&&(c=(c=a.options[a.selectedIndex])&&+c.value||0);return c}function Tb(a,b){var c=0;if(b&&(b=a.j[ic])&&b.options){var d=b.options[b.selectedIndex];d&&(c=+d.value||0,b.selectedIndex++,d=hc(a,jc)+hc(a,kc),!(d&1)&&c==d-1||0>b.selectedIndex||b.selectedIndex>=b.options.length)&&(b.selectedIndex=0)}c=[c];for(b=1;b<lc.length;b++)c.push(hc(a,lc[b]));return c}
function Vb(a,b){var c=a.a,d=-1,e=-1,f,l,k,g="";b||a.l.match(/^[0-9]/)||(b=a.l);if(b){var m=a.c[Y],m=m&&m[b];if(!m)return C(a,"unknown pattern: "+b),!1;C(a,"loading pattern '"+b+"'");var n=0;for(b=0;n<m.length;n++){var h=m[n];if("#"==h[0])C(a,h);else if(b++){var p=h.indexOf("!");if(0<=p){g+=h.substr(0,p);break}g+=h}else{k=h.match(/x\s*=\s*([0-9]+)\s*,\s*y\s*=\s*([0-9]+)\s*(?:,\s*rule\s*=\s*(\S+)|)/i);if(!k)return C(a,"unrecognized header line"),!1;f=+k[1];l=+k[2];k=k[3]}}}else{if(!a.l)return!1;b=
0;g=a.l.split("/");5==g.length&&(d=+g[b++],e=+g[b++]);if(3==g.length||5==g.length)f=+g[b++],l=+g[b++],g=g[b];else return C(a,"unrecognized pattern: "+a.l),!1;k=a.m}if(k!=a.m)return C(a,"unsupported rule: "+k),!1;0>d&&(d=c.cols-f>>1);0>e&&(e=c.rows-l>>1);if(0>d||d+f>c.cols||0>e||e+l>c.rows)return a.$("pattern too large (%d,%d)\n",f,l),!1;f=0;l=d;g=g.split(/([a-z$])/i);R(c);k=[0,0,0,1];m=0;for(h=n=!1;f<g.length-1;){b=g[f++];var p=g[f++],r=+b;for(b=""===b?1:r;b--;){var q=0,u=!1;switch(p){case "$":n=
h=!1;l=d;e++;break;case "C":m=r;h=!0;break;case "R":k[0]=r;n=!0;break;case "G":k[1]=r;n=!0;break;case "B":k[2]=r;n=!0;break;case "A":k[3]=r;n=!0;break;case "b":u=V(c,l,e,U);q++;break;case "o":u=V(c,l,e,1);q++;break;default:a.$("unrecognized pattern token: %s\n",p)}null==u?a.$("invalid pattern position (%d,%d)\n",l,e):(n&&tb(c,l,e,4>k.length||1==k[3]?c.ca("#%02x%02x%02x",k[0],k[1],k[2]):c.ca("rgba(%d,%d,%d,%d)",k[0],k[1],k[2],k[3])),h&&(u=4*(e*c.cols+l),u<=c.a.length-4&&c.a[u+2]!=m&&(c.a[u+2]=m)),
l+=q)}}Q(c,!0);return!0}t.ya=function(a){var b="";""==a&&(a=this.o);this.o="";a=a.trim();var c=a.split(" "),d=c[1];switch(c[0][0]){case "c":d?(C(this,"set category '"+d+"'"),Ka(this,d)):(d=Ka(this))?C(this,"cleared category '"+d+"'"):C(this,"no category set");break;case "?":b="available commands:";mc.forEach(function(a){b+="\n"+a});break;default:a&&(b="unrecognized command '"+a+"' (try '?')")}b&&C(this,b.trim());return!0};t.aa=function(a){a?this.g.start():Hb(this.g)};
t.oa=function(){C(this,"reset");R(this.a,!0)};
t.qa=function(){var a=null;if(Fa(this)){var b;if(window)try{(b=window.localStorage.getItem(this.s))&&(a=JSON.parse(b))}catch(e){C(this,e.message)}}if(b=a)if(a=b.sa.shift(),(a|0)!==(Sb|0))this.$("Saved state version mismatch: %3.2f\n",a);else if(!wa().pattern&&!wa()[Zb]&&b.na&&this.a){var a=this.a,c=b.na;b=c.shift();var d=c.shift(),c=c.shift();if(b==a.f&&d==a.h&&c&&c.length==a.a.length){a.a=c;for(b=0;b<=a.a.length-4;b+=4)a.a[b+1]==a.g&&(a.a[b+1]=null);Q(a,!0)}}};
t.ra=function(){var a={sa:[],na:[]};a.sa.push(Sb);if(this.a){var b=this.a,c=a.na;b.a&&(c.push(b.f),c.push(b.h),c.push(b.a))}if(Fa(this)){a=JSON.stringify(a);try{window.localStorage.setItem(this.s,a)}catch(d){C(this,d.message)}}};
function fc(a){function b(a){var b=!1;null==m[3]&&(m[3]=1);if(w){if(k){if(m[0]!==q[0]||m[1]!==q[1]||m[2]!==q[2]||m[3]!==q[3])b=!0;n!==u&&(b=!0)}g!==r&&(b=!0);if(b||a&&r)k&&(h[0]!==q[0]&&(h[0]=q[0],d+=(q[0]||"")+"R"),h[1]!==q[1]&&(h[1]=q[1],d+=(q[1]||"")+"G"),h[2]!==q[2]&&(h[2]=q[2],d+=(q[2]||"")+"B"),h[3]!==q[3]&&(h[3]=q[3],d+=(q[3]||"")+"A"),p!==u&&(p=u,d+=(u||"")+"C")),1<w&&(d+=w),d+=1===r?"o":"b",b=!0}a?(d+="$",w=0):(b?w=1:w++,r=g,q[0]=m[0],q[1]=m[1],q[2]=m[2],q[3]=m[3],u=n)}var c=a.a,d="",e=0,
f=a.a.cols,l=a.a.rows,k=!!a.f.length,g,m=[0,0,0],n,h=[0,0,0,1],p=0,r=0,q=[0,0,0,1],u=0,w=0;for(a=0;a<c.rows;a++){for(var x=0;x<c.cols;x++)g=T(c,x,a),sb(c.a[4*(a*c.cols+x)+1]||c.g,m),n=qb(c,x,a),b();b(!0)}for(;"$"==d[0];)e++,l--,d=d.slice(1);for(;"$$"==d.slice(-2);)l--,d=d.slice(0,-1);d="0/"+e+"/"+f+"/"+l+"/"+d.slice(0,-1);return d=d.replace(/\$+$/,"")}
function Yb(a,b){var c=a.j[Zb];if(c&&c.options.length){if(b)for(var d=0;d<c.options.length;d++)if(c.options[d].value==b){c.selectedIndex=d;break}b=c.options[c.selectedIndex].value;a=a.a;a.la&&(a.la.style.backgroundImage=b?"url('"+b+"')":"none")}}
function cc(a,b){var c=a.j[ac],d=a.j[bc];b=b===ac;c&&!c.options.length&&(ua(c,a.c.colors,!0),b=!0);if(c&&d&&(!d.options.length||b)){a.b=a.c.colors[c.options[c.selectedIndex].value];for(var e in a.b)if(b=a.c[e.toLowerCase()])"#"!=b[0]&&(b="#"+b),C(a,"overriding color '"+e+"' with "+b+" (formerly "+a.b[e]+")"),a.b[e]=b;ua(d,a.b,!0)}c&&d&&d.options.length&&(a.h=d.options[d.selectedIndex].value,Xb(a))}
function Wb(a,b){var c=a.j[bc];if(c){var d;for(d=0;d<c.options.length;d++)if(c.options[d].value==b){a.h=b;c.selectedIndex!=d&&(c.selectedIndex=d);break}d==c.options.length&&(c.selectedIndex=0)}}
function Xb(a,b){var c=1,d;!b&&a.h&&(d=a.j[nc])&&(d.style.backgroundColor=a.h);if(a.b)for(var e in a.b){var f=a.b[e];a.f&&(a.f[c-1]=f);var l=gc+c++;d=a.j[l];if(!d)break;d.style.display="inline-block";l==b&&Wb(a,f);f!=a.h&&(f=P(f,1,.5));d.style.backgroundColor=f}for(;;){b=gc+c++;b=a.j[b];if(!b)break;b.style.display="none"}}t.ta=function(){this.g.a||Q(this.a)};
var ac="colorPalette",bc="colorSelection",gc="colorSwatch",nc="colorSwatchSelected",ic="countInit",jc="countOn",kc="countOff",Zb="backgroundImage",Y="patterns",ec="saveToURL",lc=[null,jc,kc,"countCycle"],mc=["c\tset category"],Sb=1.1,la="LEDs";
function oc(a,b){z.call(this,a,a,pc);try{this.c=JSON.parse(b);var c=this.c[a];ma(this,c);na(this,c);oa(this,c.bindings);this.a=!1!==c.autoPower}catch(l){var c=l.message,d=c.match(/position ([0-9]+)/);d&&(c+=" ('"+b.substr(+d[1],40).replace(/\s+/g," ")+"...')");C(this,"machine '"+a+"' initialization error: "+c)}var e=this,f=null;window.addEventListener("load",function(){for(var a,b,c,d,n=0;n<qc.length;n++)for(a in e.c)try{var h=e.c[a],p="";b=h["class"];if(b==qc[n]){switch(b){case rc:d=c=new Rb(e.s,
a,h);break;case $b:c=new I(e.s,a,h);break;case Ub:c=new db(e.s,a,h);break;case sc:c=new xb(e.s,a,h);c.c.revision&&(p="revision "+c.c.revision);break;case J:c=new W(e.s,a,h);break;case tc:e.$("PCjs %s v%3.2f\n",h.name,pc);C(e,uc);C(e,vc);continue;default:C(e,"unrecognized device class: "+b);continue}C(e,b+" device initialized"+(p?" ("+p+")":""))}}catch(u){C(e,"error initializing "+b+" device '"+a+"':\n"+u.message);var p=a,r=A[e.s];if(r){var q=void 0;for(q in r)if(r[q].ma==p){r.splice(q,1);break}}}if(f=
d)f.qa&&f.qa(),f.aa&&e.a&&f.aa(!0)});window.addEventListener((Ha("iOS")?"pagehide":Ha("Opera")?"unload":void 0)||"beforeunload",function(){f&&(f.ra&&f.ra(),f.aa&&f.aa(!1))})}y(oc,z);var rc="Chip",$b="Input",Ub="LED",tc="Machine",sc="ROM",J="Time",qc=[tc,J,Ub,$b,sc,rc],uc="Copyright \u00a9 2012-2017 Jeff Parsons \x3cJeff@pcjs.org\x3e",vc="License: GPL version 3 or later \x3chttp://gnu.org/licenses/gpl.html\x3e",pc=1.1;window[la]=oc;})()