import {
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
} from 'three';

import { setProject } from '../lib';
import { COLOURS, SIZES } from './constants';
import { createLabel } from './label';

const createVertexMaterial = () => {
  return new MeshLambertMaterial({ color: COLOURS.VERTEX });
};

const createVertexGeometry = () => {
  return new SphereGeometry(SIZES.VERTEX_RADIUS, 10, 10);
};

const createLabelIfProjectExists = (point) => {
  const project = point.__project;

  if (project) {
    return createLabel(project.title, point.toArray());
  };
};

const createVertex = (point) => {
  const mesh = new Mesh(createVertexGeometry(), createVertexMaterial());
  mesh.__project = point.__project;
  mesh.position.set(...point.toArray());

  const label = createLabelIfProjectExists(point);
  return { mesh, label };
};

export const createVertices = (points) => {
  return points.map(createVertex);
};

export class VertexManager {
  constructor(vertices, setProject) {
    this.vertices = vertices;
    this.selected = null;
    this.highlighted = null;
  };

  select(id = null) {
    if (this.hasId(id)) {
      setProject(this.getId(id).__project);
      this.selected = id;
    }
  };

  highlight(id = null) {
    if (this.hasId(id)) {
      this.highlighted = id;
    } else {
      this.highlighted = null;
    };
  };

  _iterate(id, selector) {
    const reducer = (start, vertex) => start || selector(vertex)
    return this.vertices.reduce(reducer, false)
  };

  getId(id = null) {
    return this._iterate(id, vertex => vertex.id === id ? vertex : null)
  };

  hasId(id) {
    return this._iterate(id, vertex => vertex.id === id)
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
