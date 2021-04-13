import './Groups.css'
// eslint-disable-next-line
import { ResponsiveContainer } from 'recharts'
import firebase from "../../../firebase"
import React, { useState } from "react";
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";



export const Group = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");

  const ref = firebase.firestore().collection("groups");

  function getSchools() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setGroups(items);
      setLoading(false);
    });
  }

  function groupInfo(data) {
    document.getElementById("groupInfo").innerHTML = data;
  }

  useEffect(() => {
    getSchools();
  }, []);


  // ADD FUNCTION
  function addGroup(newGroup) {
    ref
      .doc(newGroup.id)
      .set(newGroup)
      .catch((err) => {
        console.error(err);
      });
  }



  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <div>
        title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br></br>
        data
        <textarea value={data} onChange={(e) => setData(e.target.value)} />
        <button onClick={() => addGroup({ title, data, id: uuidv4() })}>
          Submit
        </button>
      </div>
      <div className="GroupMax">
        <div className="Create">
          GROUPS <button className="CreateButton">Create</button>
        </div>
        <div className="GroupAll">
          {groups.map((group) => (
            <button className="GroupBox" key={group.id} onClick={() => groupInfo(group.data)}>{group.title}</button>
          ))}

        </div>
      </div>
      <div id="groupInfo"></div>


    </div>
  )
}
