import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

import CoinList from '../CoinsTable/CoinsTable'
import HistoryChart from '../HistoryChart/HistoryChart'

const Body = () => {
  return (
    <Box
      className="responsiveMargin"
      sx={{
        flexGrow: 1,
        paddingTop: '1em',
        height: 'calc(100% - 125px - 2em)',
      }}
    >
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
