import { random, range } from 'lodash';
import { Vector3 } from 'three';

export const getRandomPoint = (radius) => {
  const theta = random(0, Math.PI, false);
  const phi = random(0, 2 * Math.PI, false);

  return new Vector3(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta),
  );
};

export const jitter = (vector) => {
  ['x', 'y', 'z'].forEach(axis => {
    vector[axis] += random(-0.5, 0.5, false);
  });

  return vector;
};

export const getSphericalVertices = ({ points, radius, jitter }) => {
  return range(points).map(index => getRandomPoint(radius));
};
