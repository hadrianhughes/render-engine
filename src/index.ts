import { Object3D, compose, planeToScreen, rotateY, scale } from './math'
import { renderPolygon } from './render'

const cube: Object3D = [
  [[0,0,0], [0,1,0], [1,1,0], [1,0,0]], // front
  [[0,0,0], [0,1,0], [0,0,1], [0,1,1]], // left
  [[1,0,0], [1,1,0], [1,1,1], [1,0,1]], // right
  [[0,0,1], [0,1,1], [1,1,1], [1,0,1]], // rear
  [[0,1,0], [0,1,1], [1,1,1], [1,1,0]], // top
  [[0,0,0], [0,0,1], [1,0,1], [1,0,0]], // bottom
]

const transform = compose(
  rotateY(Math.PI / 4),
  scale(10, 10, 10),
  planeToScreen,
)

const _cube: Object3D = cube.map(p => p.map(transform))

_cube.map(renderPolygon)
