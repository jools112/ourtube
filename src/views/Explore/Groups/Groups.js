import './Groups.css'
// eslint-disable-next-line
import { connect } from 'react-redux'
import { createGroupOffAction, createGroupAction, groupsAction } from '../../../actions/groupsActions'

import firebase from '../../../firebase'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'

export const unconnectedGroup = (props) => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [data, setData] = useState('')

  const ref = firebase.firestore().collection('groups')

  function getGroups() {
    setLoading(true)
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setGroups(items)
      //console.log(items)
      setLoading(false)
    })
  }
  useEffect(() => {
    getGroups()
  }, [])

  // ADD GROUP FUNCTION
  function addGroup(newGroup) {
    ref
      .doc(newGroup.id)
      .set(newGroup)
      .catch((err) => {
        console.error(err)
      })
    props.createOffAction()
  }

  // USER JOIN FUNCTION
  function userJoin(userToAdd) {
    setLoading()
    ref
      .doc(userToAdd.id)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(userToAdd.user)
      })
      .catch((err) => {
        console.error(err)
      })
    console.log('Added user: ', userToAdd.user)
    console.log(props.mapCreateGroup)
  }

  //Check that the inputs have letters
  function addGroupValidation(input1, input2) {
    const regex = /[a-zA-Z]/

    if (!regex.test(input1) || !regex.test(input2)) {
      console.log('Fields must contain letters')
    } else {
      console.log('Group succesfully added')
      addGroup({ title, data, id: uuidv4() })

    }
  }

  if (loading) {
    return <h1 className="GroupsLoading">Loading...</h1>
  }
  ////////////////////////////////////////////////////////////////////////////
  return (
    <div>
      {props.mapCreateGroup ? (
        <div>
          <h1>Create Group</h1>
          <div>
            <TextField
              label="Title: "
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></TextField>
            <br />
            <TextField
              label="Data: "
              value={data}
              onChange={(e) => setData(e.target.value)}
            ></TextField>
            <br />
            <div>
              <Button onClick={() => props.createOffAction()}>
                Back
                  </Button>
                  &nbsp;
                  &nbsp;
                  <Button onClick={() => addGroupValidation(title, data)}>
                Create
                  </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <SoftBox
              title="GROUPS"
              content={groups.map((group) => (
                <div className="GroupsDiv">
                  <div key={group.id}>
                    {group.title}

                    <button
                      className="GroupsJoin"
                      onClick={() => props.groupInfoAction(group.data)}
                    >
                      Info
                </button>
                    <button
                      className="GroupsJoin"
                      onClick={() =>
                        userJoin({ id: group.id, user: props.mapUsername })}
                    >
                      Join
                </button>
                  </div>
                </div>
              ))}
            ></SoftBox>
          </div>
          <Button onClick={() => props.createAction()}>Create Group</Button>
        </div>
      )}
      <br />
      <div> {props.mapInfoStr} </div>
    </div >
  )
}

const mapStateToProps = (state) => {
  return { mapUsername: state.login.username, mapInfoStr: state.groups.info, mapCreateGroup: state.groups.createGroup }
}

const mapDispatchToProps = (dispatch) => ({
  groupInfoAction: (infoStr) => dispatch(groupsAction(infoStr)),
  createAction: () => dispatch(createGroupAction()),
  createOffAction: () => dispatch(createGroupOffAction())
})

export const Group = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedGroup)
