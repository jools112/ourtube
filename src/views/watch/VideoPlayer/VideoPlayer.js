/*
  Redux component!
*/
import { connect } from 'react-redux'
import { joinRoomAction } from '../../../actions/joinRoomAction'
const conn = new WebSocket('ws://localhost:8000/test')
function iAmControlling() {
  return $_('#controller').innerHTML == $_('#name').value
}

function $_(sel) {
  return document.querySelector(sel)
}
const unconnectedLogin = (props) => {
  React.useEffect(function () {
    const elPlayer = document.querySelector('.js-player');
    const player = window.player = youtube({ el: elPlayer });
    player.addEventListener('timeupdate', function () {
      debugger;
      if (iAmControlling()) conn.send(player.currentTime);
    }, true);
    player.addEventListener('pause', function () {
      if (iAmControlling()) conn.send('pause ' + player.currentTime);
    }, true);
  }, [])

  const joinRoomClick = () => {
    console.log('joinRoom button has been pushed!')
    conn.onmessage = function (ev) {
      var matches;
      if (matches = ev.data.match(/^control (.+)$/)) {
        $_('#controller').innerHTML = matches[1];
      } else if (matches = ev.data.match(/^userCount (.+)$/)) {
        // $_('#userCount').innerHTML = matches[1];
        document.getElementById('userCount').innerHTML = matches[1];
      } else if (matches = ev.data.match(/^pause (.+)$/)) {
        player.currentTime = matches[1];
        player.pause();
      } else {
        if (iAmControlling()) return;
        var estimatedTimeOnMaster = parseInt(ev.data) + 1;
        if (Math.abs(estimatedTimeOnMaster - player.currentTime) > 5)
          player.currentTime = estimatedTimeOnMaster;
        if (player.paused) player.play();
      }
    };
    return props.joinRoomClick()
  }
  const leaveRoomClick = () => {
    conn.close();
    $_('#room').className = 'inactive';
    $_('#registration').className = 'active';
  }
  const takeControlRoomClick = () => {
    conn.send('control ' + $_('#name').value);
  }
  return (
    <body>
      <div id='room' class='inactive'>
        <div id='registration' class='active'>
          <p>Username: {state.name} <input id='name' />
          1<button onClick={joinRoomClick} id='join'>Join Room</button>
          </p>
        </div>
        User: <span id='username'></span>
        <button onClick={leaveRoomClick} id='leave'>Leave Room</button>
        <p>Users: <span id='userCount'></span></p>
        <p>Controller: <span id='controller'>---</span>
          <button onClick={takeControlRoomClick} id='takeControl'>Take Control</button>
        </p>
        <p><div id='my-youtube-player' class='player js-player' data-youtube-videoid='KFstP0C9sVk'></div></p>

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
)(unconnectedLogin)
