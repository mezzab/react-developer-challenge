const baseUrl = 'https://api.coingecko.com'

export const ListCoins = (
  currency: string,
  perPage: number = 5,
  page: number = 1
): string =>
  `${baseUrl}/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`

export const SingleCoin = (id: string) => `${baseUrl}/api/v3/coins/${id}`

export const HistoricalChart = (id: string, currency: string, days: string) =>
  `${baseUrl}/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
