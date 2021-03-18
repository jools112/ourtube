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
  const simpleAction = () => {
    props.simpleAction()
  }
  return (
    <div className="App">
      <TopBar />
      <button onClick={simpleAction}>test redux action</button>
      <pre>{JSON.stringify(props)}</pre>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/watch">
            <Watch />
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  simpleAction: () => dispatch(simpleAction())
})

export const App = connect(mapStateToProps, mapDispatchToProps)(unconnectedApp)
