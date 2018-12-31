import { Group } from 'three';
import { createWireframe } from './wireframe';
import { createVertices, VertexManager } from './vertices';

const getMesh = (vertex) => vertex.mesh;

export const createObjectGroup = (vertices) => {
  const group = new Group();
  group.add(createWireframe(vertices));

  const vertexObjects = createVertices(vertices)
  group.manager = new VertexManager(vertexObjects.map(getMesh));

  vertexObjects.forEach(({ mesh, label }) => {
    group.add(mesh);
    group.add(label);
  });

  return group;
};
