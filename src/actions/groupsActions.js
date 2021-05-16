import firebase from '../firebase'
import { v4 as uuidv4 } from 'uuid'

export const groupsAction = (infoStr) => (dispatch) => {
  dispatch({
    type: 'GROUPS_DISPLAY_INFO',
    payload: infoStr
  })
}

export const addGroupAction = (newGroup) => (dispatch) => {
  const ref = firebase.firestore().collection('group')
  const regex = /[a-zA-Z]/

  if (!regex.test(newGroup.name) || !regex.test(newGroup.description)) {
    status = 'Both fields must contain letters'
    //console.log(status)
  } else {
    ref.doc(newGroup.id).set(newGroup).catch((err) => { console.error(err) })
    status = 'Group succesfully added'
    //console.log(status)
  }

  dispatch({
    type: 'GROUPS_ADD_DATA',
    payload: status
  })
}
export const setGroupId = (groupId) => (dispatch) => {
  //console.log("groJNKNNJKup", groupId)
  localStorage.setItem('currentGroup', groupId)
  dispatch({
    type: 'GROUPS_ID',
    payload: groupId
  })
}

export const createGroupAction = () => ({
  type: 'GROUPS_CREATE_TRUE'
})

export const createGroupOffAction = () => ({
  type: 'GROUPS_CREATE_FALSE'
})

export const getGroupsAction = () => (dispatch) => {
  const ref = firebase.firestore().collection('group')

  ref.onSnapshot((querySnapshot) => {
    const groupItems = []
    querySnapshot.forEach((doc) => {
      groupItems.push(doc.data())
    })

    dispatch({
      type: 'GROUPS_DATA',
      payload: groupItems
    })

  })
}


export const userJoinAction = (userToAdd) => (dispatch) => {
  const ref = firebase.firestore().collection('group')
  if (userToAdd.member) {
    ref
      .doc(userToAdd.id)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(userToAdd.member)
      })
    status = "You have joined the group"
  }
  else {
    status = "Log In to join a group"
  }


  dispatch({
    type: 'GROUPS_USER_JOIN',
    payload: status
  })

}


