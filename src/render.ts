import { Camera, Object3D, EnrichedPolygon } from './engine'
import { magnitude, projectToScreen, compose, subtract, rotate } from './math'

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

export const renderPolygon = (camera: Camera) => ({ geometry, color }: EnrichedPolygon) => {
  if (geometry.length < 3) return

  const projected = geometry.map(projectToScreen(camera))

  ctx.beginPath()
  ctx.moveTo(projected[0][0], projected[0][1])
  projected.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
  ctx.lineTo(projected[0][0], projected[0][1])
  ctx.closePath()

  ctx.fillStyle = color
  ctx.strokeStyle = '#fff'
  ctx.fill()
  ctx.stroke()
}

export const render = (camera: Camera, objects: Object3D[]) => {
  canvas.width = CANVAS_WIDTH

  const polygons: EnrichedPolygon[] = objects
    .flatMap(o => o.geometry.map(p => ({
      geometry: p,
      cameraGeometry: p.map(compose(subtract(camera.position), rotate(-1 * camera.yaw, -1 * camera.pitch, 0))),
      color: o.color,
    })))

  const sortedFurthest = polygons.sort((p1, p2) => {
    const zAvg1 = p1.cameraGeometry.reduce((acc, v) => acc + v[2], 0) / p1.cameraGeometry.length
    const zAvg2 = p2.cameraGeometry.reduce((acc, v) => acc + v[2], 0) / p2.cameraGeometry.length

    if (zAvg1 > zAvg2) {
      return -1
    }

    if (zAvg1 < zAvg2) {
      return 1
    }

    const mAvg1 = p1.cameraGeometry.reduce((acc, v) => acc + magnitude(v), 0) / p1.cameraGeometry.length
    const mAvg2 = p2.cameraGeometry.reduce((acc, v) => acc + magnitude(v), 0) / p2.cameraGeometry.length

    if (mAvg1 > mAvg2) {
      return -1
    }

    if (mAvg1 < mAvg2) {
      return 1
    }

    return 0
  })

  sortedFurthest.forEach(renderPolygon(camera))
}
