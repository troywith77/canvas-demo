export default class Particle {
  // 坐标x，坐标y，x轴速度，y轴速度，半径
  constructor(x, y, vx, vy, r, color) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.r = r
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