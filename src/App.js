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
import { TopBar } from './views/TopBar/TopBar'
import { Watch } from './views/Watch/Watch'

const unconnectedApp = (props) => {
  //const simpleAction = () => {
  //props.simpleAction()
  //}
  return (
    <div className="App">
      {
        //<button onClick={simpleAction}>test redux action</button>
        //<pre>{JSON.stringify(props)}</pre>
      }

      <BrowserRouter>
        <TopBar />
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
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = (dispatch) => ({
  simpleAction: () => dispatch(simpleAction())
})

export const App = connect(mapStateToProps, mapDispatchToProps)(unconnectedApp)
