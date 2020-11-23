export const compareValues = (key, isAsc) => (anObject, anotherObject) => {
  const objectToCompare = key === 'id' ? anObject : anObject.data;
  const otherObjectToCompare = key === 'id' ? anotherObject : anotherObject.data;
  
  let comparison = objectToCompare[key] < otherObjectToCompare[key] ? 1 : -1;

  return isAsc ? comparison : (-1 * comparison);
}

export const filterValues = (objects, comparingValue) => {
  return objects.filter(aValue => aValue.id == comparingValue 
    || Object.keys(aValue.data).some(key => aValue.data[key].toUpperCase().includes(comparingValue.toUpperCase())))
}

export const mapGames = (games) => games.map(game => ({ 
  id: game.id, 
  data: { 
    province: game.province.name, 
    date: new Date(game.date).toDateString(), 
    status: game.status 
  } 
}))
