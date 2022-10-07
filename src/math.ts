import { CANVAS_HEIGHT, CANVAS_WIDTH, SCREEN_INCREMENT } from './render'

export type Vector2D = [number, number]
export type Vector3D = [number, number, number]

export type Transformation = (v: Vector3D) => Vector3D

export const unitSquare: Vector3D[] = [[0,0,0], [0,1,0], [1,1,0], [1,0,0]]

export const scale = (ax: number, ay: number, az: number): Transformation => ([x, y, z]) => [ax * x, ay * y, az * z]

export const translate = ([tx, ty, tz]: Vector3D): Transformation => ([x, y, z]) => [x + tx, y + ty, z + tz]

export const rotateX = (rads: number): Transformation => ([x, y, z]) => [
  x,
  y * Math.cos(rads) - z*Math.sin(rads),
  y * Math.sin(rads) + z*Math.cos(rads),
]

export const rotateY = (rads: number): Transformation => ([x, y, z]) => [
  x * Math.cos(rads) + z*Math.sin(rads),
  y,
  z * Math.cos(rads) - x*Math.sin(rads),
]

export const rotateZ = (rads: number): Transformation => ([x, y, z]) => [
  x * Math.cos(rads) - y*Math.sin(rads),
  x * Math.sin(rads) + y*Math.cos(rads),
  z,
]

export const planeToScreen = ([gx, gy, gz]: Vector3D): Vector3D => [
  CANVAS_WIDTH / 2 + gx * SCREEN_INCREMENT,
  CANVAS_HEIGHT / 2 - gy * SCREEN_INCREMENT,
  gz * SCREEN_INCREMENT,
]

export const compose = (...ts: Transformation[]): Transformation => ts.reduce((acc, _t) => v => _t(acc(v)), v => v)
