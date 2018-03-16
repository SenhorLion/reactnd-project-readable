export function capitalize(str = '') {
  return typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1);
}

export const CATEGORY_COLOUR_MAP = {
  react: 'pink',
  redux: 'teal',
  udacity: 'violet',
};
