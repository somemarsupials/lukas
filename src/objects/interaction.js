import { Raycaster, Vector3 } from 'three';

import { getContainerAspect } from '../framework';

export const getEventListener = ({
  camera,
  scene,
  manager,
  callback
}) => {
  const raycaster = new Raycaster();

  return (event) => {
    const { height, width } = getContainerAspect();
    const ray = {
      x: (event.clientX / width) * 2 - 1,
      y: -(event.clientY / height) * 2 + 1,
    };

    raycaster.setFromCamera(ray, camera);
    const intersects = raycaster.intersectObjects(scene.children, true)
      
    const hasSphere = intersects.reduce((start, intersect) => {
      return start || manager.hasId(intersect.object.id);
    }, false);

    intersects.forEach(intersect => {
      const id = intersect.object.id;
      const object = manager.getId(id);

      if (event.type === 'click') {
        if (object && object.__project) {
          manager.select(id)
        };
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
