import CoinList from '../CoinsTable/CoinsTable'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import HistoryChart from '../HistoryChart/HistoryChart'
import SelectedCoinDetails from '../SelectedCoinDetails/SelectedCoinDetails'

const Body = () => {
  return (
    <Box sx={{ flexGrow: 1, margin: '3em' }}>
      <Grid container spacing={4}>
        <Grid xs={12}>
          <CoinList />
        </Grid>
        <Grid xs={9}>
          <HistoryChart />
        </Grid>
        <Grid xs={3}>
          <SelectedCoinDetails />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Body
