import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


import { vote, addComment } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const [newComment, setNewComment] = useState('')

  const blog = blogs.find(blog => blog.id === id)
  if (!blog) {
    return null
  }

  const submitComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, newComment))
    setNewComment('')
  }

  const comments = blog.comments
  const renderedComments = comments.map((comment, index) => {
    return (
      <li key={index}>
        {comment}
      </li>
    )
  })

  return (
    <div>
      <h2><em>{blog.title}</em></h2>
      <a href={blog.url} >{blog.url}</a>
      <p>Likes <span id="likes">{blog.likes}</span> <button className="likeButton" onClick={() => dispatch(vote(blog))} id="likeButton">Like</button></p>
      <p>Added by {blog.user ? blog.user.username : null}</p>
      <h3>Comments</h3>
      <form onSubmit={submitComment}>
        <input value={newComment} onChange={(event) => setNewComment(event.target.value)} ></input>
        <button type="submit">Add Comment</button>
      </form>

      <ul>
        {renderedComments}
      </ul>
    </div>
  )
}

export default Blog
