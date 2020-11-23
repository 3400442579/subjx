/*@license
* Drag/Rotate/Resize Library
* Released under the MIT license, 2018-2020
* Karen Sarksyan
* nichollascarter@gmail.com
*/
const t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},e=window.cancelAnimationFrame||window.mozCancelAnimationFrame||function(t){clearTimeout(t)},{forEach:s,slice:o,map:n,reduce:r}=Array.prototype,{warn:i}=console,a=t=>null!=t,c=t=>null==t,h=t=>(t=>"function"==typeof t)(t)?function(){t.call(this,...arguments)}:()=>{};class l{constructor(t){if("string"==typeof t){const e=document.querySelectorAll(t);this.length=e.length;for(let t=0;t<this.length;t++)this[t]=e[t]}else if("object"!=typeof t||1!==t.nodeType&&t!==document)if(t instanceof l){this.length=t.length;for(let e=0;e<this.length;e++)this[e]=t[e]}else{if(!a(e=t)||"object"!=typeof e||!(Array.isArray(e)||a(window.Symbol)&&"function"==typeof e[window.Symbol.iterator]||a(e.forEach)||"number"==typeof e.length&&(0===e.length||e.length>0&&e.length-1 in e)))throw new Error("Passed parameter must be selector/element/elementArray");this.length=0;for(let e=0;e<this.length;e++)1===t.nodeType&&(this[e]=t[e],this.length++)}else this[0]=t,this.length=1;var e}css(t){const e={setStyle(t){return((t,e)=>{let s=t.length;for(;s--;)for(const o in e)t[s].style[o]=e[o];return t.style})(this,t)},getStyle(){return(e=>{let s=e.length;for(;s--;)return e[s].currentStyle?e[s].currentStyle[t]:document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(e[s],"")[t]:e[s].style[t]})(this)}};return"string"==typeof t?e.getStyle.apply(this,o.call(arguments,1)):"object"!=typeof t&&t?(i(`Method ${t} does not exist`),!1):e.setStyle.apply(this,arguments)}on(){let t=this.length;for(;t--;)this[t].events||(this[t].events={},this[t].events[arguments[0]]=[]),"string"!=typeof arguments[1]?document.addEventListener?this[t].addEventListener(arguments[0],arguments[1],arguments[2]||{passive:!1}):document.attachEvent?this[t].attachEvent(`on${arguments[0]}`,arguments[1]):this[t][`on${arguments[0]}`]=arguments[1]:d(this[t],arguments[0],arguments[1],arguments[2],arguments[3],!0);return this}off(){let t=this.length;for(;t--;)this[t].events||(this[t].events={},this[t].events[arguments[0]]=[]),"string"!=typeof arguments[1]?document.removeEventListener?this[t].removeEventListener(arguments[0],arguments[1],arguments[2]):document.detachEvent?this[t].detachEvent(`on${arguments[0]}`,arguments[1]):this[t][`on${arguments[0]}`]=null:d(this[t],arguments[0],arguments[1],arguments[2],arguments[3],!1);return this}is(t){if(c(t))return!1;const e=u(t);let s=this.length;for(;s--;)if(this[s]===e[s])return!0;return!1}}function d(t,e,s,o,n,r){const i=function(t){let e=t.target;for(;e&&e!==this;)e.matches(s)&&o.call(e,t),e=e.parentNode};!0===r?document.addEventListener?t.addEventListener(e,i,n||{passive:!1}):document.attachEvent?t.attachEvent(`on${e}`,i):t[`on${e}`]=i:document.removeEventListener?t.removeEventListener(e,i,n||{passive:!1}):document.detachEvent?t.detachEvent(`on${e}`,i):t[`on${e}`]=null}function u(t){return new l(t)}class f{constructor(){this.observers={}}subscribe(t,e){const s=this.observers;return c(s[t])&&Object.defineProperty(s,t,{value:[]}),s[t].push(e),this}unsubscribe(t,e){const s=this.observers;if(a(s[t])){const o=s[t].indexOf(e);s[t].splice(o,1)}return this}notify(t,e,s){c(this.observers[t])||this.observers[t].forEach(o=>{if(e!==o)switch(t){case"onmove":o.notifyMove(s);break;case"onrotate":o.notifyRotate(s);break;case"onresize":o.notifyResize(s);break;case"onapply":o.notifyApply(s);break;case"ongetstate":o.notifyGetState(s)}})}}class p{constructor(t){this.name=t,this.callbacks=[]}registerCallback(t){this.callbacks.push(t)}removeCallback(t){const e=this.callbacks(t);this.callbacks.splice(e,1)}}class m{constructor(){this.events={}}registerEvent(t){this.events[t]=new p(t)}emit(t,e,s){this.events[e].callbacks.forEach(e=>{e.call(t,s)})}addEventListener(t,e){this.events[t].registerCallback(e)}removeEventListener(t,e){this.events[t].removeCallback(e)}}class v{constructor(t){this.el=t,this.storage=null,this.proxyMethods=null,this.eventDispatcher=new m,this._onMouseDown=this._onMouseDown.bind(this),this._onTouchStart=this._onTouchStart.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onTouchMove=this._onTouchMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onTouchEnd=this._onTouchEnd.bind(this),this._animate=this._animate.bind(this)}enable(t){this._processOptions(t),this._init(this.el),this.proxyMethods.onInit.call(this,this.el)}disable(){g()}_init(){g()}_destroy(){g()}_processOptions(){g()}_start(){g()}_moving(){g()}_end(){g()}_animate(){g()}_drag({dx:t,dy:e,...s}){const o={dx:t,dy:e,transform:this._processMove(t,e),...s};this.proxyMethods.onMove.call(this,o),this._emitEvent("drag",o)}_draw(){this._animate()}_onMouseDown(t){this._start(t),u(document).on("mousemove",this._onMouseMove).on("mouseup",this._onMouseUp)}_onTouchStart(t){this._start(t.touches[0]),u(document).on("touchmove",this._onTouchMove).on("touchend",this._onTouchEnd)}_onMouseMove(t){t.preventDefault&&t.preventDefault(),this._moving(t,this.el)}_onTouchMove(t){t.preventDefault&&t.preventDefault(),this._moving(t.touches[0],this.el)}_onMouseUp(t){u(document).off("mousemove",this._onMouseMove).off("mouseup",this._onMouseUp),this._end(t,this.el)}_onTouchEnd(t){u(document).off("touchmove",this._onTouchMove).off("touchend",this._onTouchEnd),0===t.touches.length&&this._end(t.changedTouches[0],this.el)}_emitEvent(){this.eventDispatcher.emit(this,...arguments)}on(t,e){return this.eventDispatcher.addEventListener(t,e),this}off(t,e){return this.eventDispatcher.removeEventListener(t,e),this}}const g=()=>{throw Error("Method not implemented")},x=["dragStart","drag","dragEnd","resizeStart","resize","resizeEnd","rotateStart","rotate","rotateEnd","setPointStart","setPointEnd"],y=Math.PI/180,b=(t,e)=>{if(0===e)return t;{const s=_(t,e);if(s-t<e)return s}},_=(t,e)=>0===e?t:Math.round(t/e)*e,E=(t,e=6)=>Number(t.toFixed(e)),M=t=>t.getBoundingClientRect(),w=t=>{return t.css("-webkit-transform")||t.css("-moz-transform")||t.css("-ms-transform")||t.css("-o-transform")||t.css("transform")||"none"},j=t=>{const e=t.match(/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g);return e?e.map(t=>parseFloat(t)):[1,0,0,1,0,0]},z=(t,e)=>{if(e){if(t.classList){if(!(e.indexOf(" ")>-1))return t.classList.add(e);e.split(/\s+/).forEach(e=>t.classList.add(e))}return t}},T=(t,e)=>{if(e){if(t.classList){if(!(e.indexOf(" ")>-1))return t.classList.remove(e);e.split(/\s+/).forEach(e=>t.classList.remove(e))}return t}},R=t=>{const e=`matrix(${t.join()})`;return{transform:e,webkitTranform:e,mozTransform:e,msTransform:e,otransform:e}};class S extends v{constructor(t,e,s){if(super(t),this.constructor===S)throw new TypeError("Cannot construct Transformable instances directly");this.observable=s,x.forEach(t=>{this.eventDispatcher.registerEvent(t)}),this.enable(e)}_cursorPoint(){throw Error("'_cursorPoint()' method not implemented")}_rotate({radians:t,...e}){const s={transform:this._processRotate(t),delta:t,...e};this.proxyMethods.onRotate.call(this,s),this._emitEvent("rotate",s)}_resize({dx:t,dy:e,...s}){const o={...this._processResize(t,e),dx:t,dy:e,...s};this.proxyMethods.onResize.call(this,o),this._emitEvent("resize",o)}_processOptions(t){const{el:e}=this;z(e,"sjx-drag");const s={x:10,y:10,angle:10*y},o={move:!1,resize:!1,rotate:!1};let n=null,r=!1,i="xy",l="auto",d="auto",f="auto",p=!1,m=!0,v=!0,g=!0,x=null,b=50,_=!0,E=null,M=null,w=null,j=()=>{},T=()=>{},R=()=>{},S=()=>{},X=()=>{},Y=()=>{},D=e.parentNode;if(a(t)){const{snap:z,each:C,axis:O,cursorMove:k,cursorResize:H,cursorRotate:L,rotationPoint:P,restrict:A,draggable:N,resizable:F,rotatable:$,onInit:W,onDrop:q,onMove:U,onResize:I,onRotate:B,onDestroy:V,container:G,proportions:J,custom:K,rotatorAnchor:Q,rotatorOffset:Z,showNormal:tt,resizeHandles:et,className:st}=t;if(a(z)){const{x:t,y:e,angle:o}=z;s.x=c(t)?10:t,s.y=c(e)?10:e,s.angle=c(o)?s.angle:o*y}if(a(C)){const{move:t,resize:e,rotate:s}=C;o.move=t||!1,o.resize=e||!1,o.rotate=s||!1}a(A)&&(n="parent"===A?e.parentNode:u(A)[0]||document),l=k||"auto",d=H||"auto",f=L||"auto",i=O||"xy",D=a(G)&&u(G)[0]?u(G)[0]:D,p=P||!1,r=J||!1,m=!a(N)||N,v=!a(F)||F,g=!a($)||$,E="object"==typeof K&&K||null,x=Q||null,b=Z||50,_=!a(tt)||tt,M=a(et)?et:null,w=a(st)?st:null,j=h(W),X=h(q),T=h(U),S=h(I),R=h(B),Y=h(V)}this.options={axis:i,cursorMove:l,cursorRotate:f,cursorResize:d,rotationPoint:p,restrict:n,container:D,snap:s,each:o,proportions:r,draggable:m,resizable:v,rotatable:g,custom:E,rotatorAnchor:x,rotatorOffset:b,showNormal:_,resizeHandles:M,className:w},this.proxyMethods={onInit:j,onDrop:X,onMove:T,onResize:S,onRotate:R,onDestroy:Y},this.subscribe(o)}_animate(){const e=this,{observable:s,storage:o,options:n}=e;if(c(o))return;if(o.frame=t(e._animate),!o.doDraw)return;o.doDraw=!1;let{dox:r,doy:i,clientX:h,clientY:l,doDrag:d,doResize:u,doRotate:f,doSetCenter:p,revX:m,revY:v}=o;const{snap:g,each:{move:x,resize:y,rotate:_},restrict:E,draggable:M,resizable:w,rotatable:j}=n;if(u&&w){const{transform:t,cx:n,cy:a}=o,{x:c,y:d}=this._pointToElement({x:h,y:l});let u=r?b(c-n,g.x/t.scX):0,f=i?b(d-a,g.y/t.scY):0;const p={dx:u=r?m?-u:u:0,dy:f=i?v?-f:f:0,clientX:h,clientY:l};e._resize(p),y&&s.notify("onresize",e,p)}if(d&&M){const{restrictOffset:t,elementOffset:n,nx:c,ny:d}=o;if(a(E)){const{left:e,top:s}=t,{left:o,top:r,width:i,height:a}=n,u=c-h,f=d-l,p=E.clientWidth-i,m=E.clientHeight-a,v=r-s,g=o-e;v-f<0&&(l=d-r+s),g-u<0&&(h=c-o+e),v-f>m&&(l=m+(d-r+s)),g-u>p&&(h=p+(c-o+e))}const u={dx:r?b(h-c,g.x):0,dy:i?b(l-d,g.y):0,clientX:h,clientY:l};e._drag(u),x&&s.notify("onmove",e,u)}if(f&&j){const{pressang:t,center:n}=o,r=Math.atan2(l-n.y,h-n.x)-t,i={clientX:h,clientY:l};e._rotate({radians:b(r,g.angle),...i}),_&&s.notify("onrotate",e,{radians:r,...i})}if(p&&j){const{bx:t,by:s}=o,{x:n,y:r}=this._pointToControls({x:h,y:l});e._moveCenterHandle(n-t,r-s)}}_start(t){const{observable:e,storage:s,options:{axis:o,restrict:n,each:r},el:i}=this,c=this._compute(t);Object.keys(c).forEach(t=>{s[t]=c[t]});const{onRightEdge:h,onBottomEdge:l,onTopEdge:d,onLeftEdge:u,handle:f,factor:p,revX:m,revY:v,doW:g,doH:x}=c,y=h||l||d||u,{handles:b}=s,{rotator:_,center:E,radius:w}=b;a(w)&&T(w,"sjx-hidden");const j=f.is(_),z=!!a(E)&&f.is(E),R=!(j||y||z),{clientX:S,clientY:X}=t,{x:Y,y:D}=this._cursorPoint({clientX:S,clientY:X}),{x:C,y:O}=this._pointToElement({x:Y,y:D}),{x:k,y:H}=this._pointToControls({x:Y,y:D}),L={clientX:S,clientY:X,nx:Y,ny:D,cx:C,cy:O,bx:k,by:H,doResize:y,doDrag:R,doRotate:j,doSetCenter:z,onExecution:!0,cursor:null,elementOffset:M(i),restrictOffset:a(n)?M(n):null,dox:/\x/.test(o)&&(!y||(f.is(b.ml)||f.is(b.mr)||f.is(b.tl)||f.is(b.tr)||f.is(b.bl)||f.is(b.br))),doy:/\y/.test(o)&&(!y||(f.is(b.br)||f.is(b.bl)||f.is(b.bc)||f.is(b.tr)||f.is(b.tl)||f.is(b.tc)))};this.storage={...s,...L};const P={clientX:S,clientY:X};y?this._emitEvent("resizeStart",P):j?this._emitEvent("rotateStart",P):R&&this._emitEvent("dragStart",P);const{move:A,resize:N,rotate:F}=r,$=y?"resize":j?"rotate":"drag",W=y&&N||j&&F||R&&A;e.notify("ongetstate",this,{clientX:S,clientY:X,actionName:$,triggerEvent:W,factor:p,revX:m,revY:v,doW:g,doH:x}),this._draw()}_moving(t){const{storage:e,options:s}=this,{x:o,y:n}=this._cursorPoint(t);e.e=t,e.clientX=o,e.clientY=n,e.doDraw=!0;let{doRotate:r,doDrag:i,doResize:a,cursor:h}=e;const{cursorMove:l,cursorResize:d,cursorRotate:f}=s;c(h)&&(i?h=l:r?h=f:a&&(h=d),u(document.body).css({cursor:h}))}_end({clientX:t,clientY:s}){const{options:{each:o},observable:n,storage:r,proxyMethods:i}=this,{doResize:c,doDrag:h,doRotate:l,frame:d,handles:{radius:f}}=r,p=c?"resize":h?"drag":"rotate";r.doResize=!1,r.doDrag=!1,r.doRotate=!1,r.doSetCenter=!1,r.doDraw=!1,r.onExecution=!1,r.cursor=null,this._apply(p);const m={clientX:t,clientY:s};i.onDrop.call(this,m),c?this._emitEvent("resizeEnd",m):l?this._emitEvent("rotateEnd",m):h&&this._emitEvent("dragEnd",m);const{move:v,resize:g,rotate:x}=o,y=c&&g||l&&x||h&&v;n.notify("onapply",this,{clientX:t,clientY:s,actionName:p,triggerEvent:y}),e(d),u(document.body).css({cursor:"auto"}),a(f)&&z(f,"sjx-hidden")}_compute(t){const{handles:e}=this.storage,s=u(t.target),{revX:o,revY:n,doW:r,doH:i,...a}=this._checkHandles(s,e),c=this._getState({revX:o,revY:n,doW:r,doH:i}),{x:h,y:l}=this._cursorPoint(t),d=Math.atan2(l-c.center.y,h-c.center.x);return{...c,...a,handle:s,pressang:d}}_checkHandles(t,e){const{tl:s,tc:o,tr:n,bl:r,br:i,bc:c,ml:h,mr:l}=e,d=!!a(s)&&t.is(s),u=!!a(o)&&t.is(o),f=!!a(n)&&t.is(n),p=!!a(r)&&t.is(r),m=!!a(c)&&t.is(c),v=!!a(i)&&t.is(i),g=!!a(h)&&t.is(h),x=!!a(l)&&t.is(l);return{revX:d||g||p||u,revY:d||f||u||g,onTopEdge:u||f||d,onLeftEdge:d||g||p,onRightEdge:f||x||v,onBottomEdge:v||m||p,doW:g||x,doH:u||m}}notifyMove(){this._drag(...arguments)}notifyRotate({radians:t,...e}){const{snap:{angle:s}}=this.options;this._rotate({radians:b(t,s),...e})}notifyResize(){this._resize(...arguments)}notifyApply({clientX:t,clientY:e,actionName:s,triggerEvent:o}){this.proxyMethods.onDrop.call(this,{clientX:t,clientY:e}),o&&(this._apply(s),this._emitEvent(`${s}End`,{clientX:t,clientY:e}))}notifyGetState({clientX:t,clientY:e,actionName:s,triggerEvent:o,...n}){if(o){const o=this._getState(n);this.storage={...this.storage,...o},this._emitEvent(`${s}Start`,{clientX:t,clientY:e})}}subscribe({resize:t,move:e,rotate:s}){const{observable:o}=this;(e||t||s)&&o.subscribe("ongetstate",this).subscribe("onapply",this),e&&o.subscribe("onmove",this),t&&o.subscribe("onresize",this),s&&o.subscribe("onrotate",this)}unsubscribe(){const{observable:t}=this;t.unsubscribe("ongetstate",this).unsubscribe("onapply",this).unsubscribe("onmove",this).unsubscribe("onresize",this).unsubscribe("onrotate",this)}disable(){const{storage:t,proxyMethods:e,el:s}=this;c(t)||(t.onExecution&&(this._end(),u(document).off("mousemove",this._onMouseMove).off("mouseup",this._onMouseUp).off("touchmove",this._onTouchMove).off("touchend",this._onTouchEnd)),T(s,"sjx-drag"),this._destroy(),this.unsubscribe(),e.onDestroy.call(this,s),delete this.storage)}exeDrag({dx:t,dy:e}){const{draggable:s}=this.options;s&&(this.storage={...this.storage,...this._getState({revX:!1,revY:!1,doW:!1,doH:!1})},this._drag({dx:t,dy:e}),this._apply("drag"))}exeResize({dx:t,dy:e,revX:s,revY:o,doW:n,doH:r}){const{resizable:i}=this.options;i&&(this.storage={...this.storage,...this._getState({revX:s||!1,revY:o||!1,doW:n||!1,doH:r||!1})},this._resize({dx:t,dy:e}),this._apply("resize"))}exeRotate({delta:t}){const{rotatable:e}=this.options;e&&(this.storage={...this.storage,...this._getState({revX:!1,revY:!1,doW:!1,doH:!1})},this._rotate({radians:t}),this._apply("rotate"))}}const X=({x:t,y:e},s)=>{const[o,n,r,i,a,c]=s;return{x:o*t+r*e+a,y:n*t+i*e+c}},Y=t=>{const e=[[t[0],t[2],t[4]],[t[1],t[3],t[5]],[0,0,1]];if(e.length!==e[0].length)return;const s=e.length,o=[],n=[];for(let t=0;t<s;t+=1){o[o.length]=[],n[n.length]=[];for(let r=0;r<s;r+=1)o[t][r]=t==r?1:0,n[t][r]=e[t][r]}for(let t=0;t<s;t+=1){let e=n[t][t];if(0===e){for(let r=t+1;r<s;r+=1)if(0!==n[r][t]){for(let i=0;i<s;i++)e=n[t][i],n[t][i]=n[r][i],n[r][i]=e,e=o[t][i],o[t][i]=o[r][i],o[r][i]=e;break}if(0===(e=n[t][t]))return}for(let r=0;r<s;r++)n[t][r]=n[t][r]/e,o[t][r]=o[t][r]/e;for(let r=0;r<s;r++)if(r!=t){e=n[r][t];for(let i=0;i<s;i++)n[r][i]-=e*n[t][i],o[r][i]-=e*o[t][i]}}return[o[0][0],o[1][0],o[0][1],o[1][1],o[0][2],o[1][2]]},D=([t,e,s,o,n,r],[i,a,c,h,l,d])=>{const u=[[t,s,n],[e,o,r],[0,0,1]],f=[[i,c,l],[a,h,d],[0,0,1]],p=[];for(let t=0;t<f.length;t++){p[t]=[];for(let e=0;e<u[0].length;e++){let s=0;for(let o=0;o<u.length;o++)s+=u[o][e]*f[t][o];p[t].push(s)}}return[p[0][0],p[1][0],p[0][1],p[1][1],p[0][2],p[1][2]]},C=(t,e,s,o,n,r,i,a,c)=>{const h=parseFloat(s)/2,l=parseFloat(o)/2,d=t+h,u=e+l,f=t-d,p=e-u,m=Math.atan2(a?0:p,c?0:f)+n,v=Math.sqrt(Math.pow(c?0:h,2)+Math.pow(a?0:l,2));let g=Math.cos(m),x=Math.sin(m);const y=u+v*(x=!0===i?-x:x);return{left:E(d+v*(g=!0===r?-g:g)),top:E(y)}},O=2,k=7;class H extends S{_init(t){const{rotationPoint:e,container:s,resizable:o,rotatable:n,showNormal:r,resizeHandles:i,className:h}=this.options,{left:l,top:d,width:f,height:p}=t.style,m=document.createElement("div");z(m,"sjx-wrapper"),a(h)&&z(m,h),s.appendChild(m);const v=u(t),g=f||v.css("width"),x=p||v.css("height"),y={top:d||v.css("top"),left:l||v.css("left"),width:g,height:x,transform:w(v)},b=document.createElement("div");z(b,"sjx-controls");const _={...n&&{normal:r?["sjx-normal"]:null,rotator:["sjx-hdl","sjx-hdl-m","sjx-rotator"]},...o&&{tl:["sjx-hdl","sjx-hdl-t","sjx-hdl-l","sjx-hdl-tl"],tr:["sjx-hdl","sjx-hdl-t","sjx-hdl-r","sjx-hdl-tr"],br:["sjx-hdl","sjx-hdl-b","sjx-hdl-r","sjx-hdl-br"],bl:["sjx-hdl","sjx-hdl-b","sjx-hdl-l","sjx-hdl-bl"],tc:["sjx-hdl","sjx-hdl-t","sjx-hdl-c","sjx-hdl-tc"],bc:["sjx-hdl","sjx-hdl-b","sjx-hdl-c","sjx-hdl-bc"],ml:["sjx-hdl","sjx-hdl-m","sjx-hdl-l","sjx-hdl-ml"],mr:["sjx-hdl","sjx-hdl-m","sjx-hdl-r","sjx-hdl-mr"]},center:e&&n?["sjx-hdl","sjx-hdl-m","sjx-hdl-c","sjx-hdl-mc"]:void 0};if(Object.keys(_).forEach(t=>{const e=i[t];if(a(e)&&0==e)return;const s=_[t];if(c(s))return;const o=L(s);_[t]=o,b.appendChild(o)}),a(_.center)){u(_.center).css({left:`${t.getAttribute("data-cx")}px`,top:`${t.getAttribute("data-cy")}px`})}m.appendChild(b);const E=u(b);E.css(y),this.storage={controls:b,handles:_,radius:void 0,parent:t.parentNode},E.on("mousedown",this._onMouseDown).on("touchstart",this._onTouchStart)}_destroy(){const{controls:t}=this.storage;u(t).off("mousedown",this._onMouseDown).off("touchstart",this._onTouchStart);const e=t.parentNode;e.parentNode.removeChild(e)}_pointToElement({x:t,y:e}){const{transform:s}=this.storage,o=[...s.matrix];return o[4]=o[5]=0,this._applyMatrixToPoint(Y(o),t,e)}_pointToControls(t){return this._pointToElement(t)}_applyMatrixToPoint(t,e,s){return X({x:e,y:s},t)}_cursorPoint({clientX:t,clientY:e}){const{container:s}=this.options,o=j(w(u(s)));return X({x:t,y:e},Y(o))}_apply(){const{el:t,storage:e}=this,{controls:s,handles:o}=e,n=u(s),r=parseFloat(n.css("width"))/2,i=parseFloat(n.css("height"))/2,{center:c}=o,h=a(c),l=h?parseFloat(u(c).css("left")):r,d=h?parseFloat(u(c).css("top")):i;t.setAttribute("data-cx",l),t.setAttribute("data-cy",d),this.storage.cached=null}_processResize(t,e){const{el:s,storage:o,options:{proportions:n}}=this,{controls:r,coords:i,cw:c,ch:h,transform:l,refang:d,revX:f,revY:p,doW:m,doH:v,restrictOffset:g,handle:x}=o,y=m||!m&&!v?(c+t)/c:(h+e)/h;let b=n?c*y:c+t,_=n?h*y:h+e;if(b<=O||_<=O)return;const E=[...l.matrix];a(g)&&(t>0&&(x[0].className.indexOf("sjx-hdl-l")>-1?E[4]-t<0&&(b=c+E[4]):b+E[4]>g.width&&(b=g.width-E[4])),e>0&&(x[0].className.indexOf("sjx-hdl-l")>-1?E[5]-t<0&&(b=h+E[5]):_+E[5]>g.height&&(_=g.height-E[5])));const M=C(E[4],E[5],b,_,d,f,p,m,v),w=i.left-M.left,j=i.top-M.top;E[4]+=w,E[5]+=j;const z=R(E);return z.width=`${b}px`,z.height=`${_}px`,u(r).css(z),u(s).css(z),o.cached={dx:w,dy:j},{width:b,height:_,ox:w,oy:j}}_processMove(t,e){const{el:s,storage:o}=this,{controls:n,transform:{matrix:r,parentMatrix:i}}=o,a=[...i];a[4]=a[5]=0;const c=[...r];c[4]=r[4]+t,c[5]=r[5]+e;const h=R(c);return u(n).css(h),u(s).css(h),o.cached={dx:t,dy:e},c}_processRotate(t){const{el:e,storage:{controls:s,transform:o,center:n}}=this,{matrix:r,parentMatrix:i}=o,a=E(Math.cos(t),4),c=E(Math.sin(t),4),h=[1,0,0,1,n.cx,n.cy],l=[a,c,-c,a,0,0],d=[...i];d[4]=d[5]=0;const f=D(Y(d),D(l,d)),p=D(D(h,f),Y(h)),m=D(p,r),v=R(m);return u(s).css(v),u(e).css(v),m}_getState(t){const{revX:e,revY:s,doW:o,doH:n}=t,r=e!==s?-1:1,{el:i,storage:{handles:c,controls:h,parent:l},options:{container:d}}=this,{center:f}=c,p=u(h),m=j(w(u(d))),v=j(w(u(h))),g=j(w(u(l))),x=Math.atan2(v[1],v[0])*r,y=l!==d?D(g,m):m,b={matrix:v,parentMatrix:y,scX:Math.sqrt(v[0]*v[0]+v[1]*v[1]),scY:Math.sqrt(v[2]*v[2]+v[3]*v[3])},_=parseFloat(p.css("width")),E=parseFloat(p.css("height")),z=C(v[4],v[5],_,E,x,e,s,o,n),T=_/2,R=E/2,S=M(i),O=a(f),H=O?parseFloat(u(f).css("left")):T,L=O?parseFloat(u(f).css("top")):R,P=O?k:0,{x:A,y:N}=X({x:S.left,y:S.top},Y(y));return{transform:b,cw:_,ch:E,coords:z,center:{x:A+H-P,y:N+L-P,cx:-H+T-P,cy:-L+R-P,hx:H,hy:L},factor:r,refang:x,revX:e,revY:s,doW:o,doH:n}}_moveCenterHandle(t,e){const{handles:{center:s},center:{hx:o,hy:n}}=this.storage,r=`${o+t}px`,i=`${n+e}px`;u(s).css({left:r,top:i})}resetCenterPoint(){const{handles:{center:t}}=this.storage;u(t).css({left:null,top:null})}fitControlsToSize(){}get controls(){return this.storage.controls}}const L=t=>{const e=document.createElement("div");return t.forEach(t=>{z(e,t)}),e};function P(t,e){if(this.length){const s=a(e)&&e instanceof f?e:new f;return r.call(this,(e,o)=>(e.push(new H(o,t,s)),e),[])}}class A extends l{drag(){return P.call(this,...arguments)}}function N(t){return new A(t)}Object.defineProperty(N,"createObservable",{value:()=>new f}),Object.defineProperty(N,"Subjx",{value:A}),Object.defineProperty(N,"Observable",{value:f});export default N;
