import {
  createCamera,
  createLight,
  createRenderer,
  createScene,
  mount
} from './framework';

import {
  createObjectGroup,
  getEventListener
} from './objects';

const initialise = () => {
  const camera = createCamera();
  const scene = createScene();
  const light = createLight();


  const objects = createObjectGroup({
    points: 15,
    radius: 5
  });

  scene.add(objects);
  scene.add(light);

  const renderer = createRenderer();
  mount(renderer);

  renderer.domElement.addEventListener('click', getEventListener(camera, scene));

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    scene.rotation.x += 0.001
    scene.rotation.y += 0.001
  };

  animate();
};

initialise();
