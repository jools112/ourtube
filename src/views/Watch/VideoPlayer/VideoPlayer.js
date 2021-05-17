import './VideoPlayer.css'
import { connect } from 'react-redux'
import {
  joinRoomActionCreator,
  leaveRoomActionCreator,
  takeControlActionCreator,
  userCountActionCreator,
  VideoIdActionCreator,
  UserNameActionCreator,
  UserNameJoinedActionCreator
} from '../../../actions/videoPlayerActionCreators'
import { useEffect } from 'react'
import { youtube } from './html5-youtube.js'
import { Button } from '../../../components/Button'
import { SoftBox } from '../../../components/SoftBox'
import { useSelector } from 'react-redux'
import firebase from '../../../firebase'

let currentGroup
let conn
let player
const ref = firebase.firestore()

function readCookie(name) {
  let nameCookie = name + '='
  let cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameCookie) == 0)
      return c.substring(nameCookie.length, c.length)
  }
  return null
}

const UnconnectedVideoPlayer = (props) => {
  currentGroup = useSelector((state) => state.groups.currentGroup)
  useEffect(() => {
    const scriptHtml5 = document.createElement('script')
    scriptHtml5.src = 'html5-youtube.js'
    scriptHtml5.async = false
    document.body.appendChild(scriptHtml5)
    const scriptYoutube = document.createElement('script')
    scriptYoutube.src = 'https://www.youtube.com/iframe_api'
    scriptYoutube.async = false
    document.body.appendChild(scriptYoutube)
    let groupRef = ref.collection('group').doc(currentGroup)
    let videoId = ''
    groupRef.onSnapshot((doc) => {
      if (doc.exists) {
        if (doc.data().playlist[0]) {
          videoId = doc.data().playlist[0].id
          props.dispatchVideoIdActionCreator(videoId)
          player.src = videoId
        }
      }
    })
    let elPlayer = document.querySelector('.js-player')
    player = window.player = youtube({ el: elPlayer })
    if (!props.newStateUserName) {
      props.dispatchUserNameActionCreator(readCookie('session'))
    }

    //conn = new WebSocket('ws://localhost:3000/test')
    conn = new WebSocket('ws://193.122.13.192:3000/test')

    conn.onmessage = function (ev) {
      let matches
      if ((matches = ev.data.match(/^control (.+)$/))) {
        props.dispatchTakeControlActionCreator(matches[1])
      } else if ((matches = ev.data.match(/^pause (.+)$/))) {
        player.currentTime = matches[1]
        player.pause()
      } else {
        if (props.stateControlName == props.newStateUserName) return
        let estimatedTimeOnMaster = parseInt(ev.data) + 1
        if (Math.abs(estimatedTimeOnMaster - player.currentTime) > 5)
          player.currentTime = estimatedTimeOnMaster
        if (player.paused) player.play()
      }
    }
    fetch('https://api.ipify.org?format=json')
      .then((response) => {
        return response.json()
      })
      .then((res) => {
        conn.send('ipaddress:' + res.ip)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    player.removeEventListener('timeupdate', timeUpdate)
    player.addEventListener('timeupdate', timeUpdate, true)
    player.removeEventListener('pause', timePause)
    player.addEventListener('pause', timePause, true)
  }, [props.stateControlName, props.newStateUserName])

  const timeUpdate = () => {
    if (!player.paused && props.stateControlName == props.newStateUserName)
      conn.send(player.currentTime)
  }
  const timePause = () => {
    if (props.stateControlName == props.newStateUserName)
      conn.send('pause ' + player.currentTime)
  }

  const leaveControlClick = () => {
    props.dispatchLeaveRoomActionCreator()
    props.dispatchTakeControlActionCreator('--?')
    conn.send('control ' + '--!')
  }

  const leaveRoomClick = () => {
    let groupRef = ref.collection('group').doc(currentGroup)
    let usersJoined = []
    groupRef
      .get()
      .then((doc) => {
        debugger
        if (doc.exists) {
          usersJoined = doc.data().membersjoined
          if (usersJoined.includes(props.newStateUserName)) {
            usersJoined = usersJoined.filter(function (value) {
              return value != props.newStateUserName
            })
            groupRef
              .set(
                {
                  membersjoined: usersJoined
                },
                { merge: true }
              )
              .catch((err) => {
                console.error(err)
              })
          }
          props.dispatchUserNameJoinedActionCreator(usersJoined.join(', '))
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  }
  const joinRoomClick = () => {
    let groupRef = ref.collection('group').doc(currentGroup)
    let usersJoined = []
    groupRef.get().then((doc) => {
      if (doc.exists) {
        usersJoined = doc.data().membersjoined
        if (!usersJoined.includes(props.newStateUserName)) {
          usersJoined.push(props.newStateUserName)
          groupRef
            .set(
              {
                membersjoined: usersJoined
              },
              { merge: true }
            )
            .catch((err) => {
              console.error(err)
            })
        }
        //  props.dispatchUserNameJoinedActionCreator(usersJoined.join(', '))
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    })
    let usersJoined2 = []
    groupRef.onSnapshot((doc) => {
      if (doc.exists) {
        usersJoined2 = doc.data().membersjoined
        props.dispatchUserNameJoinedActionCreator(usersJoined2.join(', '))
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    })
  }
  const nextVideoClick = (currentVideoId) => {
    let groupRef = ref.collection('group').doc(currentGroup)
    let playlist = []
    let newPlaylist = []
    groupRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          playlist = doc.data().playlist
          let foundSong = playlist.filter((e) => e.id == currentVideoId)
          if (foundSong) {
            newPlaylist = playlist.filter((e) => e.id != currentVideoId)
            groupRef
              .set(
                {
                  playlist: newPlaylist
                },
                { merge: true }
              )
              .catch((err) => {
                console.error(err)
              })
          }
          groupRef.onSnapshot((doc) => {
            if (doc.exists) {
              if (doc.data().playlist[0]) {
                let videoId = doc.data().playlist[0].id
                props.dispatchVideoIdActionCreator(videoId)
                player.src = videoId
              }
            }
          })
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
  }
  const takeControlRoomClick = (name) => {
    conn.send('control ' + name)
  }

  return (
    <div>
      <div id="room" className="inactive">
        <div id="registration" className="active">
          <div className="VideoPlayerTextField">
            <div>
              {/* <div>{props.newStateUserName + ' has joined the room'}</div> */}
            </div>
          </div>
        </div>
      </div>
      <Button onClick={leaveControlClick} id="leave">
        Leave Control
      </Button>
      <Button onClick={leaveRoomClick} id="leave">
        Leave Room
      </Button>
      <p>
        Users: <span id="userCount">{props.stateUserCount}</span>
      </p>
      <p>
        Users joined: <span id="userJoined">{props.stateUserNameJoined}</span>
      </p>
      <p>
        Controller: <span id="controller">{props.stateControlName}</span>
        <Button
          onClick={() => takeControlRoomClick(props.newStateUserName)}
          id="takeControl"
        >
          Take Control
        </Button>
        <Button
          onClick={() => joinRoomClick(props.newStateUserName)}
          id="joinRoom"
        >
          Join Room
        </Button>
      </p>
      <p>
        <Button
          onClick={() => nextVideoClick(props.stateVideoId)}
          id="takeControl"
        >
          Next Video
        </Button>
      </p>
      <p>
        Users joined: <span id="userJoined">{props.stateUserNameJoined}</span>
      </p>

      <div className="VideoPlayerContent">
        <SoftBox
          title="VIDEO PLAYER"
          content={
            <div
              id="my-youtube-player"
              className="player js-player"
              data-youtube-videoid={props.stateVideoId}
            ></div>
          }
          padding="disabled"
        ></SoftBox>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    stateJoined: state.videoPlayer.joined,
    stateControlName: state.videoPlayer.controlName,
    stateUserCount: state.videoPlayer.userCount,
    stateVideoId: state.videoPlayer.videoId,
    newStateUserName: state.login.username,
    stateUserNameJoined: state.videoPlayer.userNameJoined
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchJoinRoomActionCreator: () => dispatch(joinRoomActionCreator()),

    dispatchLeaveRoomActionCreator: () => dispatch(leaveRoomActionCreator()),

    dispatchTakeControlActionCreator: (controlName) =>
      dispatch(takeControlActionCreator(controlName)),

    dispatchUserCountActionCreator: (userCount) =>
      dispatch(userCountActionCreator(userCount)),

    dispatchVideoIdActionCreator: (videoId) =>
      dispatch(VideoIdActionCreator(videoId)),

    dispatchUserNameActionCreator: (username) =>
      dispatch(UserNameActionCreator(username)),

    dispatchUserNameJoinedActionCreator: (userNameJoined) =>
      dispatch(UserNameJoinedActionCreator(userNameJoined))
  }
}

export const VideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedVideoPlayer)
