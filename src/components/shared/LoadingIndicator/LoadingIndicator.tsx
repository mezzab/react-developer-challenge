import CircularProgress from '@mui/material/CircularProgress'

import './LoadingIndicator.css'

const LoadingIndicator = ({ loading }: { loading: boolean }) => {
  if (true) {
    return (
      <div className="loadingIndicator">
        <CircularProgress size={20} />
      </div>
    )
  } else {
  }
}

export default LoadingIndicator
