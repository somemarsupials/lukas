import SpriteText from 'three-spritetext';

import { COLOURS, SIZES } from './constants';

const generateOffset = (position) => {
  const [x, y, z] = position;
  return [x, y + SIZES.LABEL_OFFSET, z];
};

export const createLabel = (text, position) => {
  const label = new SpriteText(text, SIZES.LABEL, COLOURS.LABEL)
  const offsetPosition = generateOffset(position);

  label.scale.set(...SIZES.LABEL_SCALE);
  label.position.set(...offsetPosition);

  return label;
};
