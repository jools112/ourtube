import './TopBar.css'
export const TopBar = () => {
  return (
    <div className="TopBar">
      <div className="TopBarLogo">OurTube</div>
      <div className="TopBarStatus">Unknown user</div>
      <input
        className="TopBarSearch"
        placeholder="Search for a video..."
      ></input>
    </div>
  )
}
