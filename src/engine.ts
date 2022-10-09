import { Vector3D, Polygon } from './math'

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
