import { useState } from 'react'
import React from 'react'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogPost = ( event, user ) => {
    event.preventDefault()
    const blog = { title, author, url, user }
    setTitle('')
    setAuthor('')
    setUrl('')
    handleSubmit(blog)
    return
  }

  return (
    <Form onSubmit={handleBlogPost} id="blogForm">
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          id="text"
          value={title}
          name="blog_title"
          onChange={({ target }) => setTitle(target.value)}
          required
        />
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          id="author"
          value={author}
          name="blog_author"
          onChange={({ target }) => setAuthor(target.value)}
          required
        />
        <Form.Label>URL:</Form.Label>
        <Form.Control
          type="text"
          id="url"
          value={url}
          name="blog_url"
          onChange={({ target }) => setUrl(target.value)}
          required
        />
        <Button type="submit" className="mt-2 ml-2">create</Button>
      </Form.Group>
    </Form>
  )
}

export default BlogForm