import './TopBar.css'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { connect } from 'react-redux'
import { logoutAction } from '../../actions/loginAction'

// TODO: make the rest of the topbar buttons invisible as you are logged out and fix corresponding CSS

export const unconnectedTopBar = (props) => {
  return (
    <div className="TopBar">
      <div className="TopBarLogo">OurTube</div>
      <div className="TopBarStatus">
        Welcome{props.mapLoggedIn ? ', ' + props.mapUsername + '!' : '!'}
      </div>
      <div>
        {props.mapLoggedIn ? (
          <div>
            <Link to="">
              <Button onClick={() => props.logout()}>Log out</Button>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        <Link to="/explore">
          <Button>To Explore page</Button>
        </Link>
      </div>
      <div>
        <Link to="/watch">
          <Button>To Watch page</Button>
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
  setUsername: (letters) => dispatch(setUsernameActionCreator(letters)),
  logout: () => dispatch(logoutAction())
})
export const TopBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedTopBar)
