import React, { useContext, useState } from 'react'
import { createContext } from 'react'

interface CoinBasicInfo {
  id: string
  name: string
}
interface ICoinContext {
  selectedCoin: CoinBasicInfo
  setSelectedCoin: (c: CoinBasicInfo) => void
}

const SelectedCoin = createContext<ICoinContext>({
  selectedCoin: { id: 'bitcoin', name: 'Bitcoin' },
  setSelectedCoin: () => {},
})

const SelectedCoinContext: React.FC<any> = ({ children }) => {
  const [selectedCoin, setSelectedCoin] = useState<CoinBasicInfo>({
    id: 'bitcoin',
    name: 'Bitcoin',
  })

  return (
    <SelectedCoin.Provider value={{ selectedCoin, setSelectedCoin }}>
      {children}
    </SelectedCoin.Provider>
  )
}

export default SelectedCoinContext

export const SelectedCoinState = () => {
  return useContext(SelectedCoin)
}
