import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onBlogRemove, updateLikes }) => {
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

  const addLike = (event) => {
    event.preventDefault()
    const updatedBlog = blog
    updatedBlog.likes++
    updateLikes(updatedBlog)
    setLikes(updatedBlog.likes)
  }

  const removeBlog = () => {
    blogService.remove(blog.id)
      .then(() => {
        const message = `${blog.title} successfully removed`
        onBlogRemove(message, blog.id)
      })
  }


  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button className='toggleBlog' onClick={toggleVisible}>{ detailsVisible ? 'hide': 'show' }</button>
      </div>
      <div style={showWhenVisible} className='blogUrlAndUser'>
        <p>{blog.url}</p>
        <p>Likes <span id="likes">{likes}</span> <button className="likeButton" onClick={addLike} id="likeButton">Like</button></p>
        <p>{blog.user ? blog.user.username : null}</p>
        <button onClick={removeBlog} id="delete">delete</button>
      </div>
    </div>
  )
}

export default Blog
