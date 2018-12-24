import { WebGLRenderer } from 'three';
import { BACKGROUND_COLOR } from './constants';

export const createRenderer = () => {
  const renderer = new WebGLRenderer({
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(BACKGROUND_COLOR, 1);
  return renderer;
};

export const mount = (renderer) => {
  const target = document.getElementById('three-target');
  target.appendChild(renderer.domElement);
};
