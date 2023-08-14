import classes from './Button.module.css'
import PlusImage from '../images/plus.png';
import Button from './Button';

const ButtonWithAddIcon = (props)=> {

    return (
        <Button className={classes['button-container']}>
            <span className={classes['button-span']}><img src={PlusImage} alt='plus' className={classes['button-image']} /></span>
            <span className={classes['button-span']}>Create Project</span>
        </Button>
    )
}

export default ButtonWithAddIcon