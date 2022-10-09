import { Vector3D, Polygon, rotateY } from './math'

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
  color: string;
}

export type AppState = {
  camera: Camera;
  objects: Object3D[];
}

export const update = (state: AppState): AppState => ({
  ...state,
  objects: state.objects.map(o => ({
    color: o.color,
    geometry: o.geometry.map(p => p.map(rotateY(Math.PI / 50))),
  }))
})
