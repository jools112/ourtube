import './VideoPlayer.css'
import { connect } from 'react-redux'
import {
  joinRoomActionCreator,
  takeControlActionCreator,
  userCountActionCreator
} from '../../../actions/videoPlayerActionCreators'
import { useEffect } from 'react'
import { youtube } from './html5-youtube.js'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'

let conn
let player
function iAmControlling() {
  return (
    document.querySelector('#controller').innerHTML ==
    document.querySelector('#name').value
  )
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

    if (document.querySelector('#name').value == '') {
      document.querySelector('#name').value =
        'user' + parseInt(99999 * Math.random())
    }

    conn = new WebSocket('ws://193.122.13.192:3000/test')
    conn.onmessage = function (ev) {
      debugger
      var matches
      if ((matches = ev.data.match(/^control (.+)$/))) {
        props.dispatchTakeControlActionCreator(matches[1])
      } else if ((matches = ev.data.match(/^userCount (.+)$/))) {
        props.dispatchUserCountActionCreator(matches[1])
      } else if ((matches = ev.data.match(/^pause (.+)$/))) {
        player.currentTime = matches[1]
        player.pause()
      } else {
        if (iAmControlling()) return
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

  const joinRoomClick = () => {
    console.log('joinRoom button has been pushed!')
    props.dispatchJoinRoomActionCreator(document.querySelector('#name').value)
    document.querySelector('#room').className = 'active'
    document.querySelector('#registration').className = 'inactive'
    player.addEventListener(
      'timeupdate',
      function () {
        debugger
        if (iAmControlling()) conn.send(player.currentTime)
      },
      true
    )
    player.addEventListener(
      'pause',
      function () {
        if (iAmControlling()) conn.send('pause ' + player.currentTime)
      },
      true
    )
  }

  const leaveRoomClick = () => {
    props.dispatchJoinRoomActionCreator('room not joined yet')
    props.dispatchTakeControlActionCreator('---')
    conn.send('control ' + '---')

    conn.close()
    document.querySelector('#room').className = 'inactive'
    document.querySelector('#registration').className = 'active'
  }
  const takeControlRoomClick = () => {
    conn.send('control ' + document.querySelector('#name').value)
  }
  return (
    <body>
      <div id="room" className="inactive">
        <div id="registration" className="active">
          <div className="VideoPlayerTextField">
            <div className="VideoPlayerUsername">
              <TextField id="name" label="Username:" />
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
          Controller: <span id="controller">{props.stateControlName}</span>
          <button onClick={takeControlRoomClick} id="takeControl">
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
                data-youtube-videoid="KFstP0C9sVk"
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
    stateName: state.videoPlayer.name,
    stateControlName: state.videoPlayer.controlName,
    stateUserCount: state.videoPlayer.userCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchJoinRoomActionCreator: (name) =>
      dispatch(joinRoomActionCreator(name)),
    dispatchTakeControlActionCreator: (controlName) =>
      dispatch(takeControlActionCreator(controlName)),
    dispatchUserCountActionCreator: (userCount) =>
      dispatch(userCountActionCreator(userCount))
  }
}

export const VideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedVideoPlayer)
