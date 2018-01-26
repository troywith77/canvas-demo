class Game {
  constructor(canvas) {
    this.canvas = canvas
    this.c = this.canvas.getContext('2d') 
    this.width = this.canvas.width = 300
    this.height = this.canvas.height = 400
    this.actions = {}
    this.keydowns = {}
    this.gameover = false
  }
  animate() {
    this.update()
    Object.keys(this.actions).forEach((key) => {
      if (this.keydowns[key]) {
        this.actions[key](this)
      }
    })
    if (this.gameover) return
    window.requestAnimationFrame(this.animate.bind(this))    
  }
  registerAction(key, func) {
    this.actions[key] = func
  }
  handleEvents() {
    document.addEventListener('keydown', (e) => {
      this.keydowns[e.key] = true
    })
    document.addEventListener('keyup', (e) => {
      this.keydowns[e.key] = false
    })
  }
  init() {
    this.handleEvents()
    this.animate()
  }
  over() {
    this.gameover = true
  }
}

class Ball {
  constructor() {
    this.r = 5
    this.x = 20
    this.y = 20
    this.vx = 3
    this.vy = -3
  }
  move(game) {
    if (this.x < 0 || this.x > game.width) {
      this.vx *= -1
    }
    if (this.y < 0 || this.y > game.height) {
      this.vy *= -1
    }
    this.x += this.vx
    this.y += this.vy
    this.draw(game)
  }
  draw(game) {
    const { c } = game
    c.beginPath()
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    c.filStyle = '#ddd'
    c.fill()
    c.closePath()
  }
}

class Paddle {
  constructor() {
    this.x = 100
    this.y = 320
    this.w = 80
    this.h = 15
    this.speed = 5
    this.leftPressed = false
    this.rightPressed = false
  }
  draw(game) {
    game.c.fillRect(this.x, this.y, this.w, this.h)
  }
  moveLeft(game) {
    if (this.x <= 0) return 
    this.x -= this.speed
    this.draw(game)
  }
  moveRight(game) {
    if (this.x + this.w >= game.width) return
    this.x += this.speed
    this.draw(game)
  }
  collide(ball) {
    if (Math.abs(this.y - ball.y) < ball.r && Math.abs(this.x - ball.x) < this.w) {
      return true
    }
  }
}

const __init__ = () => {
  game = new Game(document.querySelector('canvas'))
  paddle = new Paddle()
  ball = new Ball()

  game.update = function() {
    game.c.clearRect(0, 0, game.width, game.height)
    paddle.draw(game)
    ball.move(game)
    if (paddle.collide(ball)) {
      ball.vy *= -1
    }
    if (ball.y > paddle.y + paddle.h) {
      game.over()
      alert('game over')
    }
  }
  
  game.registerAction('a', (...args) => {
    paddle.moveLeft(...args)
  })
  game.registerAction('d', (...args) => {
    paddle.moveRight(...args)
  })
  game.init()
}

__init__()