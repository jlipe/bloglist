import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'


import { vote, addComment } from '../reducers/blogReducer'

import { Button, Form, ListGroup } from 'react-bootstrap'

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
      <ListGroup.Item key={index}>
        {comment}
      </ListGroup.Item>
    )
  })

  return (
    <div>
      <h2><em>{blog.title}</em></h2>
      <a href={blog.url} >{blog.url}</a>
      <p className="mt-2">
        Likes <span id="likes">{blog.likes}</span>{'  '}
        <Button type="button" className="likeButton" size="sm" variant="outline-secondary" onClick={() => dispatch(vote(blog))} id="likeButton">Like</Button>
      </p>
      <p>Added by {blog.user ? blog.user.username : null}</p>
      <h3>Comments</h3>
      <Form inline onSubmit={submitComment}>
        <Form.Control
          className="mb-2 mr-sm-2 col-5"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <Button type="submit" className="mb-2">Add Comment</Button>
      </Form>
      <ListGroup className="mb-2 mr-sm-2 col-5" variant="flush">
        {renderedComments}
      </ListGroup>
    </div>
  )
}

export default Blog
