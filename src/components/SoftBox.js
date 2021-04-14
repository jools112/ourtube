/** Main component for presenting data */
import './SoftBox.css'

export const SoftBox = (props) => {
  return (
    <div className="SoftBox">
      <div className="SoftBoxHeader">{props.title}</div>
      <div {...props} className="SoftBoxBody"></div>
      {props.content}
    </div>
  )
}
