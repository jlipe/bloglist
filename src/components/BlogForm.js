import { useState } from 'react'
import React from 'react'

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
    <form onSubmit={handleBlogPost} id="blogForm">
      <h2>Create new</h2>
      <div>
        title: <input
          type="text"
          id="text"
          value={title}
          name="blog_title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          type="text"
          id="author"
          value={author}
          name="blog_author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL: <input
          type="url"
          id="url"
          value={url}
          name="blog_url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm