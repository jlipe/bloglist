import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('Action: ', action)
  console.log('State: ', state)
  switch(action.type) {
  case('INIT_BLOGS'):
    return action.data
  case('SORT_BLOGS'):
    return state.slice().sort(function (a, b) {
      return b.likes - a.likes
    })
  case('ADD_BLOG'):
    return [...state, action.data.blog]
  case('UPDATE_BLOG'): {
    return state.map(blog => blog.id === action.data.blog.id ? action.data.blog : blog)
  }
  case('REMOVE_BLOG'):
    return state.filter(blog => blog.id !== action.data.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const sortBlogs = () => {
  return async dispatch => {
    dispatch({ type: 'SORT_BLOGS' })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const addedBlog = await blogService.create(blog)

    dispatch({
      type: 'ADD_BLOG',
      data: { blog: addedBlog }
    })

    return addedBlog
  }
}

export const vote = (blog) => {
  blog.likes++
  return async dispatch => {
    const changedBlog = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { blog: changedBlog }
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id: blog.id }
    })

    return blog
  }
}

export default reducer