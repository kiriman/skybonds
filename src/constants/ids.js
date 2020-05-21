export const BONDS_TYPES = {
  price: 'Price',
  yield: 'Yield',
  spread: 'Spread'
}

export const BOND_TYPE_OPTIONS = [
  { value: 0, label: BONDS_TYPES.price },
  { value: 1, label: BONDS_TYPES.yield },
  { value: 2, label: BONDS_TYPES.spread }
]

export const INTERVALS = {
  week: 'Week',
  quarter: 'Quarter',
  month: 'Month',
  year: 'Year',
  max: 'Max'
}

export const INTERVAL_OPTIONS = [
  { value: 3, label: INTERVALS.week },
  { value: 4, label: INTERVALS.quarter },
  { value: 6, label: INTERVALS.month },
  { value: 8, label: INTERVALS.year },
  { value: 10, label: INTERVALS.max },
]

export const FAKE_DATA = [
  {date: '2007-04-23', numberFloat: 33.24},
  {date: '2007-04-24', numberFloat: 45.35},
  {date: '2007-04-25', numberFloat: 58.84},
  {date: '2007-04-26', numberFloat: 99.92},
  {date: '2007-04-29', numberFloat: 80.80},
  {date: '2007-05-01', numberFloat: 83.47},
  {date: '2007-05-02', numberFloat: 100.39},
  {date: '2007-05-03', numberFloat: 102.40},
]
