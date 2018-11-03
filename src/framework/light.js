import { Group, PointLight } from 'three';

const pointLight = (x, y, z) => {
  const light = new PointLight(0xffffff, 1, 100);
  light.position.set(x, y, z);
  return light;
};

export const createLight = () => {
  const group = new Group();
  group.add(pointLight(0, 0, 10));
  group.add(pointLight(-10, 0, 10));
  return group;
};
