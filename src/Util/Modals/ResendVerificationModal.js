import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Button from '../Button'
import useServer from '../../db/useServer'
import { SEND_VERIFICATION_API } from '../../config';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


const ResendVerificationModal = (props) => {

    const { isLoading, handleAPICall, error, data, reset} = useServer();
    function handleBtnClick() {
        reset();
        handleAPICall(SEND_VERIFICATION_API,'POST',{email : props.email})
    }

    useEffect(() => {

        if(error) {
            toast.error(error.message)
        }
        else if(data) {
            toast.success(error.message)
        }

    }, [error, data])

    return (
        <Modal removeBackdrop={props.removeBackdrop} title="Verification Required" email={props.email}>
            <p className={classes.p}>Your email is not verified with us, Verify your email to continue.</p>
            <p className={classes.p}><span className='mate'>Email : </span>{props.email}</p>
            {isLoading && <p className={classes.info}>Sending Verification Email, Please wait...</p>}
            <div className={classes.btnDiv}>
                <Button onClick={() => { props.removeBackdrop() }} disabled={isLoading} className={`${classes.btn} ${classes.cancelBtn}`}> Cancel</Button>
                <Button onClick={handleBtnClick} disabled={isLoading} className={classes.sendVerificaionBtn}>Send Verification Mail</Button>
            </div>
        </Modal>
    )

}

export default ResendVerificationModal;