/*
  Redux component!
*/
import { connect } from 'react-redux'
import { joinRoomAction } from '../../../actions/joinRoomAction'
import { useEffect } from 'react'
import { youtube } from './html5-youtube.js'
let conn
let player
function iAmControlling() {
  return (
    document.querySelector('#controller').innerHTML ==
    document.querySelector('#name').value
  )
}

const UnconnectedLogin = (props) => {
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

    conn = new WebSocket('ws://localhost:3000/test')

    conn.onmessage = function (ev) {
      debugger
      var matches
      if ((matches = ev.data.match(/^control (.+)$/))) {
        document.querySelector('#controller').innerHTML = matches[1]
      } else if ((matches = ev.data.match(/^userCount (.+)$/))) {
        // document.querySelector("#userCount").innerHTML = matches[1];
        document.getElementById('userCount').innerHTML = matches[1]
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
    document.querySelector('#username').innerHTML = document.querySelector(
      '#name'
    ).value
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
    // To Daniela: I disabled this row so that the joinRoomClick action won't be dispatched, so you don't need to think about Redux for now.
    return props.joinRoomClick()
  }

  const leaveRoomClick = () => {
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
          <p>
            Username: <input id="name" />
            <button onClick={joinRoomClick} id="join">
              Join Room
            </button>
          </p>
        </div>
        User: <span id="username"></span>
        <button onClick={leaveRoomClick} id="leave">
          Leave Room
        </button>
        <p>
          Users: <span id="userCount"></span>
        </p>
        <p>
          Controller: <span id="controller">---</span>
          <button onClick={takeControlRoomClick} id="takeControl">
            Take Control
          </button>
        </p>
        <p>
          <div
            id="my-youtube-player"
            className="player js-player"
            data-youtube-videoid="KFstP0C9sVk"
          ></div>
        </p>
      </div>
    </body>
  )
}

const mapStateToProps = (state) => {
  //console.log(state)
  return { ...state }
}

const mapDispatchToProps = (dispatch) => ({
  joinRoomClick: () => dispatch(joinRoomAction())
})

export const VideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedLogin)
