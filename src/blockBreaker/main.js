// 碰撞算法待解决啊啊啊啊
function intersects(a, b) {
  return !(
    b.y + b.r < a.y ||
    b.y - b.r > a.y + a.h ||
    b.x + b.r < a.x ||
    b.x - b.r > a.x + a.w
  )
}

function collide(a, b) {
  return intersects(a, b)
}

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
  drawRect(rect) {
    this.c.fillRect(rect.x, rect.y, rect.w, rect.h)
  }
  drawArc(arc) {
    this.c.beginPath()
    this.c.arc(arc.x, arc.y, arc.r, 0, Math.PI * 2)
    this.c.filStyle = '#ddd'
    this.c.fill()
    this.c.closePath()
  }
  animate() {
    this.c.clearRect(0, 0, game.width, game.height)
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

class Block {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.w = 50
    this.h = 20
    this.alive = true
  }
  kill() {
    this.alive = false
  }
  collide(ball) {
    return collide(this, ball) 
  }
}

class Ball {
  constructor() {
    this.r = 5
    this.x = 300
    this.y = 300
    this.vx = 3
    this.vy = -3
  }
  move(game) {
    if (this.x < 0 || this.x > 300) {
      this.vx *= -1
    }
    if (this.y < 0 || this.y > 400) {
      this.vy *= -1
    }
    this.x += this.vx
    this.y += this.vy
  }
  turnAround() {
    this.vy *= -1
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
  moveLeft(game) {
    if (this.x <= 0) return 
    this.x -= this.speed
  }
  moveRight(game) {
    if (this.x + this.w >= game.width) return
    this.x += this.speed
  }
  collide(ball) {
    return collide(this, ball)
  }
}

const __init__ = () => {
  game = new Game(document.querySelector('canvas'))
  paddle = new Paddle()
  ball = new Ball()
  blocks = new Array(50).fill().map((block, index) => {
    const blocksPerLine = 300 / 50
    const modulo = index % blocksPerLine
    const x = modulo * 50
    const y = parseInt(index / blocksPerLine, 10) * 20 + 10
    return new Block(x, y)
  })

  game.update = function() {
    ball.move()
    game.drawRect(paddle)
    game.drawArc(ball)
    if (paddle.collide(ball)) {
      ball.turnAround()
    }
    blocks = blocks.filter(block => {
      if (block.alive) {
        game.drawRect(block)
      }
      if (block.collide(ball)) {
        block.kill()
        ball.turnAround()
        return false
      }
      return true
    })
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