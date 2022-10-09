import { Camera } from './engine'
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

const unitPyramid: Object3D = [
  unitSquare.map(rotateX(Math.PI / 2)),
  [[0,0,0], [0,0,1], [1/2, Math.sqrt(2)/2, 1/2]],
  [[0,0,0], [1,0,0], [1/2, Math.sqrt(2)/2, 1/2]],
  [[1,0,0], [1,0,1], [1/2, Math.sqrt(2)/2, 1/2]],
  [[0,0,1], [1,0,1], [1/2, Math.sqrt(2)/2, 1/2]],
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

const pyramid: Object3D = unitPyramid.map(p => p.map(
  compose(
    rotateY(Math.PI / -3),
    rotateX(Math.PI / -6),
    scale(10, 10, 10),
    translate([15, -10, 0]),
  )
))

const camera: Camera = {
  position: [10, 0, 2],
  xyAngle: 0,
  xzAngle: 0,
}

render(camera, [...cube, ...cuboid, ...pyramid])
