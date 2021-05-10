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

let conn
let player
function readCookie(name) {
  var nameCookie = name + '='
  var cookies = document.cookie.split(';')
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameCookie) == 0)
      return c.substring(nameCookie.length, c.length)
  }
  return null
}

const UnconnectedVideoPlayer = (props) => {
  useEffect(() => {
    const scriptHtml5 = document.createElement('script')
    scriptHtml5.src = 'html5-youtube.js'
    scriptHtml5.async = false
    document.body.appendChild(scriptHtml5)
    const scriptYoutube = document.createElement('script')
    scriptYoutube.src = 'https://www.youtube.com/iframe_api'
    scriptYoutube.async = false
    document.body.appendChild(scriptYoutube)

    let elPlayer = document.querySelector('.js-player')
    player = window.player = youtube({ el: elPlayer })
    if (!props.newStateUserName) {
      props.dispatchUserNameActionCreator(readCookie('session'))
    }
    conn = new WebSocket('ws://localhost:3000/test')

    //conn = new WebSocket('ws://193.122.13.192:3000/test')
    conn.onmessage = function (ev) {
      var matches
      console.log(ev, ev.data)
      if ((matches = ev.data.match(/^control (.+)$/))) {
        console.log('CONTROL')
        //debugger
        console.log(matches[1])
        props.dispatchTakeControlActionCreator(matches[1])
      } else if ((matches = ev.data.match(/^userCount (.+)$/))) {
        console.log('USERCOUNT')
        props.dispatchUserCountActionCreator(matches[1])
      } else if ((matches = ev.data.match(/^pause (.+)$/))) {
        console.log('PAUSE')
        player.currentTime = matches[1]
        player.pause()
      } else if ((matches = ev.data.match(/^username(.+)$/))) {
        debugger
        console.log('USERNAME')
        props.dispatchUserNameJoinedActionCreator(matches[1])
      } else {
        //console.log('NONE OF THE ABOVE')
        //debugger
        console.log(props.stateControlName, props.newStateUserName)
        if (props.stateControlName == props.newStateUserName) return
        var estimatedTimeOnMaster = parseInt(ev.data) + 1
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
        console.log('username:' + readCookie('session'))
        conn.send('username:' + readCookie('session'))
        console.log('ipaddress:' + res.ip)
        conn.send('ipaddress:' + res.ip)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    // TODO: Only run this if the user has joined the room?
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
    //debugger
    if (props.stateControlName == props.newStateUserName)
      conn.send('pause ' + player.currentTime)
  }

  const joinRoomClick = () => {
    console.log('joinRoom button has been pushed!')
    props.dispatchJoinRoomActionCreator()
    document.querySelector('#room').className = 'active'
    document.querySelector('#registration').className = 'inactive'
  }

  const leaveRoomClick = () => {
    props.dispatchLeaveRoomActionCreator()
    props.dispatchTakeControlActionCreator('--?')
    conn.send('control ' + '--!')

    conn.close()
    document.querySelector('#room').className = 'inactive'
    document.querySelector('#registration').className = 'active'
  }
  const takeControlRoomClick = (name) => {
    conn.send('control ' + name)
  }

  console.log('re-render', props)

  return (
    <body>
      <div id="room" className="inactive">
        <div id="registration" className="active">
          <div className="VideoPlayerTextField">
            <div className="VideoPlayerUsername">
              {/*<TextField
                id="name"
                label="Username:"
                value={props.newStateUserName}
              />*/}
            </div>
            <div>
              {/* <Button onClick={joinRoomClick} id="join">
                Join Room
            </Button>*/}
              <div>{props.newStateUserName + ' has joined the room'}</div>
            </div>
          </div>
        </div>
        <Button onClick={leaveRoomClick} id="leave">
          Leave Control
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
        </p>
        <div className="VideoPlayerContent">
          <SoftBox
            title="VIDEO PLAYER"
            content={
              <div
                id="my-youtube-player"
                className="player js-player"
                data-youtube-videoid="2HwgXcPaFm8"
              ></div>
            }
            padding="disabled"
          ></SoftBox>
        </div>
      </div>
    </body>
  )
}

const mapStateToProps = (state) => {
  return {
    //StateUserName: state.videoPlayer.username,
    //stateName: state.videoPlayer.name,
    stateJoined: state.videoPlayer.joined,
    stateControlName: state.videoPlayer.controlName,
    stateUserCount: state.videoPlayer.userCount,
    stateVideoId: state.videoId,
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
