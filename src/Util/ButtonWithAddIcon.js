import classes from './Button.module.css'
import Button from './Button';

const ButtonWithAddIcon = (props)=> {
    const className = `${classes['button-container']} ${props.className}`
    return (
        <Button className={className} {...props.action}>
            <span className={classes['button-span']}><img src={props.image} alt='button action img' className={classes['button-image']} /></span>
            <span className={classes['button-span']}>{props.buttonName}</span>
        </Button>
    )
}

export default ButtonWithAddIcon