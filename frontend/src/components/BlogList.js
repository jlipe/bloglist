import React from 'react'
import { useDispatch } from 'react-redux'
import { sortBlogs, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

import { ListGroup, Button, Table } from 'react-bootstrap'

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const renderedBlogs = blogs.map(blog => {
    return(
      <tr key={blog.id}>
        <td>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </td>
        <td>
          {blog.author}
        </td>
        <td>
          <Button className="ml-2" variant="danger" onClick={() => dispatch(deleteBlog(blog))} id="delete">delete</Button>
        </td>
      </tr>
    )
  })

  return (
    <div>
      <Button className="m-2" onClick={() => dispatch(sortBlogs())}>Sort Blogs by Likes</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {renderedBlogs}
        </tbody>
      </Table>

    </div>
  )
}

export default BlogList