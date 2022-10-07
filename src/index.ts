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
type Matrix2x2 = [number, number, number, number]

const unitSquare: Vector2D[] = [[0,0], [0,1], [1,0], [1,1]]

const scale = ([a, b, c, d]: Matrix2x2) => ([x, y]: Vector2D): Vector2D => [a*x + b*y, c*x + d*y]

const translate = ([tx, ty]: Vector2D) => ([x, y]: Vector2D): Vector2D => [x + tx, y + ty]

const planeToScreen = ([gx, gy]: Vector2D): Vector2D => [gx * SCREEN_INCREMENT, CANVAS_HEIGHT - gy * SCREEN_INCREMENT]

const vertices = unitSquare
  .map(scale([10, 0, 0, 10]))
  .map(translate([gridWidth / 2 - 5, gridHeight / 2 - 5]))
  .map(planeToScreen)

ctx.fillStyle = 'blue'
ctx.fillRect(vertices[0][0], vertices[2][1], vertices[3][0] - vertices[1][0], vertices[1][1] - vertices[0][1])
