import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'


const Notification = () => {
  const message = useSelector(state => state.message)
  if (message === '') {
    return null
  }

  return (
    <Alert variant="success">
      {message}
    </Alert>
  )
}

export default Notification