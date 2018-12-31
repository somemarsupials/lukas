import SpriteText from 'three-spritetext';

import { COLOURS, SIZES } from './constants';

const generateOffset = (position) => {
  const [x, y, z] = position;
  return [x, y + 0.2, z];
};

export const createLabel = (text, position) => {
  const label = new SpriteText(text, SIZES.LABEL, COLOURS.LABEL)
  const offsetPosition = generateOffset(position);

  label.scale.set(0.5, 0.25, 0.25);
  label.position.set(...offsetPosition);

  return label;
};
