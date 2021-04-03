import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import { Button } from 'react-bootstrap'

import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import User from './components/User'
import Blog from './components/Blog'
import BlogNav from './components/BlogNav'
import SignUp from './components/SignUp'

import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initUser())
  }, [])


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])


  const blogFormRef = useRef()

  const handleBlogCreate = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div className="container">
      <Router>
        <BlogNav user={user} />
        <Notification />
        <h2>Blogs</h2>
        <Switch>
          <Route path="/users/:id">
            <User blogs={blogs} />
          </Route>
          <Route path="/users">
            <Users blogs={blogs} />
          </Route>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/">
            <div>
              {user ?
                <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
                  <BlogForm user={user} handleSubmit={handleBlogCreate} />
                </Togglable>
                : <Link to="/login">
                  <Button variant="warning" className="ml-2">
                    Login to add a blog
                  </Button>
                </Link>
              }
              <BlogList blogs={blogs} />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App