import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const message = useSelector(state => state.message)
  if (message === '') {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification