import { Vector3D } from './math'

export const canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement
export const ctx = canvas.getContext('2d')

export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 600
export const SCREEN_INCREMENT = 8

export const gridWidth = CANVAS_WIDTH / SCREEN_INCREMENT
export const gridHeight = CANVAS_HEIGHT / SCREEN_INCREMENT

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

ctx.fillStyle = '#d8d8d8'

export const renderPolygon = (ps: Vector3D[]) => {
  if (ps.length < 3) return

  ctx.beginPath()
  ctx.moveTo(ps[0][0], ps[0][1])
  ps.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
  ctx.closePath()
  ctx.fill()
}
