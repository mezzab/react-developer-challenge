'react'
import CurrencyContext from '../../context/currency'
import Header from '../Header/Header'
import Body from '../Body/Body'
import Footer from '../Footer/Footer'
import './App.css'
import CoinContext from '../../context/coin'

function App() {
  return (
    <div className="App">
      <CurrencyContext>
        <CoinContext>
          <Header />
          <Body />
          <Footer />
        </CoinContext>
      </CurrencyContext>
    </div>
  )
}

export default App
