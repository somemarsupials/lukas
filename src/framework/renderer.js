import { WebGLRenderer } from 'three';
import { BACKGROUND_COLOR } from './constants';

const getTargetElement = () => {
  return document.getElementById('three-target');
};

export const getContainerAspect = () => {
  const element = getTargetElement();
  const { height, width } = element.getBoundingClientRect();

  return { width, height };
};

export const setCameraAspect = (camera) => {
  const { width, height } = getContainerAspect();
  camera.aspect = width / height;
};

export const setRendererSize = (renderer) => {
  const { width, height } = getContainerAspect();
  renderer.setSize(width, height);
};

export const createRenderer = () => {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true
  });

  setRendererSize(renderer);
  renderer.setClearColor(BACKGROUND_COLOR, 0);
  return renderer;
};

export const mount = (renderer) => {
  const target = document.getElementById('three-target');
  target.appendChild(renderer.domElement);
};
