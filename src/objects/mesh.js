import {
  AdditiveBlending,
  Geometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereGeometry,
  Vector3
} from 'three';

import { getSphericalPoints } from '../lib';
import { ConvexGeometry } from '../three';

// wireframe

const createWireframeMaterial = () => {
  return new MeshBasicMaterial({
    color: 0xbbbbbb,
    wireframe: true,
  });
};

const createWireframeGeometry = (spherePoints) => {
  return new ConvexGeometry(spherePoints);
};

const createWireframe = (points) => {
  return new Mesh(createWireframeGeometry(points), createWireframeMaterial());
};

// sphere array

const createSphereMaterial = () => {
  return new MeshLambertMaterial({ color: 0xffffff });
};

const createSphereGeometry = (position) => {
  return new SphereGeometry(0.05);
};

const createSphere = (position) => {
  const mesh = new Mesh(
    createSphereGeometry(position),
    createSphereMaterial()
  );

  mesh.position.set(position.x, position.y, position.z);
  return mesh;
};

const createSpheres = (positions) => {
  return positions.map(set => createSphere(set));
};

// assemblage

export const createObjectGroup = ({ points, radius }) => {
  const group = new Group();
  const vertices = getSphericalPoints({ radius, points });

  group.add(createWireframe(vertices));
  createSpheres(vertices).forEach(sphere => group.add(sphere));
  return group;
};
