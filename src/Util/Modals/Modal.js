import Backdrop from '../Backdrop';
import classes from './Modal.module.css';
const Modal = (props) => {

    return (
       <Backdrop removeBackdrop = {props.removeBackdrop}>
            <div className={classes.modal} onClick={(event) => {event.stopPropagation(); }}>
                <h1>hey</h1>
            </div>
       </Backdrop>
    )

}

export default Modal;