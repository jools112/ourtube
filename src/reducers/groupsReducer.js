import { useStore } from 'react-redux'

const initialState = {
  info: ''
}

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GROUPS_DISPLAY_INFO':
      return {
        ...state,
        info: action.payload
      }

    default:
      return state
  }
}
export default groupsReducer
