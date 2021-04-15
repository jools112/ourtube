import './Button.css'
export const Button = (props) => {
  return (
    <button {...props} className="Button">
      {props.children}
    </button>
  )
}
