import classes from './Button.module.css'

const Button = (props)=> {
    const className = `${props.className} ${classes['button']}`
    return (
        <button  {...props} className={className}>{props.children}</button>
    )
}

export default Button