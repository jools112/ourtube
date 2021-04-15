import './TopBar.css'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'

export const TopBar = () => {
  return (
    <div className="TopBar">
      <div className="TopBarLogo">OurTube</div>
      <div className="TopBarStatus">Welcome, Unknown user</div>
      <div>
        <Link to="">
          <Button>Log out</Button>
        </Link>
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
      <input
        className="TopBarSearch"
        placeholder="Search for a video..."
      ></input>
    </div>
  )
}
