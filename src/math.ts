import { Camera } from './engine'
import { CANVAS_HEIGHT, CANVAS_WIDTH, SCREEN_INCREMENT, FOCAL_DIST } from './render'

export type Vector2D = [number, number]
export type Vector3D = [number, number, number]

export type Polygon = Vector3D[]

export type Transformation = (v: Vector3D) => Vector3D

export const unitSquare: Polygon = [[0,0,0], [0,1,0], [1,1,0], [1,0,0]]

export const magnitude = ([x, y ,z]: Vector3D): number => Math.sqrt(x**2 + y**2 + z**2)

export const scale = (ax: number, ay: number, az: number): Transformation => ([x, y, z]) => [ax * x, ay * y, az * z]
export const multiply = (a: number): Transformation => scale(a, a, a)


export const add = ([a, b, c]: Vector3D): Transformation => ([x, y, z]) => [x + a, y + b, z + c]
export const subtract = ([a, b, c]: Vector3D): Transformation => ([x, y, z]) => [x - a, y - b, z - c]

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

export const rotate = (yaw: number, pitch: number, roll: number): Transformation =>
  compose(rotateX(pitch), rotateY(yaw), rotateZ(roll))

export const compose = (...ts: Transformation[]): Transformation => ts.reduce((acc, _t) => v => _t(acc(v)), v => v)

export const affine =
  (translation: Vector3D, yaw: number, pitch: number, roll: number) =>
  (t: Transformation): Transformation => compose(
    add(translation),
    rotate(yaw, pitch, roll),
    t,
    rotate(-1 * yaw, -1 * pitch, -1 * roll),
    subtract(translation)
  )
