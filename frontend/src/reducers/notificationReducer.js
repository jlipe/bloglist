const reducer = (state = { message: '', type: null }, action) => {
  console.log('Action: ', action)
  console.log('State: ', state)
  switch(action.type) {
  case('SET_MESSAGE'):
    return { message: action.data.message, type: action.data.type }
  default:
    return state
  }
}

let currentMessageId = null

export const setMessage = (message, type, seconds) => {
  if (currentMessageId) {
    clearInterval(currentMessageId)
  }

  return async dispatch => {
    currentMessageId = setTimeout(() => {
      dispatch({ type: 'SET_MESSAGE', data: { message: '', type: null } })
    }, 1000 * seconds)

    dispatch({
      type: 'SET_MESSAGE',
      data: { message, type }
    })
  }
}

export default reducer