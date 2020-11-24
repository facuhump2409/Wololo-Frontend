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

const getFormattedMinutesFrom = date => date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${getFormattedMinutesFrom(date)}`
}

export const mapGames = (games) => games.map(game => ({ 
  id: game.id, 
  data: { 
    province: { value: game.province.name, showMobile: true }, 
    date: { value: formatDate(new Date(game.date)) }, 
    users: { value: game.playerIds.map(player => player.username).join(', '), showMobile: true },
    towns: { value: game.province.towns.length.toString() },
    status: { value: game.status }
  } 
}))
