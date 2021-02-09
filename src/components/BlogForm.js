import { useState } from "react"
import React from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogPost = async ( event, user ) => {
    event.preventDefault()
    const blogObject = { title, author, url, user }
    const blogToAdd = await blogService.create(blogObject)
    const message = `a new blog ${title} by ${author} added`
    handleSubmit(message, blogToAdd)

    setTitle('')
    setAuthor('')
    setUrl('')
    return
  }

  return (
    <form onSubmit={handleBlogPost}>
      <h2>Create new</h2>
      <div>
        title: <input
          type="text"
          value={title}
          name="blog_title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          type="text"
          value={author}
          name="blog_author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL: <input
          type="url"
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