import { InputManager } from './input'
import { AppState, Camera, Object3D, update } from './engine'
import { unitSquare, compose, rotateX, rotateY, scale, add, Polygon } from './math'
import { render } from './render'

const unitCube: Polygon[] = [
  unitSquare, // front
  unitSquare.map(rotateY(Math.PI / -2)), // left
  unitSquare.map(compose(rotateY(Math.PI / -2), add([1, 0, 0]))), // right
  unitSquare.map(add([0, 0, 1])), // back
  unitSquare.map(rotateX(Math.PI / 2)), // bottom
  unitSquare.map(compose(rotateX(Math.PI / 2), add([0, 1, 0]))), // top
]

const unitPyramid: Polygon[] = [
  unitSquare.map(rotateX(Math.PI / 2)),
  [[0,0,0], [0,0,1], [1/2, Math.sqrt(2)/2, 1/2]],
  [[0,0,0], [1,0,0], [1/2, Math.sqrt(2)/2, 1/2]],
  [[1,0,0], [1,0,1], [1/2, Math.sqrt(2)/2, 1/2]],
  [[0,0,1], [1,0,1], [1/2, Math.sqrt(2)/2, 1/2]],
]

const cube: Object3D = {
  geometry: unitCube.map(p => p.map(
    compose(
      rotateX(Math.PI / 8),
      rotateY(Math.PI / 4),
      scale(10, 10, 10),
      add([10, 10, 0]),
    )
  )),
  color: 'red',
}

const cuboid: Object3D = {
  geometry: unitCube.map(p => p.map(
    compose(
      rotateY(Math.PI / 6),
      scale(15, 10, 10),
      add([0, 5, 25]),
    )
  )),
  color: 'blue',
}

const pyramid: Object3D = {
  geometry: unitPyramid.map(p => p.map(
    compose(
      rotateY(Math.PI / -3),
      rotateX(Math.PI / -6),
      scale(10, 10, 10),
      add([15, -10, 0]),
    )
  )),
  color: 'green',
}

const camera: Camera = {
  position: [0, 0, 0],
  yaw: 0,
  pitch: 0,
  roll: 0,
}

function loop() {
  const inputManager = new InputManager()

  const initialState: AppState = { camera, objects: [cube, cuboid, pyramid] }

  function _loop(state: AppState) {
    render(state.camera, state.objects)

    document.getElementById('position').innerHTML = `Position: [${Math.round(state.camera.position[0] * 100) / 100}, ${Math.round(state.camera.position[1] * 100) / 100}, ${Math.round(state.camera.position[2] * 100) / 100}]`
    document.getElementById('yaw').innerHTML = `Yaw: ${Math.trunc(state.camera.yaw * 180/Math.PI)}&deg;`
    document.getElementById('pitch').innerHTML = `Pitch: ${Math.trunc(state.camera.pitch * 180/Math.PI)}&deg;`

    const nextState = update(state, inputManager.inputs)

    requestAnimationFrame(() => _loop(nextState))
  }

  _loop(initialState)
}

loop()
