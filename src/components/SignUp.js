import React from 'react'
import { useDispatch } from 'react-redux'

import { useField } from '../hooks'
import { addUser } from '../reducers/userReducer'

import { Container, Form, Button } from 'react-bootstrap'

import { useHistory, Link } from 'react-router-dom'

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
    <Container fluid>
      <h2>Sign Up</h2>
      <Form onSubmit={submitForm}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control {...username} placeholder="Enter Username" />
          <Form.Text className="text-muted">
            Username must be unique
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password} placeholder="Enter Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <Link to="/login">
          <Button variant="secondary" className="m-2">
            Login
          </Button>
        </Link>
      </Form>
    </Container>
  )
}

export default SignUp