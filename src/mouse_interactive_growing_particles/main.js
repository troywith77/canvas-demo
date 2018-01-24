import { Particle } from '../../utils/Particle'
		
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