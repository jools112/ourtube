export const groupsAction = (infoStr) => ({
  type: 'GROUPS_DISPLAY_INFO',
  payload: infoStr
})

export const createGroupAction = () => ({
  type: 'GROUPS_CREATE_TRUE'
})

export const createGroupOffAction = () => ({
  type: 'GROUPS_CREATE_FALSE'
})
