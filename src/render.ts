import { Polygon, magnitude, planeToScreen } from './math'

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

ctx.strokeStyle = '#fff'

export const renderPolygon = (vertices: Polygon) => {
  if (vertices.length < 3) return

  const projected = vertices.map(planeToScreen)

  ctx.beginPath()
  ctx.moveTo(projected[0][0], projected[0][1])
  projected.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
  ctx.lineTo(projected[0][0], projected[0][1])
  ctx.closePath()

  ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)'
  ctx.fill()
  ctx.stroke()
}

export const render = (polygons: Polygon[]) => {
  const sortedFurthest = polygons.sort((p1, p2) => {
    const zAvg1 = p1.reduce((acc, v) => acc + v[2], 0) / p1.length
    const zAvg2 = p2.reduce((acc, v) => acc + v[2], 0) / p2.length

    if (zAvg1 > zAvg2) {
      return -1
    }

    if (zAvg1 < zAvg2) {
      return 1
    }

    const mAvg1 = p1.reduce((acc, v) => acc + magnitude(v), 0) / p1.length
    const mAvg2 = p2.reduce((acc, v) => acc + magnitude(v), 0) / p2.length

    if (mAvg1 > mAvg2) {
      return -1
    }

    if (mAvg1 < mAvg2) {
      return 1
    }

    return 0
  })

  sortedFurthest.forEach(renderPolygon)
}
