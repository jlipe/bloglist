import React from 'react'
import { useDispatch } from 'react-redux'

import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'

const loginForm = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const submitForm = (event) => {
    event.preventDefault()
    dispatch(loginUser(username.value, password.value))
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <h2>Log in to application</h2>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default loginForm
