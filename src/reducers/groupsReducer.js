import { useStore } from 'react-redux'

const initialState = {
  info: '',
  createGroup: false
}

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GROUPS_DISPLAY_INFO':
      return {
        ...state,
        info: action.payload
      }

    case 'GROUPS_CREATE_TRUE':
      return {
        ...state,
        createGroup: true
      }
    case 'GROUPS_CREATE_FALSE':
      return {
        ...state,
        createGroup: false
      }

    default:
      return state
  }
}
export default groupsReducer
