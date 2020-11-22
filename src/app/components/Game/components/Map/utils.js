import { COLORS } from '../../../../constants';

const isTownFrom = (aTown, currentUser) => aTown.ownerId === currentUser

const isSelectedTown = (townSelected, town) => townSelected && townSelected.name === town.name

const calculateColor = (town, currentUser, colors, selectedTowns) => 
  isSelectedTown(selectedTowns[0], town) ? (COLORS.selected) :
  isSelectedTown(selectedTowns[1], town) ? (isTownFrom(town, currentUser.id) ? COLORS.selectedSecondary : COLORS.selectedSecondaryEnemy) :
  (isTownFrom(town, currentUser.id) ? COLORS.current : (!town.ownerId ? COLORS.unOwned : colors[town.ownerId]))

export const paintBy = (town, currentUser, colors, selectedTowns) => {
  return ({
    'fill-color': calculateColor(town, currentUser, colors, selectedTowns),
    'fill-outline-color': '#000',
    'fill-opacity': isSelectedTown(selectedTowns[0], town) || isSelectedTown(selectedTowns[1], town) ? 1 : 
                    town.isBordered ? 0.5 : 0.1
    })
}

const accentsMap = {
  a: 'á|à|ã|â|À|Á|Ã|Â',
  e: 'é|è|ê|É|È|Ê',
  i: 'í|ì|î|Í|Ì|Î',
  o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
  u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
  c: 'ç|Ç',
};

export const slugify = text => Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur), text);

export const upperSlugify = text => slugify(text).toUpperCase().split('.').join('')

export const getGeoJsonAreas = (geojson, towns) => geojson.map(feature => ({
  ...feature.features[0], 
  properties: {
    ...feature.features[0].properties, 
    town: towns.find(aTown => upperSlugify(aTown.name) === feature.features[0].properties.town)
  }}))

export const paintedTowns = (towns, borderingTowns) => borderingTowns ? 
  towns.map(town => ({...town, isBordered: borderingTowns.some(borderTown => borderTown === town.name)})) :
  towns.map(town => ({...town, isBordered: true}))
