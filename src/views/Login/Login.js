/*
  Redux component!
*/
import { connect } from 'react-redux'
import { loginAction } from '../../actions/loginAction'

const unconnectedLogin = (props) => {
  const loginClick = () => {
    console.log('login button has been pushed!')
    return props.loginClick()
  }
  return (
    <div>
      <div>Please log in to continue...</div>
      <button onClick={loginClick}>Log in</button>
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
