require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var a=e[n]=new t.Module;r[n][0].call(a.exports,i,a,a.exports)}return e[n].exports}function o(){this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({12:[function(require,module,exports) {
const t=document.querySelector("canvas"),i=t.getContext("2d"),h=t.width=window.innerWidth,s=t.height=window.innerHeight,e=t=>Math.random()*t,n=()=>Math.random()>.5?1:-1,r=parseInt(prompt("How many particles would you like to show?","500"),10);let o;class a{constructor(t,i,h,s,e,n){this.x=t,this.y=i,this.vx=h,this.vy=s,this.r=e,this.color=n}draw(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,2*Math.PI),t.fillStyle=this.color,t.fill(),t.closePath()}update(t){this.x+=this.vx,this.y+=this.vy,(this.x>h||this.x<0)&&(this.vx*=-1),(this.y>s||this.y<0)&&(this.vy*=-1),this.draw(t)}}function l(){return new Array(r).fill().map(()=>{const t=e(10),i=e(h-2*t)+t,r=e(s-2*t)+t,o=e(6)*n(),l=e(6)*n(),c=`rgba(${new Array(3).fill().map(t=>Math.ceil(e(255))).join(",")}, ${e(1)})`;return new a(i,r,o,l,t,c)})}function c(){i.fillStyle="#000",i.fillRect(0,0,h,s),o.forEach(t=>{t.update(i)}),window.requestAnimationFrame(c)}o=l(),c();
},{}]},{},[12])