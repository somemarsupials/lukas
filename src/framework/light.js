import { Group, PointLight } from 'three';

const pointLight = (x, y, z) => {
  const light = new PointLight(0xffffff, 2, 100);
  light.position.set(x, y, z);
  return light;
};

export const createLight = () => {
  const group = new Group();
  group.add(pointLight(-2, 2, 10));
  return group;
};
