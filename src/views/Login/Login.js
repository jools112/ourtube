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
  const loginClick = (username) => {
    //debugger
    console.log('login button has been pushed!' + props.mapUsername)
    return props.login(username)
  }
  return (
    <div>
      <br />
      <span className="LoginSpan">Please log in to continue...</span>
      <div>
        <TextField
          id="username"
          label="Username:"
          onChange={(e) => {
            props.setUsername(e.target.value)
            //console.log('result of input', props.mapUserLetters.target.value)
          }}
        />
        <Link to="/explore">
          {' '}
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
