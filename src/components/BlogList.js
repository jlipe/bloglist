import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortBlogs, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blogs)

  const renderedBlogs = blogs.map(blog => {
    return(
      <div style={blogStyle} className='blog' key={blog.id}>
        <div>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
          <button onClick={() => dispatch(deleteBlog(blog))} id="delete">delete</button>
        </div>
      </div>
    )
  })

  return (
    <div>
      <button onClick={() => dispatch(sortBlogs())}>Sort Blogs</button>
      {renderedBlogs}
    </div>
  )
}

export default BlogList