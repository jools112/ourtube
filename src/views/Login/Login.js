import './Login.css'
import { connect } from 'react-redux'
import { loginAction } from '../../actions/loginAction'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'
import { TextField } from '../../components/TextField'

const unconnectedLogin = (props) => {
  const loginClick = (username) => {
    debugger
    console.log('login button has been pushed!' + props.mapUsername)
    return props.loginClick(username)
  }
  return (
    <div>
      <br />
      <span className="LoginSpan">Please log in to continue...</span>
      <div>
        <TextField id="username" label="Username:" />
        <Button
          onClick={() => {
            loginClick('testusername')
          }}
        >
          Log in
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { mapUsername: state.login.username }
}

const mapDispatchToProps = (dispatch) => ({
  loginClick: (username) => dispatch(loginAction(username))
})

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedLogin)
