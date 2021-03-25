import React from 'react'
import { useDispatch } from 'react-redux'

import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'

import { useHistory } from 'react-router-dom'

const loginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const password = useField('password')

  const submitForm = (event) => {
    event.preventDefault()
    dispatch(loginUser(username.value, password.value))
      .then(() => history.push('/'))
      .catch(() => console.log('invalid login'))
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
