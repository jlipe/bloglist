import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

import { setMessage } from './notificationReducer'

const reducer = (state = null, action) => {
  console.log('Action: ', action.type)
  console.log('State: ', state)
  switch(action.type) {
  case('INIT_USER'):
    return action.data.user
  case('SET_USER'):
    return action.data.user
  case('REMOVE_USER'):
    return null
  default:
    return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setMessage(`${user.username} logged in`, 3))

      dispatch({
        type: 'SET_USER',
        data: { user }
      })

    } catch(exception) {
      dispatch(setMessage('Invalid login', 3))
      return Promise.reject('Invalid Login')
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken('')
    dispatch(setMessage(`${user.username} logged out`, 3))
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

export const initUser = () => {
  return async dispatch => {
    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    if (loggedUserJSON) {
      blogService.setToken(loggedUserJSON.token)
      dispatch({
        type: 'INIT_USER',
        data: { user: loggedUserJSON }
      })
    }
  }
}

export const addUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await userService.addUser({
        username, password
      })

      console.log(user)

      dispatch(setMessage(`${user.username} successfully added`, 3))

    } catch(exception) {
      dispatch(setMessage('Invalid login', 3))
      return Promise.reject('Invalid Login')
    }
  }
}



export default reducer