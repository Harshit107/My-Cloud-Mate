import classes from './Button.module.css'

const Button = (props)=> {
    const className = `${classes['button']} ${props.className}`
    return (
        <button  {...props} className={className}>{props.children}</button>
    )
}

export default Button