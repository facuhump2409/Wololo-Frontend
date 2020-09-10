export const HEADERS = ['numero', 'provincia', 'fecha', 'estado']

export const INITIAL_VALUES = [{
  numero: 1,
  provincia: "Buenos Aires",
  fecha: new Date().toDateString(),
  estado: 'NEW',
}, {
  numero: 2,
  provincia: "Santa Fe",
  fecha: new Date().toDateString(),
  estado: 'FINISHED',
}, {
  numero: 3,
  provincia: "Tucuman",
  fecha: new Date().toDateString(),
  estado: 'NEW',
}]