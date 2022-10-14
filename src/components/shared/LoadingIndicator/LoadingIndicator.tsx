import CircularProgress from '@mui/material/CircularProgress'

import './LoadingIndicator.css'

const LoadingIndicator = ({
  loading,
  size = 20,
}: {
  loading: boolean
  size?: number
}) => {
  if (loading) {
    return (
      <div className="loadingIndicator">
        <CircularProgress size={size} />
      </div>
    )
  } else {
    return null
  }
}

export default LoadingIndicator
