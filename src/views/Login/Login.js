import './Login.css'
import { connect } from 'react-redux'
import { loginAction } from '../../actions/loginAction'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'

const unconnectedLogin = (props) => {
  const loginClick = () => {
    console.log('login button has been pushed!')
    return props.loginClick()
  }
  return (
    <div>
      <br />
      <span className="LoginSpan">Please log in to continue...</span>
      <Link to="/explore">
        <Button onClick={loginClick}>Log in</Button>
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  //console.log(state)
  return { ...state }
}

const mapDispatchToProps = (dispatch) => ({
  loginClick: () => dispatch(loginAction())
})

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedLogin)
