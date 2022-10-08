import { Polygon } from './math'

export const canvas: HTMLCanvasElement = document.getElementById('root') as HTMLCanvasElement
export const ctx = canvas.getContext('2d')

export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 600
export const SCREEN_INCREMENT = 8
export const FOCAL_DIST = 50

export const gridWidth = CANVAS_WIDTH / SCREEN_INCREMENT
export const gridHeight = CANVAS_HEIGHT / SCREEN_INCREMENT

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

export const renderPolygon = (vertices: Polygon) => {
  if (vertices.length < 3) return

  ctx.beginPath()
  ctx.moveTo(vertices[0][0], vertices[0][1])
  vertices.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
  ctx.lineTo(vertices[0][0], vertices[0][1])
  ctx.closePath()

  ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)'
  ctx.fill()
}

export const render = (polygons: Polygon[]) => {
  const sortedFurthest = polygons.sort((p1, p2) => {
    const avg1 = p1.reduce((acc, v) => acc + v[2], 0) / 3
    const avg2 = p2.reduce((acc, v) => acc + v[2], 0) / 3

    if (avg1 > avg2) {
      return -1
    }

    if (avg1 < avg2) {
      return 1
    }

    return 0
  })

  sortedFurthest.forEach(renderPolygon)
}
