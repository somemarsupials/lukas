import {
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
} from 'three';

import { COLOURS, SIZES } from './constants';
import { createLabel } from './label';

const createVertexMaterial = () => {
  return new MeshLambertMaterial({ color: COLOURS.VERTEX });
};

const createVertexGeometry = () => {
  return new SphereGeometry(SIZES.VERTEX_RADIUS, 10, 10);
};

const createVertex = (point) => {
  const mesh = new Mesh(createVertexGeometry(), createVertexMaterial());
  const label = createLabel('label', point.toArray());
  mesh.position.set(...point.toArray());


  return { mesh, label };
};

export const createVertices = (points) => {
  return points.map(point => createVertex(point));
};

export class VertexManager {
  constructor(vertices) {
    this.vertices = vertices;
    this.selected = null;
    this.highlighted = null;
  };

  select(id = null) {
    if (this.hasId(id)) this.selected = id;
  };

  highlight(id = null) {
    if (this.hasId(id)) {
      this.highlighted = id;
    } else {
      this.highlighted = null;
    };
  };

  hasId(id) {
    return this.vertices.reduce((start, vertex) => {
      return start || vertex.id === id
    }, false);
  };

  getColour(id) {
    switch (id) {
      case this.selected:
        return COLOURS.VERTEX_SELECTED;
      case this.highlighted:
        return COLOURS.VERTEX_HIGHLIGHTED;
      default:
        return COLOURS.VERTEX;
    };
  };

  paint() {
    this.vertices.forEach(object => {
      if (this.hasId(object.id)) {
        object.material.color.setHex(this.getColour(object.id));
      };
    });
  };
};
