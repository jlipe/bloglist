import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onBlogRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const toggleVisible = () => {
    setDetailsVisible(!detailsVisible)
    return
  }

  const addLike = () => {
    const updatedBlog = blog
    updatedBlog.likes++
    
    blogService.update(updatedBlog, blog.id)
      .then(response => setLikes(response.likes))
  }

  const removeBlog = () => {
    blogService.remove(blog.id)
      .then(response => {
        const message = `${blog.title} successfully removed`
        onBlogRemove(message, blog.id)
      })
  }


  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisible}>{ detailsVisible ? 'hide': 'show' }</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>Likes {likes} <button onClick={addLike}>Like</button></p>
        <p>{blog.user ? blog.user.username : null}</p>
        <button onClick={removeBlog}>delete</button>
      </div>   
    </div>
  )
}

export default Blog
