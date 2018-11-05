import { Raycaster, Vector3 } from 'three';

export const getEventListener = ({
  camera,
  scene,
  manager,
  callback
}) => {
  const raycaster = new Raycaster();

  return (event) => {
    event.preventDefault();

    const ray = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    };

    raycaster.setFromCamera(ray, camera);
    const intersects = raycaster.intersectObjects(scene.children, true)
      
    const hasSphere = intersects.reduce((start, intersect) => {
      return start || manager.hasId(intersect.object.id);
    }, false);

    intersects.forEach(intersect => {
      const id = intersect.object.id;

      if (event.type === 'click') {
        manager.select(id)
      } else if (hasSphere && manager.hasId(id)) {
        manager.highlight(id);
      } else if (!hasSphere) {
        manager.highlight();
      };

      manager.paint();
      callback && callback(id);
    });
  };
};
