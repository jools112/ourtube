import './VideoPlayer.css'
import { connect } from 'react-redux'
import {
  joinRoomActionCreator,
  takeControlActionCreator,
  userCountActionCreator,
  VideoIdActionCreator,
  UserNameActionCreator
} from '../../../actions/videoPlayerActionCreators'
import { useEffect } from 'react'
import { youtube } from './html5-youtube.js'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
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
    if (!props.stateUserName) {
      props.dispatchUserNameActionCreator(readCookie('session'))
    }
    //conn = new WebSocket('ws://localhost:3000/test')

    conn = new WebSocket('ws://193.122.13.192:3000/test')
    conn.onmessage = function (ev) {
      var matches
      console.log(ev, ev.data)
      if ((matches = ev.data.match(/^control (.+)$/))) {
        //debugger
        console.log(matches[1])
        props.dispatchTakeControlActionCreator(matches[1])
      } else if ((matches = ev.data.match(/^userCount (.+)$/))) {
        props.dispatchUserCountActionCreator(matches[1])
      } else if ((matches = ev.data.match(/^pause (.+)$/))) {
        player.currentTime = matches[1]
        player.pause()
      } else {
        //debugger
        console.log(props.stateControlName, props.stateUserName)
        if (props.stateControlName == props.stateUserName) return
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
        console.log('ipaddress:' + res.ip)
        conn.send('ipaddress:' + res.ip)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    // TODO: Only run this if the user has joined the room?
    player.removeEventListener('timeupdate', timeUpdate)
    player.addEventListener('timeupdate', timeUpdate, true)
  }, [props.stateControlName, props.stateUserName])

  const timeUpdate = () => {
    if (props.stateControlName == props.stateUserName)
      conn.send(player.currentTime)
  }

  const joinRoomClick = () => {
    console.log('joinRoom button has been pushed!')
    props.dispatchJoinRoomActionCreator(document.querySelector('#name').value)
    document.querySelector('#room').className = 'active'
    document.querySelector('#registration').className = 'inactive'

    player.addEventListener(
      'pause',
      function () {
        if (props.stateControlName == props.stateUserName)
          conn.send('pause ' + player.currentTime)
      },
      true
    )
  }

  const leaveRoomClick = () => {
    props.dispatchJoinRoomActionCreator('room not joined yet')
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
              <TextField
                id="name"
                label="Username:"
                value={props.stateUserName}
              />
            </div>
            <div>
              <Button onClick={joinRoomClick} id="join">
                Join Room
              </Button>
              <div>{props.stateName}</div>
            </div>
          </div>
        </div>
        User: <span id="username"></span>
        <Button onClick={leaveRoomClick} id="leave">
          Leave Room
        </Button>
        <p>
          Users: <span id="userCount">{props.stateUserCount}</span>
        </p>
        <p>
          Controller:{' '}
          <span id="controller">{'randomstring' + props.stateControlName}</span>
          <Button
            onClick={() => takeControlRoomClick(props.stateUserName)}
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
    stateUserName: state.videoPlayer.username,
    stateName: state.videoPlayer.name,
    stateControlName: state.videoPlayer.controlName,
    stateUserCount: state.videoPlayer.userCount,
    stateVideoId: state.videoId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchJoinRoomActionCreator: (name) =>
      dispatch(joinRoomActionCreator(name)),

    dispatchTakeControlActionCreator: (controlName) =>
      dispatch(takeControlActionCreator(controlName)),

    dispatchUserCountActionCreator: (userCount) =>
      dispatch(userCountActionCreator(userCount)),

    dispatchVideoIdActionCreator: (videoId) =>
      dispatch(VideoIdActionCreator(videoId)),

    dispatchUserNameActionCreator: (username) =>
      dispatch(UserNameActionCreator(username))
  }
}

export const VideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedVideoPlayer)
