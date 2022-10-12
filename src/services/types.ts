export type KapowResponse<T> = SuccessResponse<T> | ErrorResponse<T>

export type Error = { statusCode: number; message?: string }

type SuccessResponse<T> = {
  success: true
  value: T
}

type ErrorResponse<T> = {
  success: false
  error: Error
}

/* - - - - - - - - - - - - - - - - - - API Responses - - - - - - - - - - - - - - - - - - */
export interface BasicItem {
  id: string
  name: string
}
export interface CoinDetails extends BasicItem {
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  circulating_supply: number
  current_price: number
  fully_diluted_valuation: number
  high_24h: number
  image: string
  last_updated: string
  low_24h: number
  market_cap: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  market_cap_rank: number
  max_supply: number
  price_change_24h: number
  price_change_percentage_24h: number
  symbol: string
  total_supply: number
  total_volume: number
  // roi: number | null,
}

export type CoinHistory = {
  prices: number[][]
}

type language = 'ar' | 'es' | 'en'
export interface CoinInfo {
  description: {
    [key in language]: string
  }
  image: {
    small: string
    large: string
    thump: string
  }
  id: string
  links: {
    blockchain_site: string
  }
  market_cap_rank: number
  symbol: string
}
