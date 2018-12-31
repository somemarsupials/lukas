import {
  createCamera,
  createLight,
  createRenderer,
  createScene,
  mount
} from './framework';

import {
  createObjectGroup,
  getEventListener,
} from './objects';

import { getSphericalVertices } from './lib';
import { SIZES } from './objects';
import { TrackballControls } from './three';

const initialise = () => {
  const camera = createCamera();
  const scene = createScene();
  const light = createLight();

  const vertices = getSphericalVertices({
    points: SIZES.POINTS,
    radius: SIZES.FRAME_RADIUS,
  });

  const objects = createObjectGroup(vertices);
  const controls = new TrackballControls(camera);

  scene.add(objects);
  scene.add(light);

  const renderer = createRenderer();
  mount(renderer);

  const interaction = getEventListener({
    camera,
    scene,
    manager: objects.manager
  });

  renderer.domElement.addEventListener('mousemove', interaction);
  renderer.domElement.addEventListener('click', interaction);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  };

  window.addEventListener('resize', onWindowResize, false);
  animate();
};

initialise();
