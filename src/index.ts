const canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const SCREEN_INCREMENT = 8

const gridWidth = CANVAS_WIDTH / SCREEN_INCREMENT
const gridHeight = CANVAS_HEIGHT / SCREEN_INCREMENT

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

type Vector2D = [number, number]

type Transformation = (v: Vector2D) => Vector2D

const unitSquare: Vector2D[] = [[0,0], [0,1], [1,1], [1,0]]

const scale = (ax: number, ay: number) => ([x, y]: Vector2D): Vector2D => [ax * x, ay * y]

const translate = ([tx, ty]: Vector2D) => ([x, y]: Vector2D): Vector2D => [x + tx, y + ty]

const shearX = (l: number) => ([x, y]: Vector2D): Vector2D => [x + y*l, y]
const shearY = (l: number) => ([x, y]: Vector2D): Vector2D => [x, x*l + y]

const rotate = (rads: number) => ([x, y]: Vector2D): Vector2D => [x*Math.cos(rads) - y*Math.sin(rads), x*Math.sin(rads) + y*Math.cos(rads)]

const planeToScreen = ([gx, gy]: Vector2D): Vector2D => [gx * SCREEN_INCREMENT, CANVAS_HEIGHT - gy * SCREEN_INCREMENT]

const compose = (...ts: Transformation[]): Transformation => ts.reduce((acc, _t) => v => _t(acc(v)), v => v)

const transform = compose(
  scale(10, 10),
  shearX(2),
  shearY(1),
  rotate(Math.PI / 6),
  translate([gridWidth / 2 - 5, gridHeight / 2 - 5]),
  planeToScreen,
)

const vertices = unitSquare.map(transform)

ctx.fillStyle = 'blue'
ctx.beginPath()
ctx.moveTo(...vertices[0])
vertices.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
ctx.closePath()
ctx.fill()
