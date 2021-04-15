import './Groups.css'
// eslint-disable-next-line
import firebase from '../../../firebase'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'

export const Group = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [data, setData] = useState('')

  const ref = firebase.firestore().collection('groups')

  function getSchools() {
    setLoading(true)
    ref.onSnapshot((querySnapshot) => {
      const items = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setGroups(items)
      setLoading(false)
    })
  }

  function groupInfo(data) {
    document.getElementById('groupInfo').innerHTML = data
  }

  useEffect(() => {
    getSchools()
  }, [])

  // ADD FUNCTION
  function addGroup(newGroup) {
    ref
      .doc(newGroup.id)
      .set(newGroup)
      .catch((err) => {
        console.error(err)
      })
  }

  if (loading) {
    return <h1 className="GroupsLoading">Loading...</h1>
  }

  return (
    <div>
      <div>
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
          <Button onClick={() => addGroup({ title, data, id: uuidv4() })}>
            Submit
          </Button>
        </div>
        <br />
        <div>
          <Button>Create</Button>
        </div>
      </div>
      <div>
        <br />
        <SoftBox
          title="GROUPS"
          content={groups.map((group) => (
            <div className="GroupsButton">
              <Button key={group.id} onClick={() => groupInfo(group.data)}>
                {group.title}
              </Button>
            </div>
          ))}
        ></SoftBox>
        <br />
      </div>

      <div id="groupInfo"></div>
    </div>
  )
}
