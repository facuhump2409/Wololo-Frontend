export const compareValues = (key, isAsc) => (anObject, anotherObject) => {
  const objectToCompare = key === 'id' ? anObject : anObject.data;
  const otherObjectToCompare = key === 'id' ? anotherObject : anotherObject.data;
  
  let comparison = objectToCompare[key] > otherObjectToCompare[key] ? 1 : -1;

  return isAsc ? comparison : (-1 * comparison);
}