const groupsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GROUPS_ACTION':
      return {
        ...state
      }
    default:
      return state
  }
}
export default groupsReducer
