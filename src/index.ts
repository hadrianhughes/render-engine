import { InputManager } from '@lib/input'
import { AppState, Camera, Object3D, update } from '@lib/engine'
import { primitives } from '@lib/models'
import { compose, rotateX, rotateY, scale, add } from '@lib/math'
import { render } from '@lib/render'

const debugMode = process.env.DEBUG_MODE

const cube: Object3D = {
  geometry: primitives.cube.map(p => p.map(
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
  geometry: primitives.cube.map(p => p.map(
    compose(
      scale(15, 10, 10),
      add([0, 5, 25]),
    )
  )),
  color: 'blue',
}

const pyramid: Object3D = {
  geometry: primitives.pyramid.map(p => p.map(
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

function updateDebugInfo(state: AppState) {
  document.getElementById('info').style.display = 'block'
  document.getElementById('position').innerHTML = `Position: [${Math.round(state.camera.position[0] * 100) / 100}, ${Math.round(state.camera.position[1] * 100) / 100}, ${Math.round(state.camera.position[2] * 100) / 100}]`
  document.getElementById('yaw').innerHTML = `Yaw: ${Math.trunc(state.camera.yaw * 180/Math.PI)}&deg;`
  document.getElementById('pitch').innerHTML = `Pitch: ${Math.trunc(state.camera.pitch * 180/Math.PI)}&deg;`
}

function loop() {
  const inputManager = new InputManager()

  const initialState: AppState = { camera, objects: [cube, cuboid, pyramid] }

  function _loop(state: AppState) {
    render(state.camera, state.objects)

    if (debugMode) updateDebugInfo(state)

    const nextState = update(state, inputManager.inputs)

    requestAnimationFrame(() => _loop(nextState))
  }

  _loop(initialState)
}

loop()
