import React from 'react'
import { useDispatch } from 'react-redux'

import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'

import { Button, Container, Form } from 'react-bootstrap'

import { useHistory, Link } from 'react-router-dom'

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
    <Container fluid>
      <h2>Log in to application</h2>
      <Form onSubmit={submitForm}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control {...username} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Link to="/signup">
          <Button variant="secondary" className="m-2">
            Sign Up
          </Button>
        </Link>
      </Form>
      <p>
        If you want to post a new blog entry or comment on blogs you must be signed in. Either create an
        account on the sign up page, or login with the username: &apos;test_user&apos; password: &apos;test_password&apos;
      </p>
    </Container>
  )
}

export default loginForm
