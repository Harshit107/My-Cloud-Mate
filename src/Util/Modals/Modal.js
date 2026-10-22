import Backdrop from '../Backdrop';
import classes from './Modal.module.css';

const Modal = (props) => {
    return (
        <Backdrop removeBackdrop={props.removeBackdrop}>
            <div className={classes.modal} onClick={(event) => event.stopPropagation()}>
                <div className={classes.modalHeader}>
                    <h2 className={classes.modalTitle}>{props.title}</h2>
                    {props.removeBackdrop && (
                        <button
                            type="button"
                            className={classes.closeBtn}
                            onClick={props.removeBackdrop}
                            aria-label="Close modal"
                        >
                            &times;
                        </button>
                    )}
                </div>
                <div className={classes.modelElement}>
                    {props.children}
                </div>
            </div>
        </Backdrop>
    );
};

export default Modal;