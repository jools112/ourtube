import './Groups.css'
// eslint-disable-next-line
import { connect } from 'react-redux'
import { groupsAction } from '../../../actions/groupsActions'

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

  function groupInfo(data) {
    document.getElementById('groupInfo').innerHTML = data
  }

  useEffect(() => {
    getGroups()
  }, [])

  // ADD GROUP FUNCTION
  function addGroup(newGroup) {
    console.log(newGroup)
    ref
      .doc(newGroup.id)
      .set(newGroup)
      .catch((err) => {
        console.error(err)
      })
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
    console.log('HELLO', props.mapUsername)
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
      <div>
        <div className="GroupsSubmitContainer">
          <TextField
            label="title:"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
          <br></br>
          <TextField
            label="data:"
            value={data}
            onChange={(e) => setData(e.target.value)}
          ></TextField>
          <br />
          <div>
            <Button onClick={() => addGroupValidation(title, data)}>
              Create
            </Button>
          </div>
        </div>
        <br />
      </div>
      <div>
        <br />
        <SoftBox
          title="GROUPS"
          content={groups.map((group) => (
            <div className="GroupsDiv">
              <div key={group.id}>
                {group.title}

                <button
                  className="GroupsJoin"
                  //onClick={() => groupInfo(group.data)}
                  onClick={() => props.groupInfoAction(group.data)}
                >
                  Info
                </button>
                <button
                  className="GroupsJoin"
                  onClick={() =>
                    userJoin({ id: group.id, user: props.mapUsername })
                  }
                >
                  Join
                </button>
              </div>
            </div>
          ))}
        ></SoftBox>
        <br />
      </div>

      <div id="groupInfo"> {props.mapInfoStr} </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { mapUsername: state.login.username, mapInfoStr: state.groups.info }
}

const mapDispatchToProps = (dispatch) => ({
  groupInfoAction: (infoStr) => dispatch(groupsAction(infoStr))
})

export const Group = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedGroup)
