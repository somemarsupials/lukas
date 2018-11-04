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

const initialise = () => {
  const camera = createCamera();
  const scene = createScene();
  const light = createLight();

  const vertices = getSphericalVertices({
    points: 15,
    radius: 5,
  });

  const objects = createObjectGroup(vertices);

  scene.add(objects);
  scene.add(light);

  const renderer = createRenderer();
  mount(renderer);

  renderer.domElement.addEventListener(
    'mousemove',
    getEventListener(camera, scene, objects.manager)
  );

  renderer.domElement.addEventListener(
    'click',
    getEventListener(camera, scene, objects.manager)
  );

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    scene.rotation.x += 0.001;
    scene.rotation.y += 0.001;
  };

  animate();
};

initialise();
