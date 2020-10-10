const colors = {
  unOwned: '#000',
  current: '#13FF00',
  otherPlayers: ['#BF0000', '#1700C7', '#D5DE00']
}

const colorFor = (ownerId) => colors.otherPlayers[ownerId % 3];
const isTownFrom = (aTown, currentUser) => aTown.ownerId === currentUser

export const paintBy = (town, currentUser) => ({
  'fill-color':  isTownFrom(town, currentUser.id) ? colors.current : (!town.ownerId ? colors.unOwned : colorFor(town.ownerId)),
  'fill-opacity': 0.5
  })

const accentsMap = {
  a: 'á|à|ã|â|À|Á|Ã|Â',
  e: 'é|è|ê|É|È|Ê',
  i: 'í|ì|î|Í|Ì|Î',
  o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
  u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
  c: 'ç|Ç',
  n: 'ñ|Ñ',
};

export const slugify = text => Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur), text);

export const upperSlugify = text => slugify(text).toUpperCase()

export const getGeoJsonAreas = (geojson, towns) => {
  const slugifiedTowns = towns.map(town => slugify(town.name).toUpperCase());

  return { ...geojson, features: geojson.features
    .filter(feature => slugifiedTowns.some(townName => townName === feature.properties.departamento))
    .map(feature => ({...feature, properties: {...feature.properties, town: towns.find(town => upperSlugify(town.name) === feature.properties.departamento)}}))
  }
}
