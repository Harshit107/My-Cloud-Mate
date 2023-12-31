import Backdrop from '../Backdrop';
import classes from './Modal.module.css';
const Modal = (props) => {

    return (
        <Backdrop removeBackdrop={props.removeBackdrop}>

            <div className={classes.modal} onClick={(event) => { event.stopPropagation(); }}>
                <h2>{props.title}</h2>
                <div className={classes.modelElement}>
                    {props.children}
                </div>
            </div>
        </Backdrop>
    )

}

export default Modal;