import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

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
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch(exception) {
      setMessage('Invalid login')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
    setMessage(message)
    const newBlogs = blogs.concat(blogToAdd)
    setBlogs(newBlogs)
    blogFormRef.current.toggleVisibility()
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleBlogRemove = (message, blogToRemoveId) => {
    setMessage(message)
    const newBlogs = blogs.filter(blog => blog.id !== blogToRemoveId)
    setBlogs(newBlogs)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {message ?
        <Notification message={message} />
        : null}

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