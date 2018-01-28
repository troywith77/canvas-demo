const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = 600
const height = canvas.height = 600

function getXCoor(r, angle, x) {
  // 这里的angle是角度度数，要转成theta（angle * Math.PI * 2 / 360）
  return r * Math.cos((angle * 6 - 90) * Math.PI / 180) + x
}

function getYCoor(r, angle, y) {
  return r * Math.sin((angle * 6 - 90) * Math.PI / 180) + y
}

class ClockScale {
  constructor(x, y, r, angle) {
    // （r*cosm+a，r*sinm+b）
    this.length = 20
    this.angle = angle + 1
    this.x = getXCoor(r, this.angle, x)
    this.y = getYCoor(r, this.angle, y)
    this.lineWidth = 1
    if (this.angle % 5 === 0) {
      // 遇5加粗
      this.lineWidth = 4
    }
    if (this.angle % 15 === 0) {
      // 遇15加粗并且加长
      this.lineWidth = 4
      this.startX = this.x
      this.startY = this.y
    } else {
      this.startX = getXCoor(r - 15, this.angle, x)
      this.startY = getYCoor(r - 15, this.angle, y)
    }
    this.endX = getXCoor(r - 30, this.angle, x)
    this.endY = getYCoor(r - 30, this.angle, y)
  }
  render() {
    ctx.beginPath()
    ctx.lineWidth = this.lineWidth
    ctx.moveTo(this.startX, this.startY)
    ctx.lineTo(this.endX, this.endY)
    ctx.stroke()
    ctx.closePath()
  }
}

class ClockFace {
  constructor() {
    this.x = width / 2
    this.y = height / 2
    this.r = 200
    this.render()
  }
  render() {
    ctx.beginPath()
    ctx.lineWidth = 15
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()

    
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
    ctx.stroke()
    ctx.closePath()
  }
}

class Clock {
  constructor() {
    this.x = width / 2
    this.y = height / 2
    this.r = 200
    this.init()
    this.render()
  }
  init() {
    this.scalePoints = new Array(60).fill().map((scalePoint, idx) => {
      return new ClockScale(this.x, this.y, this.r, idx)
    })
    this.face = new ClockFace()
  }
  render() {
    this.scalePoints.forEach((scalePoint) => {
      scalePoint.render()
    })
  }
}

new Clock()