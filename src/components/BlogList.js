import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortBlogs } from '../reducers/blogReducer'

import Blog from './Blog'

const BlogList = ({ blogs }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <p></p>
      <button onClick={() => dispatch(sortBlogs())} id="sortBlogsByLikes">Sort Blogs by Likes</button>
      <div id="blogList">
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
}

export default BlogList