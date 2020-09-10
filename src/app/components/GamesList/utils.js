export const compareValues = (key, order) => (anObject, anotherObject) => {
  let comparison = anObject[key] > anotherObject[key] ? 1 : -1;

  return order === 'desc' ? (-1 * comparison) : comparison;
}