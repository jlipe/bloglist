import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import { Link } from 'react-router-dom'

const Navbar = ({ user }) => {
  const dispatch = useDispatch()

  return (
    <nav>
      <span>
        <Link to='/blogs'>Blogs</Link>
      </span>
      <span>
        <Link to='/users'>Users</Link>
      </span>
      {user ?
        <span>
          { `${user.username} logged in` }
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </span>
        : <Link to='/login'>Login</Link>}
    </nav>
  )
}

export default Navbar