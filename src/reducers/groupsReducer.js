import { useStore } from 'react-redux'

const initialState = {
  info: '',
  createGroup: false,
  groupsData: [],
  validation: '',
  currentGroup: '',
  loggedInValid: ''
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
        createGroup: true,
        info: '',
        loggedInValid: ''
      }
    case 'GROUPS_CREATE_FALSE':
      return {
        ...state,
        createGroup: false,
        validation: ''
      }

    case 'GROUPS_DATA':
      return {
        ...state,
        groupsData: action.payload
      }
    case 'GROUPS_ADD_DATA':
      return {
        ...state,
        validation: action.payload
      }

    case 'GROUPS_ID':
      return {
        ...state,
        currentGroup: action.payload,
        loggedInValid: ''
      }
    case 'GROUPS_USER_JOIN':
      return {
        ...state,
        loggedInValid: action.payload
      }


    default:
      return state
  }
}
export default groupsReducer
