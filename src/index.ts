import { unitSquare, scale, translate, rotateZ, planeToScreen, compose } from './math'
import { gridWidth, gridHeight, renderPolygon } from './render'

const transform = compose(
  scale(10, 10, 1),
  rotateZ(Math.PI / 6),
  translate([gridWidth / 2 - 5, gridHeight / 2 - 5, 0]),
  planeToScreen,
)

const vertices = unitSquare.map(transform)

renderPolygon(vertices)

const odd = [[0,0,0], [0,1,0], [1,2,0]]
renderPolygon(odd.map(compose(scale(10, 10, 1), planeToScreen)))
