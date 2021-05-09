/*
  Added Redux state (almost) according to tutorial: https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8
*/
import './App.css'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Explore } from './views/Explore/Explore'
import { Login } from './views/Login/Login'
import { simpleAction } from './actions/simpleAction'
import { validateLoggedInAction } from './actions/loginAction'
import { TopBar } from './views/TopBar/TopBar'
import { Watch } from './views/Watch/Watch'
import { useEffect } from 'react'

const unconnectedApp = (props) => {
  //const simpleAction = () => {
  //props.simpleAction()
  //}

  useEffect(() => props.validateLoggedInAction(), [])

  return (
    <div className="App">
      {
        //<button onClick={simpleAction}>test redux action</button>
        //<pre>{JSON.stringify(props)}</pre>
      }

      <BrowserRouter>
        <TopBar />
        <div className="AppMainContent">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/watch">
              <Watch videoId="KFstP0C9sVk" />
            </Route>
            <Route exact path="/explore">
              <Explore />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { mapLoggedIn: state.login.loggedIn }
}

const mapDispatchToProps = (dispatch) => ({
  simpleAction: () => dispatch(simpleAction()),
  validateLoggedInAction: () => dispatch(validateLoggedInAction())
})

export const App = connect(mapStateToProps, mapDispatchToProps)(unconnectedApp)
