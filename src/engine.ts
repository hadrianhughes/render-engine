import { Vector3D } from './math'

export type Camera = {
  position: Vector3D;
  yaw: number;
  pitch: number;
  roll: number;
}
