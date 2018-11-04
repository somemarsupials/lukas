import { MeshBasicMaterial, Mesh } from 'three';
import { ConvexGeometry } from '../three';
import { COLOURS } from './constants';

const createWireframeMaterial = () => {
  return new MeshBasicMaterial({
    color: COLOURS.FRAME,
    wireframe: true,
  });
};

const createWireframeGeometry = (points) => {
  return new ConvexGeometry(points);
};

export const createWireframe = (points) => {
  return new Mesh(createWireframeGeometry(points), createWireframeMaterial());
};

