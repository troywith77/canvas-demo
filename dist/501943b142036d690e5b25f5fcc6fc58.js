require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({14:[function(require,module,exports) {
const t=document.querySelector("canvas"),i=t.getContext("2d");let e=t.width=window.innerWidth,h=t.height=window.innerHeight;const n=t=>Math.ceil(t),s=t=>Math.random()*t,a=()=>Math.random()>.5?1:-1;let r=[],o={x:e/2,y:h/2};const d=["rgba(252, 190, 0, x)","rgba(254, 251, 208, x)","rgba(255, 129, 0, x)","rgba(253, 207, 183, x)","rgba(244, 130, 140, x)","rgba(255, 47, 0, x)"];class c{constructor(t,i,e,h,n,r){this.x=t,this.y=i,this.vx=s(e)*a(),this.vy=s(h)*a(),this.r=n,this.growth=r,this.alpha=1}draw(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.lineWidth=3,t.strokeStyle=d[0].replace("x",this.alpha),t.stroke(),t.closePath()}update(t){this.x+=this.vx,this.y+=this.vy,this.r+=this.growth,this.alpha-=.03,this.draw(t)}}const l=(t,i,e=6,h=6,n=50,s=-1)=>new c(t,i,e,h,n,s),w=(t,i,e=0,h=0,n=50,s=20)=>new c(t,i,e,h,n,s);function x(){i.fillStyle="#222",i.fillRect(0,0,e,h),r.push(l(o.x,o.y)),r=r.filter(t=>(t.update(i),!(t.alpha<=0||t.r>e))),window.requestAnimationFrame(x)}t.addEventListener("mousemove",function(t){const{x:i,y:e}=t;o={x:i,y:e}}),t.addEventListener("click",function(t){d.push(d.shift()),r.push(w(o.x,o.y))}),window.addEventListener("resize",()=>{e=t.width=window.innerWidth,h=t.height=window.innerHeight}),x();
},{}]},{},[14])