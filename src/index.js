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

const initialise = () => {
  const camera = createCamera();
  const scene = createScene();
  const light = createLight();

  const vertices = getSphericalVertices({
    points: SIZES.POINTS,
    radius: SIZES.FRAME_RADIUS,
  });

  const objects = createObjectGroup(vertices);

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
    objects.rotation.x += 0.001;
    objects.rotation.y += 0.001;
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
