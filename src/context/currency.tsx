import React, { useContext, useEffect,useState } from 'react'
import { createContext } from 'react'

interface ICurrencyContext {
  currency: string
  symbol: string
  setCurrency: (c: string) => void
}

const Currency = createContext<ICurrencyContext>({
  currency: 'USD',
  symbol: '$',
  setCurrency: () => {},
})

const CurrencyContext: React.FC<any> = ({ children }) => {
  const [currency, setCurrency] = useState('USD')
  const [symbol, setSymbol] = useState('₹')

  useEffect(() => {
    if (currency === 'USD') setSymbol('$')
    else if (currency === 'INR') setSymbol('₹')
    else if (currency === 'EUR') setSymbol('€')
  }, [currency])

  return (
    <Currency.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Currency.Provider>
  )
}

export default CurrencyContext

export const CurrencyState = () => {
  return useContext(Currency)
}
