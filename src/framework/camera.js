import { PerspectiveCamera } from 'three';

export const createCamera = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new PerspectiveCamera(75, aspect, 0.1, 1000);

  camera.position.z = 12;
  return camera;
}
