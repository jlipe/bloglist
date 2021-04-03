import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import { Link } from 'react-router-dom'

import { Navbar, Nav, Button, Form } from 'react-bootstrap'

const BlogNav = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/blogs'>Blogs</Nav.Link>
          <Nav.Link as={Link} to='/users'>Users</Nav.Link>
        </Nav>
        <Nav>
          { user ?
            <>
              <Navbar.Brand>{`${user.username} logged in`}</Navbar.Brand>
              <Button onClick={() => dispatch(logoutUser()) }>Log out</Button>
            </>
            : <Nav.Item>
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            </Nav.Item>
          }
        </Nav>
      </Navbar>
    </>
  )
}

export default BlogNav