export const ListCoins = (
  currency: string,
  perPage: number = 5,
  page: number = 1
): string =>
  `${process.env.REACT_APP_COIN_GECKO_BASE_URL}/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`

export const HistoricalChart = (id: string, currency: string, days: string) =>
  `${process.env.REACT_APP_COIN_GECKO_BASE_URL}/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`

export const SingleCoin = (id: string) =>
  `${process.env.REACT_APP_COIN_GECKO_BASE_URL}/api/v3/coins/${id}`
