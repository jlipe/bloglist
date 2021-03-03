import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs, sortBlogs, createBlog } from './reducers/blogReducer'
import { initUser, logoutUser } from './reducers/userReducer'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

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

  const renderedBlogs = () => {
    return (
      <div>
        <button onClick={() => dispatch(sortBlogs())} id="sortBlogsByLikes">Sort Blogs by Likes</button>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  const blogFormRef = useRef()

  const handleBlogCreate = (blog) => {
    dispatch(createBlog(blog))
    blogFormRef.current.toggleVisibility()
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
        : <LoginForm />}
    </div>
  )
}

export default App