import './App.css'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Explore } from './views/Explore/Explore'
import { Login } from './views/Login/Login'
import { TopBar } from './views/TopBar/TopBar'
import { Watch } from './views/Watch/Watch'

export const App = () => {
  return (
    <div className="App">
      <TopBar />
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
