import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, sortBlogs, createBlog } from './reducers/blogReducer'
import { initUser, loginUser, logoutUser } from './reducers/userReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogs = useSelector(state => state.blogs)

  const user = useSelector(state => state.user)

  const renderedBlogs = () => {
    return (
      <div>
        <button onClick={() => dispatch(sortBlogs())} id="sortBlogsByLikes">Sort Blogs by Likes</button>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} onBlogRemove={handleBlogRemove} />)}
      </div>
    )
  }

  const blogFormRef = useRef()

  const handleBlogCreate = (blog) => {
    dispatch(createBlog(blog))
      .then((blog) => {
        const message = `a new blog ${blog.title} by ${blog.author} added`
        dispatch(setMessage(message, 3))
      })

    blogFormRef.current.toggleVisibility()
  }

  const handleBlogRemove = (message) => {
    dispatch(setMessage(message, 3))
  }

  return (
    <div>
      <Notification />
      { user ?
        <div>
          <h2>Blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
          </p>
          <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
            <BlogForm user={user} handleSubmit={handleBlogCreate} />
          </Togglable>
          <p></p>
          <div id="blogList">
            {renderedBlogs()}
          </div>
        </div>
        : loginForm()}
    </div>
  )
}

export default App