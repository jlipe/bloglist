import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { vote } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)
  if (!blog) {
    return null
  }

  return (
    <div>
      <h2><em>{blog.title}</em></h2>
      <a href={blog.url} >{blog.url}</a>
      <p>Likes <span id="likes">{blog.likes}</span> <button className="likeButton" onClick={() => dispatch(vote(blog))} id="likeButton">Like</button></p>
      <p>Added by {blog.user ? blog.user.username : null}</p>
    </div>
  )
}

export default Blog
