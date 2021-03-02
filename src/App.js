import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setMessage } from './reducers/notificationReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      dispatch(setMessage(`${username} logged in`, 3))
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch(exception) {
      dispatch(setMessage('Invalid login', 3))
    }
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

  const handleLikeClick = (blog) => {
    blogService.update(blog, blog.id)
  }

  const renderedBlogs = () => {
    return (
      <div>
        <button onClick={sortBlogs} id="sortBlogsByLikes">Sort Blogs by Likes</button>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} onBlogRemove={handleBlogRemove} updateLikes={handleLikeClick}/>)}
      </div>
    )
  }

  const sortBlogs = () => {
    console.log('sorting')
    const sortedBlogs = [...blogs]
    sortedBlogs.sort(function (a, b) {
      console.log(a.likes)
      return b.likes - a.likes
    })
    setBlogs(sortedBlogs)
  }

  const logout = () => {
    dispatch(setMessage(`${user.username} logged out`, 3))
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken('')
    setUsername('')
    setPassword('')
    return
  }

  const blogFormRef = useRef()

  const handleBlogCreate = async (blog) => {
    const blogToAdd = await blogService.create(blog)
    const message = `a new blog ${blogToAdd.title} by ${blogToAdd.author} added`
    console.log('here')

    dispatch(setMessage(message, 3))
    const newBlogs = blogs.concat(blogToAdd)
    setBlogs(newBlogs)
    blogFormRef.current.toggleVisibility()
  }

  const handleBlogRemove = (message, blogToRemoveId) => {
    dispatch(setMessage(message, 3))
    const newBlogs = blogs.filter(blog => blog.id !== blogToRemoveId)
    setBlogs(newBlogs)
  }

  return (
    <div>
      <Notification />
      { user ?
        <div>
          <h2>Blogs</h2>
          <p>
            {user.username} logged in
            <button onClick={() => logout()}>Logout</button>
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