import './App.css'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Explore } from './views/explore/Explore'
import { Watch } from './views/watch/Watch'

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Explore />
          </Route>
          <Route exact path="/watch">
            <Watch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
