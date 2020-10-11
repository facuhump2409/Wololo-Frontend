import { PRODUCTION, DEFENSE } from './constants'

export const areSelectedAndRivals = (towns) => towns.town1 && towns.town2 && towns.town1.ownerId !== towns.town2.ownerId

export const getChangeSpecialization = {
  DEFENSE: PRODUCTION,
  PRODUCTION: DEFENSE
}