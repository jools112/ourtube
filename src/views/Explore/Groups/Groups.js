import './Groups.css'
// eslint-disable-next-line
import { connect } from 'react-redux'
import { setGroupId, userJoinAction, addGroupAction, getGroupsAction, createGroupOffAction, createGroupAction, groupsAction } from '../../../actions/groupsActions'
import { Link } from 'react-router-dom'
import firebase from '../../../firebase'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'
import { strictEqual } from 'assert'

export const unconnectedGroup = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    props.getGroupsAction()
  }, [])

  return (
    <div>
      {props.mapCreateGroup ? (
        <div>
          <h1>Create Groups</h1>
          <div>
            <TextField
              label="Name: "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <br />
            <TextField
              label="Description: "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
            <br />
            <div>
              <Button onClick={() => props.createOffAction()}>
                Back
                  </Button>
                  &nbsp;
                  &nbsp;
                  <Button onClick={() => props.addGroupAction({ name, description, id: uuidv4(), playlist: [] })} >
                Create
                  </Button>
            </div>
          </div>
          <div>{props.mapValidation ? (props.mapValidation) : (props.mapValidation)}</div>
        </div>
      ) : (
        <div>
          <div>
            <SoftBox
              title="GROUPS"
              content={props.mapGroups.map((group) => (

                <div className="GroupsDiv">
                  <div key={group.id} >

                    <Link to="/watch">
                      <h4 onClick={() => props.setGroupId(group.id)}>{group.name}</h4>
                    </Link>
                    <button
                      className="GroupsJoin"
                      onClick={() => props.groupInfoAction(group.description)}
                    >
                      Info
                </button>
                    <button
                      className="GroupsJoin"
                      onClick={() =>
                        props.userJoinAction({ id: group.id, member: props.mapUsername })}
                    >
                      Join
                </button>
                  </div>
                </div>
              ))}
            ></SoftBox>
          </div>
          <Button onClick={() => props.createAction()}>Create Group</Button>
          <br />
          {/* This is a validation message, will print 
          "Log in to join a group if the current username is ''.
          Will print "You have joined the group" if the username is set */}
          {props.mapLogValid}
          <br />
          Group Description: {props.mapInfoStr}
        </div>
      )
      }
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    mapUsername: state.login.username,
    mapInfoStr: state.groups.info,
    mapCreateGroup: state.groups.createGroup,
    mapGroups: state.groups.groupsData,
    mapValidation: state.groups.validation,
    mapCurrentGroup: state.groups.currentGroup,
    mapLogValid: state.groups.loggedInValid
  }
}

const mapDispatchToProps = (dispatch) => ({
  groupInfoAction: (infoStr) => dispatch(groupsAction(infoStr)),
  createAction: () => dispatch(createGroupAction()),
  createOffAction: () => dispatch(createGroupOffAction()),
  getGroupsAction: () => dispatch(getGroupsAction()),
  addGroupAction: (newGroup) => dispatch(addGroupAction(newGroup)),
  userJoinAction: (userToAdd) => dispatch(userJoinAction(userToAdd)),
  setGroupId: (groupId) => dispatch(setGroupId(groupId))
})

export const Group = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedGroup)
