const colors = {
  unOwned: '#000',
  current: '#13FF00',
  otherPlayers: ['#BF0000', '#1700C7', '#D5DE00']
}

const colorFor = (ownerId) => colors.otherPlayers[parseInt(ownerId,10) % 3];
const isTownFrom = (aTown, currentUser) => aTown.ownerId === currentUser

export const paintBy = (town, currentUser) => ({
  'fill-color':  isTownFrom(town, currentUser.id) ? colors.current : (!town.ownerId ? colors.unOwned : colorFor(town.ownerId)),
  'fill-outline-color': '#000',
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

export const getGeoJsonAreas = (geojson, towns) => geojson.map(feature => ({
  ...feature.features[0], 
  properties: {
    ...feature.features[0].properties, 
    town: towns.find(aTown => upperSlugify(aTown.name) === feature.features[0].properties.town)
  }}))