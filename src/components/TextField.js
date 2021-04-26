import './TextField.css'
export const TextField = (props) => {
  return (
    <div className="TextField">
      <label className="TextFieldLabel">{props.label}</label>
      <input {...props} className="TextFieldInput"></input>
    </div>
  )
}
