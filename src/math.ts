import { CANVAS_HEIGHT, SCREEN_INCREMENT } from './index'

export type Vector2D = [number, number]

export type Transformation = (v: Vector2D) => Vector2D

export const unitSquare: Vector2D[] = [[0,0], [0,1], [1,1], [1,0]]

export const scale = (ax: number, ay: number) => ([x, y]: Vector2D): Vector2D => [ax * x, ay * y]

export const translate = ([tx, ty]: Vector2D) => ([x, y]: Vector2D): Vector2D => [x + tx, y + ty]

export const shearX = (l: number) => ([x, y]: Vector2D): Vector2D => [x + y*l, y]
export const shearY = (l: number) => ([x, y]: Vector2D): Vector2D => [x, x*l + y]

export const rotate = (rads: number) => ([x, y]: Vector2D): Vector2D => [x*Math.cos(rads) - y*Math.sin(rads), x*Math.sin(rads) + y*Math.cos(rads)]

export const planeToScreen = ([gx, gy]: Vector2D): Vector2D => [gx * SCREEN_INCREMENT, CANVAS_HEIGHT - gy * SCREEN_INCREMENT]

export const compose = (...ts: Transformation[]): Transformation => ts.reduce((acc, _t) => v => _t(acc(v)), v => v)
