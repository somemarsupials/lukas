import { Group } from 'three';

import { createWireframe } from './wireframe';
import { createVertices, VertexManager } from './vertices';

const getMesh = (vertex) => vertex.mesh;

export const createObjectGroup = (vertices, projects) => {
  const group = new Group();

  projects.forEach((project, index) => { 
    vertices[index].__project = project
  });

  group.add(createWireframe(vertices));

  const vertexObjects = createVertices(vertices)
  group.manager = new VertexManager(vertexObjects.map(getMesh));

  vertexObjects.forEach(({ mesh, label }) => {
    group.add(mesh);
    if (label) group.add(label);
  });

  return group;
};
