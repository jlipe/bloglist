const reducer = (state = '', action) => {
  switch(action.type) {
  case('SET_MESSAGE'):
    return action.data.message
  default:
    return state
  }
}

let currentMessageId = null

export const setMessage = (message, seconds) => {
  if (currentMessageId) {
    clearInterval(currentMessageId)
  }

  return async dispatch => {
    currentMessageId = setTimeout(() => {
      dispatch({ type: 'SET_MESSAGE', data: { message: '' } })
    }, 1000 * seconds)

    dispatch({
      type: 'SET_MESSAGE',
      data: { message }
    })
  }
}

export default reducer