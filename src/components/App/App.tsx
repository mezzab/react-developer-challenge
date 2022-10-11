'react'
import CurrencyContext from '../../context/currency'
import Header from '../Header/Header'
import Body from '../Body/Body'
import Footer from '../Footer/Footer'
import SelectedCoinContext from '../../context/selectedCoin'
import './App.css'

function App() {
  return (
    <div className="App">
      <CurrencyContext>
        <SelectedCoinContext>
          <Header />
          <Body />
          <Footer />
        </SelectedCoinContext>
      </CurrencyContext>
    </div>
  )
}

export default App
