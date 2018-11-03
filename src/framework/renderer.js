import { WebGLRenderer } from 'three';

export const createRenderer = () => {
  const renderer = new WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
};

export const mount = (renderer) => {
  const target = document.getElementById('three-target');
  target.appendChild(renderer.domElement);
};
