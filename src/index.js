import {
  createCamera,
  createLight,
  createRenderer,
  createScene,
  mount,
  setCameraAspect,
  setRendererSize,
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
  const renderer = createRenderer();

  const vertices = getSphericalVertices({
    points: Math.max(projects.length, SIZES.POINTS),
    radius: SIZES.FRAME_RADIUS,
  });

  const objects = createObjectGroup(vertices, projects);

  camera.add(light);
  scene.add(camera);
  scene.add(objects);
  mount(renderer);

  const interaction = getEventListener({
    camera,
    scene,
    manager: objects.manager
  });

  console.log(renderer.domElement);
  const controls = new TrackballControls(camera, renderer.domElement);
  renderer.domElement.addEventListener('mousemove', interaction);
  renderer.domElement.addEventListener('click', interaction);

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  const onWindowResize = () => {
    setCameraAspect(camera);
    camera.updateProjectionMatrix();
    setRendererSize(renderer);
  };

  window.addEventListener('resize', onWindowResize, false);
  animate();
};

fetch('https://pillowtalk-api.herokuapp.com/projects').then((response) => {
  response.text().then(data => {
    initialise(JSON.parse(data))
  })
})
