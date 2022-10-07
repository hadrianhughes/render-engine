import { unitSquare, scale, rotateZ, translate, planeToScreen, compose } from './math'
import { renderPolygon } from './render'

const transform = compose(
  scale(10, 10, 1),
  rotateZ(Math.PI / 6),
  planeToScreen,
)

const vertices = unitSquare.map(transform)

renderPolygon(vertices)

const odd = [[0,0,1], [0,1,1], [1,2,1]]
renderPolygon(
  odd.map(
    compose(scale(10, 10, 1), translate([-20, -20, 0]), planeToScreen)
  )
)
