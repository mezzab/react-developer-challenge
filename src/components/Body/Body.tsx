import CoinList from '../CoinsTable/CoinsTable'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import HistoryChart from '../HistoryChart/HistoryChart'

const Body = () => {
  return (
    <Box className="responsiveMargin" sx={{ flexGrow: 1 }}>
      <Grid spacing={4}>
        <Grid>
          <CoinList />
        </Grid>
        <Grid>
          <HistoryChart />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Body
