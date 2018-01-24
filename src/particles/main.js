const plusRadius = document.querySelector('#plus-radius')
		const minusRadius = document.querySelector('#minus-radius')
		const canvas = document.querySelector('canvas')
		const c = canvas.getContext('2d')
		const width = canvas.width = window.innerWidth
		const height = canvas.height = window.innerHeight
		const random = i => Math.random() * i
		const binRandom = () => Math.random() > 0.5 ? 1 : -1

		const particleNumber = parseInt(prompt('How many particles would you like to show?', '500'), 10)
		let particles

		class Particle {
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
				if (this.x > width || this.x < 0) {
					this.vx *= -1
				}
				if (this.y > height || this.y < 0) {
					this.vy *= -1
				}
				this.draw(c)
			}
		}

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