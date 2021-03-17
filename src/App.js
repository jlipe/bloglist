import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initUser, logoutUser } from './reducers/userReducer'

import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'

import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])


  const blogs = useSelector(state => state.blogs)

  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  const handleBlogCreate = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Router>
        <Notification />
        <h2>Blogs</h2>
        { user ?
          <div>
            <p>
              {user.username} logged in
              <button onClick={() => dispatch(logoutUser())}>Logout</button>
            </p>
          </div>
          : <LoginForm /> }
        <Switch>
          <Route path="/users">
            <Users blogs={blogs} />
          </Route>
          <Route path="/">
            {user ?
              <div>
                <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
                  <BlogForm user={user} handleSubmit={handleBlogCreate} />
                </Togglable>
                <BlogList blogs={blogs} />
              </div>
              : null}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App