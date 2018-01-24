// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createParticles = createParticles;
const width = window.innerWidth;
const height = window.innerHeight;
const random = i => Math.random() * i;
const binRandom = () => Math.random() > 0.5 ? 1 : -1;

class Particle {
  // 坐标x，坐标y，x轴速度，y轴速度，半径
  constructor(x, y, vx, vy, r, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.r = r;
    this.RADIUS = r;
    this.color = color;
  }

  draw(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    //	圆球
    c.fillStyle = this.color;
    c.fill();
    //	泡泡
    // c.strokeStyle = this.color
    // c.stroke()
    c.closePath();
  }

  update(c) {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > window.innerWidth || this.x < 0) {
      this.vx *= -1;
    }
    if (this.y > window.innerHeight || this.y < 0) {
      this.vy *= -1;
    }
    this.draw(c);
  }
}

exports.Particle = Particle;
function createParticles(Particle, particleNumber) {
  return new Array(particleNumber).fill().map(() => {
    const r = random(10) + 1;
    const x = random(width - r * 2) + r;
    const y = random(height - r * 2) + r;
    const vx = random(5) * binRandom();
    const vy = random(5) * binRandom();
    const color = `rgba(${new Array(3).fill().map(i => Math.ceil(random(255))).join(',')}, ${random(1)})`;
    return new Particle(x, y, vx, vy, r, color);
  });
}
},{}],2:[function(require,module,exports) {
"use strict";

var _Particle = require("../../utils/Particle");

const plusRadius = document.querySelector('#plus-radius');
const minusRadius = document.querySelector('#minus-radius');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const ceil = i => Math.ceil(i);
const random = i => Math.random() * i;
const binRandom = () => Math.random() > 0.5 ? 1 : -1;

const particleNumber = 1000;
let particles;
let mouse = {};

class ParticleWithMousemoving extends _Particle.Particle {
  constructor(...props) {
    super(...props);
  }
  detect(c) {
    const STEP = 2;
    const RANGE = this.RADIUS + 50;
    if (mouse.x && mouse.y && Math.abs(mouse.x - this.x) < RANGE && Math.abs(mouse.y - this.y) < RANGE) {
      if (this.r + STEP < this.RADIUS + RANGE) {
        this.r += STEP;
      }
    } else if (this.r > this.RADIUS) {
      this.r -= STEP;
    }
    this.update(c);
  }
}

particles = createParticles(ParticleWithMousemoving, particleNumber);

canvas.addEventListener('mousemove', function (e) {
  const { x, y } = e;
  mouse = {
    x,
    y
  };
});

canvas.addEventListener('mouseleave', function () {
  mouse = {};
});

window.addEventListener('resize', function () {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  particles = createParticles(ParticleWithMousemoving, particleNumber);
});

function createParticles(Particle, particleNumber) {
  return new Array(particleNumber).fill().map(() => {
    const r = ceil(random(10)) + 3;
    const x = ceil(random(width - r * 2)) + r;
    const y = ceil(random(height - r * 2)) + r;
    const vx = random(1) * binRandom();
    const vy = random(1) * binRandom();
    const color = `rgba(${new Array(3).fill().map(i => Math.ceil(random(255))).join(',')}, ${random(1)})`;
    return new Particle(x, y, vx, vy, r, color);
  });
}

function animate() {
  c.fillStyle = '#fff';
  c.fillRect(0, 0, width, height);

  particles.forEach(particle => {
    particle.detect(c);
  });

  window.requestAnimationFrame(animate);
}

animate();
},{"../../utils/Particle":3}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':14068/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,2])