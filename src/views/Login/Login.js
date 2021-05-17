import './Login.css'
import { connect } from 'react-redux'
import {
  loginAction,
  setUsernameActionCreator
} from '../../actions/loginAction'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'
import { TextField } from '../../components/TextField'

const unconnectedLogin = (props) => {
  return (
    <div className="LoginContent">
      <h2>
        Welcome to OurTube! This is an app for watching videos together with
        your friends. To start, chose a username and press Log in.
      </h2>

      <div className="LoginTextfield">
        <TextField
          id="username"
          label="Username:"
          pattern="[a-zA-Z0-9\s]+"
          onChange={(e) => {
            props.setUsername(e.target.value)
          }}
        />
      </div>
      <div className="LoginButton">
        <Link to="/explore">
          <Button
            onClick={() => {
              props.login(props.mapUsername)
            }}
          >
            Log in
          </Button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    mapUsername: state.login.username,
    mapLoggedIn: state.login.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (username) => dispatch(loginAction(username)),
  setUsername: (letters) => dispatch(setUsernameActionCreator(letters))
})

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedLogin)
