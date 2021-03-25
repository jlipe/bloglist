import React from 'react'
import { useDispatch } from 'react-redux'

import { useField } from '../hooks'
import { addUser } from '../reducers/userReducer'

import { useHistory } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useField('text')
  const password = useField('password')

  const submitForm = (event) => {
    event.preventDefault()
    dispatch(addUser(username.value, password.value))
      .then(() => history.push('/login'))
      .catch(() => console.log('invalid signup'))
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <h2>Create an account</h2>
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

export default SignUp