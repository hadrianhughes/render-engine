import { Inputs } from './input'
import { compose, Vector3D, Polygon, add, subtract, Transformation, rotateX, rotateY } from './math'

export type Camera = {
  position: Vector3D;
  yaw: number;
  pitch: number;
  roll: number;
}

export type Object3D = {
  geometry: Polygon[];
  color: string;
}

export type EnrichedPolygon = {
  geometry: Polygon;
  cameraGeometry: Polygon;
  color: string;
}

export type AppState = {
  camera: Camera;
  objects: Object3D[];
}

export const SPEED = 0.3
export const ROTATION = Math.PI / 100

const nextRotation = (inputPositive: boolean, inputNegative: boolean, current: number): number => {
  if (inputPositive && !inputNegative) return current + ROTATION

  if (inputNegative && !inputPositive) return current - ROTATION

  return current
}

export const update = (state: AppState, inputs: Inputs): AppState => {
  const _yaw = nextRotation(inputs.ArrowLeft, inputs.ArrowRight, state.camera.yaw)
  const _pitch = nextRotation(inputs.ArrowUp, inputs.ArrowDown, state.camera.pitch)

  const cameraTransforms: Transformation[] = []

  const fromCamera = (t: Transformation) => compose(
    subtract(state.camera.position),
    rotateY(_yaw),
    rotateX(_pitch),
    t,
    rotateX(-1 * _pitch),
    rotateY(-1 * _yaw),
    add(state.camera.position),
  )

  if (inputs.KeyW) cameraTransforms.push(fromCamera(add([0, 0, SPEED])))
  
  if (inputs.KeyS) cameraTransforms.push(fromCamera(subtract([0, 0, SPEED])))

  if (inputs.KeyA) cameraTransforms.push(fromCamera(subtract([SPEED, 0, 0])))

  if (inputs.KeyD) cameraTransforms.push(fromCamera(add([SPEED, 0, 0])))

  if (inputs.ShiftLeft) cameraTransforms.push(subtract([0, SPEED, 0]))

  if (inputs.Space) cameraTransforms.push(add([0, SPEED, 0]))

  const _position = compose(...cameraTransforms)(state.camera.position)

  return {
    ...state,
    camera: {
      position: _position,
      yaw: _yaw,
      pitch: _pitch,
      roll: state.camera.roll,
    },
  }
}
