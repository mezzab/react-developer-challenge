import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Error } from '../../../services/types'

import './ErrorMessage.css'

const ErrorMessage = ({ error }: { error: Error | false }) => {
  useEffect(() => {
    if (error) {
      // this toast is already being wrapped with an element with a role="alert" attribute
      // so this message is already accesible.
      toast(renderErrorMessage(), { type: 'error' })
    }
  }, [error])

  const renderErrorMessage = (msg?: string) =>
    `Error: ${msg || 'An unexpected error has occurred.'}`

  return null
}

export default ErrorMessage
