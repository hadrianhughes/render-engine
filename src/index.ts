import { unitSquare, scale, rotateZ, planeToScreen, compose } from './math'
import { renderPolygon } from './render'

const transform = compose(
  scale(10, 10, 1),
  rotateZ(Math.PI / 6),
  planeToScreen,
)

const vertices = unitSquare.map(transform)

renderPolygon(vertices)
