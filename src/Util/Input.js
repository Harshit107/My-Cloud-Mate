
import classes from './input.module.css'

const Input = (props) => { 

   const className = `${classes.inputBox} ${props.className}`
   return (
     <div className={className}>
        <input {...props.input}  
        />
        <span> {props.input.name}</span>
        {props.children}
     </div>
   )
}
export default Input;