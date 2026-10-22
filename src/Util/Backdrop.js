import ReactDom from 'react-dom';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {
    const handleRemoveBackdrop = (event) => {
        if (event.target === event.currentTarget && props.removeBackdrop) {
            props.removeBackdrop();
        }
    };

    const backDropRoot = document.getElementById('backdrop') || document.body;
    return ReactDom.createPortal(
        <div className={classes.blur} onClick={handleRemoveBackdrop}>
            {props.children}
        </div>,
        backDropRoot
    );
};

export default Backdrop;