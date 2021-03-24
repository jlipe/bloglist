import React from 'react'
import { useParams } from 'react-router-dom'

const Users = ({ blogs }) => {
  const id = useParams().id
  const userBlogs = blogs.filter(blog => blog.user.id === id)
  if (userBlogs.length === 0) {
    return null
  }
  const username = userBlogs[0].user.username
  console.log(username)

  const renderedBlogList = userBlogs.map(blog => {
    return (
      <li key={blog.id}>
        {blog.title}
      </li>
    )
  })

  return (
    <div>
      <h4>{username}</h4>
      <h2>Added Blogs</h2>
      <ul>
        {renderedBlogList}
      </ul>
    </div>
  )
}

export default Users