import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { vote, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

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

  const addLike = (event) => {
    event.preventDefault()
    dispatch(vote(blog))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    dispatch(deleteBlog(blog)).then(response => dispatch(setMessage(`${response.title} successfully removed`, 3)))
  }


  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author} <button className='toggleBlog' onClick={toggleVisible}>{ detailsVisible ? 'hide': 'show' }</button>
      </div>
      <div style={showWhenVisible} className='blogUrlAndUser'>
        <p>{blog.url}</p>
        <p>Likes <span id="likes">{blog.likes}</span> <button className="likeButton" onClick={addLike} id="likeButton">Like</button></p>
        <p>{blog.user ? blog.user.username : null}</p>
        <button onClick={removeBlog} id="delete">delete</button>
      </div>
    </div>
  )
}

export default Blog
