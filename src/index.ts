import { unitSquare, scale, translate, rotateZ, planeToScreen, compose } from './math'

const canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 600
export const SCREEN_INCREMENT = 8

const gridWidth = CANVAS_WIDTH / SCREEN_INCREMENT
const gridHeight = CANVAS_HEIGHT / SCREEN_INCREMENT

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT


const transform = compose(
  scale(10, 10, 1),
  rotateZ(Math.PI / 6),
  translate([gridWidth / 2 - 5, gridHeight / 2 - 5, 0]),
  planeToScreen,
)

const vertices = unitSquare.map(transform)

ctx.fillStyle = 'blue'
ctx.beginPath()
ctx.moveTo(vertices[0][0], vertices[0][1])
vertices.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
ctx.closePath()
ctx.fill()
