const width = window.innerWidth
const height = window.innerHeight
const random = i => Math.random() * i
const binRandom = () => Math.random() > 0.5 ? 1 : -1

export class Particle {
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

export function createParticles(Particle, particleNumber) {
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
