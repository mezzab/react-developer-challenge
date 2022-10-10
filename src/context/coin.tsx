import React, { useContext, useState, useEffect } from 'react'
import { createContext } from 'react'

interface ICoinContext {
  coin: string
  setCoin: (c: string) => void
}

const Coin = createContext<ICoinContext>({
  coin: 'BTC',
  setCoin: () => {},
})

const CoinContext: React.FC<any> = ({ children }) => {
  const [coin, setCoin] = useState('bitcoin')

  return <Coin.Provider value={{ coin, setCoin }}>{children}</Coin.Provider>
}

export default CoinContext

export const CoinState = () => {
  return useContext(Coin)
}
