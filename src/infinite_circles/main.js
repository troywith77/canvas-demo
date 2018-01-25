const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight
const ceil = i => Math.ceil(i)
const random = i => Math.random() * i
const binRandom = () => Math.random() > 0.5 ? 1 : -1

let circles = []
let mouse = {
  x: width / 2,
  y: height / 2
}
const colors = [
  'rgba(252, 190, 0, x)',
  'rgba(254, 251, 208, x)',
  'rgba(255, 129, 0, x)',
  'rgba(253, 207, 183, x)',
  'rgba(244, 130, 140, x)',
  'rgba(255, 47, 0, x)'
]

class Circle {
  constructor(x, y, vx, vy, r, growth) {
    this.x = x
    this.y = y
    this.vx = random(vx) * binRandom()
    this.vy = random(vy) * binRandom()
    this.r = r
    this.growth = growth
    this.alpha = 1
  }
  draw(c) {
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    c.lineWidth = 3
    c.strokeStyle = colors[0].replace('x', this.alpha)
    c.stroke()
    c.closePath()
  }
  update(c) {
    this.x += this.vx
    this.y += this.vy
    this.r += this.growth
    this.alpha -= 0.03
    this.draw(c)
  }
}

const createShrinkCircle = (x, y, vx = 6, vy = 6, r = 50, growth = -1)  => new Circle(x, y, vx, vy, r, growth)

const createExpandingCircle = (x, y, vx = 0, vy = 0, r = 50, growth = 20) => new Circle(x, y, vx, vy, r, growth)

canvas.addEventListener('mousemove', function(e) {
  const { x, y } = e
  mouse = { x, y }
})

canvas.addEventListener('click', function(e) {
  colors.push(colors.shift())
  circles.push(createExpandingCircle(mouse.x, mouse.y))
})

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
})

function animate() {
  c.fillStyle = '#222'
  c.fillRect(0, 0, width, height)

  circles.push(createShrinkCircle(mouse.x, mouse.y))
  
  circles = circles.filter((circle) => {
    circle.update(c)
    return (circle.alpha <= 0 || circle.r > width) ? false : true
  })
  
  window.requestAnimationFrame(animate)
}

animate()