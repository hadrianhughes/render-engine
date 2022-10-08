import { unitSquare, Object3D, compose, planeToScreen, rotateX, rotateY, scale, translate } from './math'
import { render } from './render'

const cube: Object3D = [
  unitSquare, // front
  unitSquare.map(rotateY(Math.PI / -2)), // left
  unitSquare.map(compose(rotateY(Math.PI / -2), translate([1, 0, 0]))), // right
  unitSquare.map(translate([0, 0, 1])), // back
  unitSquare.map(rotateX(Math.PI / 2)), // bottom
  unitSquare.map(compose(rotateX(Math.PI / 2), translate([0, 1, 0]))), // top
]

const transform = compose(
  //rotateY(Math.PI / 4),
  scale(10, 10, 10),
  translate([15, 10, 0]),
  planeToScreen,
)

const _cube: Object3D = cube.map(p => p.map(transform))

render([ ..._cube ])
