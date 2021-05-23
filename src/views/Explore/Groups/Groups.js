import './Groups.css'
// eslint-disable-next-line
import { connect } from 'react-redux'
import {
  setGroupId,
  userJoinAction,
  addGroupAction,
  getGroupsAction,
  createGroupOffAction,
  createGroupAction,
  groupsAction
} from '../../../actions/groupsActions'
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
              <Button onClick={() => props.createOffAction()}>Back</Button>
              &nbsp; &nbsp;
              <Button
                onClick={() =>
                  props.addGroupAction({
                    name,
                    description,
                    id: uuidv4(),
                    playlist: [],
                    membersjoined: []
                  })
                }
              >
                Create
              </Button>
            </div>
          </div>
          <div>
            {props.mapValidation ? props.mapValidation : props.mapValidation}
          </div>
        </div>
      ) : props.mapGroups.length > 0 ? (
        <div>
          <div className="SoftBoxWrapper">
            {/* {props.mapCurrentGroup} */}

            <SoftBox
              title="GROUPS"
              content={
                <div className="GroupsContainer">
                  {props.mapGroups.map((group, index) => (
                    <div className="GroupsSubContainer" key={index}>
                      <SoftBox
                        title={group.name}
                        content={
                          <>
                            <div className="GroupsInfo">
                              {group.description}
                            </div>
                            <div className="GroupsContentButtons">
                              <Button
                                className="GroupsJoin"
                                onClick={() =>
                                  props.userJoinAction({
                                    id: group.id,
                                    member: props.mapUsername
                                  })
                                }
                                disabled={(group.members || []).includes(
                                  props.mapUsername
                                )}
                              >
                                Join
                              </Button>
                              <Link to="/watch">
                                <Button
                                  onClick={() => props.setGroupId(group.id)}
                                  disabled={
                                    !(group.members || []).includes(
                                      props.mapUsername
                                    )
                                  }
                                >
                                  Go to room
                                </Button>
                              </Link>
                            </div>
                          </>
                        }
                      ></SoftBox>
                    </div>
                  ))}
                </div>
              }
            ></SoftBox>
          </div>
          <div className="CreateGroupButton">
            <Button onClick={() => props.createAction()}>Create Group</Button>
          </div>
          {/* This is a validation message, will print 
          "Log in to join a group if the current username is ''.
          Will print "You have joined the group" if the username is set */}
          {props.mapLogValid}
        </div>
      ) : (
        '\nloading...'
      )}
    </div>
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
