import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Users = ({ blogs }) => {
  const id = useParams().id
  const userBlogs = blogs.filter(blog => blog.user.id === id)
  if (userBlogs.length === 0) {
    return null
  }
  const username = userBlogs[0].user.username

  const renderedBlogList =
    <ListGroup>
      {userBlogs.map(blog => {
        return (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </ListGroup.Item>
        )
      })}
    </ListGroup>

  return (
    <div>
      <h4>{username}</h4>
      <h2>Added Blogs</h2>
      {renderedBlogList}
    </div>
  )
}

export default Users