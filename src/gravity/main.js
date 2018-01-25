import { getRandomRange } from '../../utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
let width = canvas.width = window.innerWidth
let height = canvas.height = window.innerHeight
const ceil = i => Math.ceil(i)
const random = i => Math.random() * i
const binRandom = () => Math.random() > 0.5 ? 1 : -1

let balls = []
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

class Ball {
  constructor(x, y, vx, vy, r, growth) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.r = r
    this.growth = growth
		this.alpha = 1
		this.color = colors[getRandomRange(1, colors.length - 1)].replace('x', this.alpha)
  }
  draw(c) {
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
		c.lineWidth = 3
    c.fillStyle = this.color
		c.fill()
    c.closePath()
  }
  update(c) {
    if (this.y + this.r + this.vy > height) {
			this.vy *= -0.9
		} else {
			this.vy += 2
		}
		if (Math.abs(this.vy) < 0.05) {
			this.vy = 0
		}
		if (this.x - width > 0 || this.x < 0) {
			this.vx *= -1
		}
		this.y += this.vy
		this.x += this.vx
    this.draw(c)
  }
}

const createBall = (x, y, vx, vy, r, growth = -1)  => new Ball(x, y, vx, vy, r, growth)

canvas.addEventListener('mousemove', function(e) {
  const { x, y } = e
  mouse = { x, y }
})

canvas.addEventListener('click', function(e) {
  balls.push(...new Array(20).fill().map(() => createBall(
		mouse.x,
		mouse.y,
		getRandomRange(-10, 10),
		getRandomRange(-25, 0),
		getRandomRange(10, 30)
	)))
})

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
})

new Array(200).fill().forEach(() => {
	balls.push(
		createBall(
			getRandomRange(0, width), 
			getRandomRange(0, height),
			getRandomRange(-2, 2),
			getRandomRange(-2, 2),
			getRandomRange(10, 30)
		)
	)
})

function animate() {
  c.fillStyle = '#333'
	c.fillRect(0, 0, width, height)
	
	if(balls.length > 300) {
		balls = balls.slice(100, balls.length)
	}
  
  balls.forEach((ball) => {
		ball.update(c)
  })
  
  window.requestAnimationFrame(animate)
}

animate()