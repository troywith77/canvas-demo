const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = 600
const height = canvas.height = 600

function getXCoor(r, angle, x) {
  // 这里的angle是角度度数，要转成theta（angle * Math.PI * 2 / 360）
  return r * Math.cos(angle * Math.PI / 180) + x
}

function getYCoor(r, angle, y) {
  return r * Math.sin(angle * Math.PI / 180) + y
}

class ClockScale {
  constructor(x, y, r, angle) {
    // （r*cosm+a，r*sinm+b）
    this.length = 20
    this.angle = angle + 1
    this.x = getXCoor(r, this.angle * 6 - 90, x)
    this.y = getYCoor(r, this.angle * 6 - 90, y)
    this.lineWidth = 1
    if (this.angle % 5 === 0) {
      // 遇5加粗
      this.lineWidth = 5
      // 数字
      this.textX = getXCoor(r - 60, this.angle * 6 - 90, x)
      this.textY = getYCoor(r - 60, this.angle * 6 - 90, x)
    }
    if (this.angle % 15 === 0) {
      // 遇15加粗并且加长
      this.lineWidth = 8
      this.startX = this.x
      this.startY = this.y
    } else {
      this.startX = getXCoor(r - 15, this.angle * 6 - 90, x)
      this.startY = getYCoor(r - 15, this.angle * 6 - 90, y)
    }
    this.endX = getXCoor(r - 30, this.angle * 6 - 90, x)
    this.endY = getYCoor(r - 30, this.angle * 6 - 90, y)
  }
  render() {
    ctx.beginPath()
    ctx.lineWidth = this.lineWidth
    ctx.moveTo(this.startX, this.startY)
    ctx.lineTo(this.endX, this.endY)
    ctx.stroke()
    ctx.closePath()
    if (this.textX && this.textY) {
      ctx.beginPath()
      const text = ctx.measureText(this.angle / 5)
      ctx.font = 'bold 30px Arial'
      ctx.textBaseline = 'middle'
      ctx.fillText(this.angle / 5, this.textX - text.width / 2, this.textY)
      ctx.closePath()
    }
  }
}

class Line {
  constructor(x, y, r, color) {
    this.r = r
    this.oldX = x
    this.oldY = y
    this.color = color
  }
  render() {
    ctx.save()
    ctx.beginPath()
    ctx.lineWidth = 4
    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.lineTo(this.x, this.y)
    ctx.strokeStyle = this.color
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }
}

class HourHand extends Line {
  constructor(...props) {
    super(...props)
  }
  update() {
    const hour = new Date().getHours()
    const minute = new Date().getMinutes()
    const m = (hour + minute / 60) * 5 - 15
    this.x = getXCoor(this.r, m * 6, this.oldX)
    this.y = getYCoor(this.r, m * 6, this.oldY)
    this.render()
  }
}

class MinuteHand extends Line {
  constructor(...props) {
    super(...props)
  }
  update() {
    const minute = new Date().getMinutes()
    const second = new Date().getSeconds()
    const m = (minute + second / 60) - 15
    this.x = getXCoor(this.r, m * 6, this.oldX)
    this.y = getYCoor(this.r, m * 6, this.oldY)
    this.render()
  }
}

class SecondHand extends Line {
  constructor(...props) {
    super(...props)
  }
  update() {
    const second = new Date().getSeconds()
    const m = second - 15
    this.x = getXCoor(this.r, m * 6, this.oldX)
    this.y = getYCoor(this.r, m * 6, this.oldY)
    this.render()
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
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }
}

class Clock {
  constructor() {
    this.x = width / 2
    this.y = height / 2
    this.r = 200
    
    // init
    this.scalePoints = new Array(60).fill().map((scalePoint, idx) => {
      return new ClockScale(this.x, this.y, this.r, idx)
    })
    this.face = new ClockFace()
    this.secondHand = new SecondHand(this.x, this.y, this.r - 100, 'red')
    this.minuteHand = new MinuteHand(this.x, this.y, this.r - 50)
    this.hourHand = new HourHand(this.x, this.y, this.r - 75)    
    this.update()
  }
  update() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.face.render()
    this.scalePoints.forEach((scalePoint) => {
      scalePoint.render()
    })
    this.secondHand.update()
    this.minuteHand.update()
    this.hourHand.update()
    requestAnimationFrame(() => {
      this.update()
    })
  }
}

new Clock()