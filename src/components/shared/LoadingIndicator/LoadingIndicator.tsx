import CircularProgress from '@mui/material/CircularProgress'

import './LoadingIndicator.css'

const LoadingIndicator = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return (
      <div className="loadingIndicator">
        <CircularProgress size={20} />
      </div>
    )
  } else {
    return null
  }
}

export default LoadingIndicator
