import { Group } from 'three';
import { createWireframe } from './wireframe';
import { createVertices, VertexManager } from './vertices';

export const createObjectGroup = (vertices) => {
  const group = new Group();
  group.add(createWireframe(vertices));

  const vertexObjects = createVertices(vertices)
  group.manager = new VertexManager(vertexObjects);

  vertexObjects.forEach(vertex => {
    group.add(vertex);
  });

  return group;
};
