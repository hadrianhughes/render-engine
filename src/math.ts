import { Camera } from './engine'
import { CANVAS_HEIGHT, CANVAS_WIDTH, SCREEN_INCREMENT, FOCAL_DIST } from './render'

export type Vector2D = [number, number]
export type Vector3D = [number, number, number]

export type Polygon = Vector3D[]
export type Object3D = Polygon[]

export type Transformation = (v: Vector3D) => Vector3D

export const unitSquare: Polygon = [[0,0,0], [0,1,0], [1,1,0], [1,0,0]]

export const magnitude = ([x, y ,z]: Vector3D): number => Math.sqrt(x**2 + y**2 + z**2)

export const scale = (ax: number, ay: number, az: number): Transformation => ([x, y, z]) => [ax * x, ay * y, az * z]

export const translate = ([tx, ty, tz]: Vector3D): Transformation => ([x, y, z]) => [x + tx, y + ty, z + tz]

export const rotateX = (rads: number): Transformation => ([x, y, z]) => [
  x,
  y * Math.cos(rads) - z*Math.sin(rads),
  y * Math.sin(rads) + z*Math.cos(rads),
]

export const rotateY = (rads: number): Transformation => ([x, y, z]) => [
  x * Math.cos(rads) + z * Math.sin(rads),
  y,
  z * Math.cos(rads) - x * Math.sin(rads),
]

export const rotateZ = (rads: number): Transformation => ([x, y, z]) => [
  x * Math.cos(rads) - y*Math.sin(rads),
  x * Math.sin(rads) + y*Math.cos(rads),
  z,
]

export const projectToScreen = (camera: Camera) => ([gx, gy, gz]: Vector3D): Vector2D => {
  const cameraX = camera.position[0] * SCREEN_INCREMENT
  const cameraY = camera.position[1] * SCREEN_INCREMENT
  const cameraZ = camera.position[2] * SCREEN_INCREMENT

  const projMultiplier = FOCAL_DIST / (FOCAL_DIST + gz - cameraZ)

  const px = projMultiplier * gx * SCREEN_INCREMENT - cameraX
  const py = projMultiplier * gy * SCREEN_INCREMENT - cameraY

  return [CANVAS_WIDTH / 2 + px, CANVAS_HEIGHT / 2 - py]
}

export const compose = (...ts: Transformation[]): Transformation => ts.reduce((acc, _t) => v => _t(acc(v)), v => v)
