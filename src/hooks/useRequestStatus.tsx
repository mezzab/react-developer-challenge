import { useState } from 'react'

import { Error } from '../services/types'

export enum RequestStatus {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

interface BasicStatus {
  status: Omit<RequestStatus, RequestStatus.ERROR>
}
interface ErrorStatus {
  status: RequestStatus.ERROR
  error: Error
}

type RequestStatusInfo = ErrorStatus | BasicStatus

export const useRequestStatus = () => {
  const [request, setRequestStatus] = useState<RequestStatusInfo>({
    status: RequestStatus.LOADING,
  })

  return {
    setStatusLoading: () => setRequestStatus({ status: RequestStatus.LOADING }),
    setStatusSuccess: () => setRequestStatus({ status: RequestStatus.SUCCESS }),
    setStatusError: (error: Error) =>
      setRequestStatus({ status: RequestStatus.ERROR, error }),
    loading: request.status === RequestStatus.LOADING,
    success: request.status === RequestStatus.SUCCESS,
    error:
      request.status === RequestStatus.ERROR
        ? (request as ErrorStatus).error
        : (false as false),
  }
}
