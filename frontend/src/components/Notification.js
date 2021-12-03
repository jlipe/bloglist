import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'


const Notification = () => {
  const message = useSelector(state => state.message)

  if (message.message === '') {
    return null
  } else {
    return (
      <Alert variant={message.type}>
        {message.message}
      </Alert>
    )
  }
}

export default Notification