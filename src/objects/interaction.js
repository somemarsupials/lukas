import { Raycaster, Vector3 } from 'three';


export const getEventListener = (camera, scene) => {
  const raycaster = new Raycaster();

  return (event) => {
    event.preventDefault();

    const ray = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };

    raycaster.setFromCamera(ray, camera);
    const intersects = raycaster.intersectObjects(scene.children, true)
    console.log(intersects)
  };
};
