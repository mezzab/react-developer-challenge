import { Paper } from '@mui/material'
import { CoinState } from '../../context/coin'

const SelectedCoinDetails = () => {
  const { coin } = CoinState()

  return (
    <Paper sx={{ width: '100%', mb: 2, textAlign: 'center' }}>{coin}</Paper>
  )
}

export default SelectedCoinDetails
