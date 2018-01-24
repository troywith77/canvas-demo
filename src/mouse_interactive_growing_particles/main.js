import Particle from '../../utils/Particle'
		
const plusRadius = document.querySelector('#plus-radius')
const minusRadius = document.querySelector('#minus-radius')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight
const random = i => Math.random() * i
const binRandom = () => Math.random() > 0.5 ? 1 : -1

const particleNumber = 500
let particles

particles = createParticles()

function createParticles() {
  return new Array(particleNumber).fill().map(() => {
    const r = random(10)
    const x = random(width - r * 2) + r
    const y = random(height - r * 2) + r
    const vx = random(6) * binRandom()
    const vy = random(6) * binRandom()
    const color = `rgba(${new Array(3).fill().map(i => Math.ceil(random(255))).join(',')}, ${random(1)})`
    return new Particle(x, y, vx, vy, r, color)
  })
}

function animate() {
  c.fillStyle = '#000'
  c.fillRect(0, 0, width, height)

  particles.forEach((particle) => {
    particle.update(c)
  })
  
  window.requestAnimationFrame(animate)
}

animate()