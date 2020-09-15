export const HEADERS = [{
  id: 1,
  value: '#',
  key: 'id',
  nextOrder: false,
  arrow: 'down'
}, {
  id: 2,
  value: 'Province',
  key: 'province',
  nextOrder: true,
  arrow: 'down'
}, {
  id: 3,
  value: 'Date',
  key: 'date',
  nextOrder: true,
  arrow: 'down'
}, {
  id: 4,
  value: 'Status',
  key: 'status',
  nextOrder: true,
  arrow: 'down'
}, {
  id: 5,
  value: 'Action',
  key: 'action',
  nextOrder: true,
  arrow: 'down'
}]

export const CHANGE_ARROW = {
  down: 'up',
  up: 'down'
}

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