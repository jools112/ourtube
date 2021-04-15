import './Login.css'
import { connect } from 'react-redux'
import { loginAction } from '../../actions/loginAction'
import { Button } from '../../components/Button'

const unconnectedLogin = (props) => {
  const loginClick = () => {
    console.log('login button has been pushed!')
    return props.loginClick()
  }
  return (
    <div>
      <span className="LoginSpan">Please log in to continue...</span>
      <Button onClick={loginClick}>Log in</Button>
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
