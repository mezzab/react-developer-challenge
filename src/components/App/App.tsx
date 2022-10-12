import { ToastContainer } from 'react-toastify'

import CurrencyContext from '../../context/currency'
import SelectedCoinContext from '../../context/selectedCoin'
import Body from '../Body/Body'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // todo: create a theme context (similar to currency context)
        theme="light"
      />
      <CurrencyContext>
        <SelectedCoinContext>
          <>
            <Header />
            <Body />
            <Footer />
          </>
        </SelectedCoinContext>
      </CurrencyContext>
    </div>
  )
}

export default App
