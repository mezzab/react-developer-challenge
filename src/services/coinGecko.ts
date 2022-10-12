import axios, { AxiosResponse } from 'axios'

import { HistoricalChart, ListCoins, SingleCoin } from '../config/coinGeckoURLs'

import { CoinDetails, CoinHistory, CoinInfo,KapowResponse } from './types'

export async function getCoinList(
  currency: string
): Promise<KapowResponse<CoinDetails[]>> {
  try {
    const response: AxiosResponse = await axios.get(ListCoins(currency))
    if (response.status === 200) {
      return { success: true, value: response.data as CoinDetails[] }
    }
    return {
      success: false,
      error: { statusCode: response.status, message: response.statusText },
    }
  } catch (error: any) {
    return {
      success: false,
      error: { statusCode: 0, message: error?.message },
    }
  }
}

export async function getCoinHistory(
  id: string,
  currency: string,
  days: string = '14'
): Promise<KapowResponse<CoinHistory>> {
  try {
    const response: AxiosResponse = await axios.get(
      HistoricalChart(id, currency, days)
    )
    if (response.status === 200) {
      return { success: true, value: response.data as CoinHistory }
    }
    return {
      success: false,
      error: { statusCode: response.status, message: response.statusText },
    }
  } catch (error: any) {
    return {
      success: false,
      error: { statusCode: 0, message: error?.message },
    }
  }
}

export async function getCoinInfo(
  id: string
): Promise<KapowResponse<CoinInfo>> {
  try {
    const response: AxiosResponse = await axios.get(SingleCoin(id))

    if (response.status === 200) {
      return { success: true, value: response.data as CoinInfo }
    }
    return {
      success: false,
      error: { statusCode: response.status, message: response.statusText },
    }
  } catch (error: any) {
    return {
      success: false,
      error: { statusCode: 0, message: error?.message },
    }
  }
}
