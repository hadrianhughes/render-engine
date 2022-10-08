import { unitSquare, Object3D, compose, rotateX, rotateY, scale, translate } from './math'
import { render } from './render'

const unitCube: Object3D = [
  unitSquare, // front
  unitSquare.map(rotateY(Math.PI / -2)), // left
  unitSquare.map(compose(rotateY(Math.PI / -2), translate([1, 0, 0]))), // right
  unitSquare.map(translate([0, 0, 1])), // back
  unitSquare.map(rotateX(Math.PI / 2)), // bottom
  unitSquare.map(compose(rotateX(Math.PI / 2), translate([0, 1, 0]))), // top
]

const cube: Object3D = unitCube.map(p => p.map(
  compose(
    rotateX(Math.PI / 8),
    rotateY(Math.PI / 4),
    scale(10, 10, 10),
    translate([10, 10, 0]),
  )
))

const cuboid: Object3D = unitCube.map(p => p.map(
  compose(
    rotateY(Math.PI / 6),
    scale(15, 10, 10),
    translate([0, 5, 25]),
  )
))

render([...cube, ...cuboid])
