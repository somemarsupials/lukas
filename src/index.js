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

const initialise = (projects) => {
  const camera = createCamera();
  const scene = createScene();
  const light = createLight();

  const vertices = getSphericalVertices({
    points: Math.max(projects.length, SIZES.POINTS),
    radius: SIZES.FRAME_RADIUS,
  });

  const objects = createObjectGroup(vertices, projects);
  const controls = new TrackballControls(camera);

  camera.add(light);
  scene.add(camera);
  scene.add(objects);

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
    const container = window;
    camera.aspect = container.innerWidth / container.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.innerWidth, container.innerHeight);
  };

  window.addEventListener('resize', onWindowResize, false);
  animate();
};

fetch('https://pillowtalk-api.herokuapp.com/projects').then((response) => {
  response.text().then(data => {
    initialise(JSON.parse(data))
  })
})
