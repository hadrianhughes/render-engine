import OBJFile from 'obj-file-parser'
import { Polygon, Vector3D } from '@lib/math'
import cubeFile from '@models/cube.obj'

export const loadModel = (file: string): Polygon[] => {
  const { models } = new OBJFile(file).parse()
  if (models.length === 0) {
    throw new Error(`No models declared in file:\n${file}`)
  }

  const { faces, vertices } = models[0]
  const _vertices: Vector3D[] = vertices.map(({ x, y, z }) => [x, y, z])

  return faces.map(
    ({ vertices: vs }) => vs.map(({ vertexIndex }) => _vertices[vertexIndex - 1])
  )
}

export const primitives = {
  cube: loadModel(cubeFile),
}
