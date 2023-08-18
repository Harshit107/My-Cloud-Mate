import ReactDom from 'react-dom'
import classes from './Backdrop.module.css'
const Backdrop = (props) => {

    const handleRemoveBackdrop = () => {
        props.removeBackdrop();
    }

    const backDrop = document.getElementById('backdrop');
    return ReactDom.createPortal(
        <div className={classes.blur} onClick={handleRemoveBackdrop} >
            {props.children}
        </div>,
        backDrop
    )

}

export default Backdrop;