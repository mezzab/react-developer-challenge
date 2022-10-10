import { CurrencyList } from '../../config/config'
import { CurrencyState } from '../../context/currency'
import Menu from '../shared/MenuButton/MenuButton'
import './Header.css'

const Header = () => {
  const { currency, setCurrency } = CurrencyState()

  return (
    <header>
      <div> Crypto Top 5 </div>
      <Menu
        options={CurrencyList.map((x) => x.currency)}
        onSelect={(o) => setCurrency(o)}
        label={currency}
      />
    </header>
  )
}

export default Header
