import { Inputs } from './input'
import { compose, Vector3D, Polygon, add, subtract, Transformation, rotateX, rotateY, multiply } from './math'

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

const keyDirectionChanges: { [key in KeyboardEvent['code']]: Vector3D } = {
  'KeyW': [0, 0, 1],
  'KeyS': [0, 0, -1],
  'KeyA': [-1, 0, 0],
  'KeyD': [1, 0, 0],
  'KeyX': [0, -1, 0],
  'Space': [0, 1, 0],
}

const nextRotation = (inputPositive: boolean, inputNegative: boolean, current: number): number => {
  if (inputPositive && !inputNegative) return current + ROTATION

  if (inputNegative && !inputPositive) return current - ROTATION

  return current
}

export const update = (state: AppState, inputs: Inputs): AppState => {
  const _yaw = nextRotation(inputs.ArrowLeft, inputs.ArrowRight, state.camera.yaw)
  const _pitch = nextRotation(inputs.ArrowUp, inputs.ArrowDown, state.camera.pitch)

  const fromCamera = (t: Transformation) => compose(
    subtract(state.camera.position),
    rotateY(_yaw),
    rotateX(_pitch),
    t,
    rotateX(-1 * _pitch),
    rotateY(-1 * _yaw),
    add(state.camera.position),
  )

  const cameraTransforms: Transformation[] =
    Object.keys(keyDirectionChanges)
      .reduce((acc, key) => {
        if (inputs[key]) {
          const change = add(multiply(SPEED)(keyDirectionChanges[key]))
          if (['KeyX', 'Space'].includes(key)) {
            return [...acc, change]
          }

          return [...acc, fromCamera(change)]
        }

        return acc
      }, [])

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
