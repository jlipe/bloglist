import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { vote, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [detailsVisible, setDetailsVisible] = useState(false)

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


  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button className='toggleBlog' onClick={toggleVisible}>{ detailsVisible ? 'hide': 'show' }</button>
      </div>
      <div style={showWhenVisible} className='blogUrlAndUser'>
        <p>{blog.url}</p>
        <p>Likes <span id="likes">{blog.likes}</span> <button className="likeButton" onClick={() => dispatch(vote(blog))} id="likeButton">Like</button></p>
        <p>{blog.user ? blog.user.username : null}</p>
        <button onClick={() => dispatch(deleteBlog(blog))} id="delete">delete</button>
      </div>
    </div>
  )
}

export default Blog
