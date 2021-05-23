import './Button.css'
export const Button = (props) => {
  return (
    <button
      {...props}
      className={props.disabled ? 'Button DisabledButton' : 'Button'}
      title={
        props.disabled
          ? 'Please join the group before entering the room!'
          : undefined
      }
    >
      {props.children}
    </button>
  )
}
