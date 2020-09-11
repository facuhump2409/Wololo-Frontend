export const HEADERS = [{
  id: 1,
  value: '#',
  key: 'id',
  nextOrder: true,
}, {
  id: 2,
  value: 'Provincia',
  key: 'province',
  nextOrder: true,
}, {
  id: 3,
  value: 'Fecha',
  key: 'date',
  nextOrder: true,
}, {
  id: 4,
  value: 'Estado',
  key: 'status',
  nextOrder: true
}]

export const INITIAL_VALUES = [{
  id: 1,
  data: {
    province: "Buenos Aires",
    date: new Date().toDateString(),
    status: 'NEW',
  }
}, {
  id: 2,
  data: {
    province: "Santa Fe",
    date: new Date().toDateString(),
    status: 'IN GAME',
  }
}, {
  id: 3,
  data: {
    province: "Tucuman",
    date: new Date().toDateString(),
    status: 'FINISHED',
  }
}, {
  id: 4,
  data: {
    province: "Cordoba",
    date: new Date().toDateString(),
    status: 'IN GAME',
  }
}, {
  id: 5,
  data: {
    province: "Mendoza",
    date: new Date().toDateString(),
    status: 'FINISHED',
  }
}, {
  id: 6,
  data: {
    province: "Rio Negro",
    date: new Date().toDateString(),
    status: 'FINISHED',
  }
}]