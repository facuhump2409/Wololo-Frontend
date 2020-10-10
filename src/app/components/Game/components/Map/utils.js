const colors = {
  unOwned: 'rgba(0, 0, 0, 0.5)',
  current: 'rgba(29, 237, 29, 0.75)',
  otherPlayers: ['rgba(199, 0, 0, 0.7)', 'rgba(23, 0, 199, 0.7)', 'rgba(199, 149, 0, 0.7)']
}

const colorFor = (ownerId) => colors.otherPlayers[ownerId % 3];

const randomNumber = (to) => Math.floor(Math.random() * to);



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
    .filter(feature => slugifiedTowns.some(townName => townName === feature.properties.departamento) )}
}
