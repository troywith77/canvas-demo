const plusRadius = document.querySelector('#plus-radius')
const minusRadius = document.querySelector('#minus-radius')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight
const ceil = i => Math.ceil(i)
const random = i => Math.random() * i
const binRandom = () => Math.random() > 0.5 ? 1 : -1

const particleNumber = 1000
let particles
let mouse = {}

class Particle {
  // 坐标x，坐标y，x轴速度，y轴速度，半径
  constructor(x, y, vx, vy, r, color) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.r = r
    this.RADIUS = r
    this.color = color
  }

  draw(c) {
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    //	圆球
    c.fillStyle = this.color
    c.fill()
    //	泡泡
    // c.strokeStyle = this.color
    // c.stroke()
    c.closePath()
  }

  update(c) {
    this.x += this.vx
    this.y += this.vy
    if (this.x > window.innerWidth || this.x < 0) {
      this.vx *= -1
    }
    if (this.y > window.innerHeight || this.y < 0) {
      this.vy *= -1
    }
    this.draw(c)
  }
}

class ParticleWithMousemoving extends Particle {
  constructor(...props) {
    super(...props)
  }
  detect(c) {
    const STEP = 2
    const RANGE = this.RADIUS + 50
    if (
      mouse.x &&
      mouse.y &&
      Math.abs(mouse.x - this.x) < RANGE &&
      Math.abs(mouse.y - this.y) < RANGE
    ) {
      if (this.r + STEP < this.RADIUS + RANGE) {
        this.r += STEP
      }
    } else if (this.r > this.RADIUS) {
      this.r -= STEP
    }
    this.update(c)
  }
}

function createParticles(Particle, particleNumber) {
  return new Array(particleNumber).fill().map(() => {
    const r = random(10) + 1
    const x = random(width - r * 2) + r
    const y = random(height - r * 2) + r
    const vx = random(5) * binRandom()
    const vy = random(5) * binRandom()
    const color = `rgba(${new Array(3).fill().map(i => Math.ceil(random(255))).join(',')}, ${random(1)})`
    return new Particle(x, y, vx, vy, r, color)
  })
}

particles = createParticles(ParticleWithMousemoving, particleNumber)

canvas.addEventListener('mousemove', function(e) {
  const { x, y } = e
  mouse = {
    x,
    y
  }
})

canvas.addEventListener('mouseleave', function() {
  mouse = {}
})

window.addEventListener('resize', function() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  particles = createParticles(ParticleWithMousemoving, particleNumber)
})

function createParticles(Particle, particleNumber) {
  return new Array(particleNumber).fill().map(() => {
    const r = ceil(random(10)) + 3
    const x = ceil(random(width - r * 2)) + r
    const y = ceil(random(height - r * 2)) + r
    const vx = random(1) * binRandom()
    const vy = random(1) * binRandom()
    const color = `rgba(${new Array(3).fill().map(i => Math.ceil(random(255))).join(',')}, ${random(1)})`
    return new Particle(x, y, vx, vy, r, color)
  })
}

function animate() {
  c.fillStyle = '#fff'
  c.fillRect(0, 0, width, height)

  particles.forEach((particle) => {
    particle.detect(c)
  })
  
  window.requestAnimationFrame(animate)
}

animate()