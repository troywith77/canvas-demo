require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=e=>Math.random()*e,o=exports.binRandom=(()=>Math.random()>.5?1:-1),t=exports.getRandomRange=((o,t)=>Math.floor(e(t-o))+o);
},{}],7:[function(require,module,exports) {
"use strict";var t=require("../../utils");const i=document.querySelector("canvas"),e=i.getContext("2d");let n=i.width=window.innerWidth,h=i.height=window.innerHeight;const a=t=>Math.ceil(t),s=t=>Math.random()*t,o=()=>Math.random()>.5?1:-1;let r=[],d={x:n/2,y:h/2};const l=["#2B3D54","#2C5B61","#247065","#60A65F","#FFEC97","#4A33E8","#33B0E8","#A9E8DC"];class c{constructor(i,e,n,h,a,s){this.x=i,this.y=e,this.vx=n,this.vy=h,this.r=a,this.growth=s,this.alpha=1,this.color=l[(0,t.getRandomRange)(1,l.length-1)].replace("x",this.alpha)}draw(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.lineWidth=3,t.fillStyle=this.color,t.fill(),t.closePath()}update(t){this.y+this.r+this.vy>h?this.vy*=-.9:this.vy+=2,Math.abs(this.vy)<.05&&(this.vy=0),(this.x-n>0||this.x<0)&&(this.vx*=-1),this.y+=this.vy,this.x+=this.vx,this.draw(t)}}const g=(t,i,e,n,h,a=-1)=>new c(t,i,e,n,h,a);function w(){e.fillStyle="#333",e.fillRect(0,0,n,h),r.forEach(t=>{t.update(e)}),window.requestAnimationFrame(w)}i.addEventListener("mousemove",function(t){const{x:i,y:e}=t;d={x:i,y:e}}),i.addEventListener("click",function(i){r=[...r.slice(10),...new Array(20).fill().map(()=>g(d.x,d.y,(0,t.getRandomRange)(-10,10),(0,t.getRandomRange)(-25,0),(0,t.getRandomRange)(10,30)))]}),window.addEventListener("resize",()=>{n=i.width=window.innerWidth,h=i.height=window.innerHeight}),new Array(200).fill().forEach(()=>{r.push(g((0,t.getRandomRange)(0,n),(0,t.getRandomRange)(0,h),(0,t.getRandomRange)(-2,2),(0,t.getRandomRange)(-2,2),(0,t.getRandomRange)(10,30)))}),w();
},{"../../utils":12}]},{},[7])