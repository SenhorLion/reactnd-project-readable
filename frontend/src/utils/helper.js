export function capitalize(str = '') {
  return typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1);
}

export const getCategoryColour = (category = 'default') => {
  const CATEGORY_COLOUR_MAP = {
    react: 'pink',
    redux: 'teal',
    udacity: 'violet',
    default: 'grey', //'olive',
  };

  if (CATEGORY_COLOUR_MAP[category] === undefined) {
    category = 'default';
  }

  return CATEGORY_COLOUR_MAP[category];
};

export const incrementValue = value => (value = value + 1);
export const decrementValue = value => (value = value - 1);
