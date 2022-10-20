import { CurrencyList } from '../../config/config'
import { CurrencyState } from '../../context/currency'
import Menu from '../shared/MenuButton/MenuButton'

import './Header.css'

const Header = () => {
  const { currency, setCurrency } = CurrencyState()

  return (
    <header>
      <div className="headerWrapper responsiveMargin">
        <img src="images/top5-logo-50px.png" alt="top 5 crypto logo" />
        <h1> Crypto Top 5 </h1>
        <Menu
          options={CurrencyList.map((x) => x.currency)}
          onSelect={(o) => setCurrency(o)}
          selected={currency}
        />
      </div>
    </header>
  )
}

export default Header
