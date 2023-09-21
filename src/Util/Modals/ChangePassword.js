import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Button from '../Button'
import useServer from '../../db/useServer'
import { OTP_VERIFY_API, SEND_OTP } from '../../config';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../Input';
import useInput from '../../hooks/useInput';


const ChangePassword = (props) => {
    const [showOTPBox, setShowOTPBox] = useState(false)
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
    const { isLoading, handleAPICall, error: serverError, data, reset } = useServer();



    async function handleSendEmailVerification() {
        reset();
        if (showEmailErrorMessage)
            return;
        const data = await handleAPICall(SEND_OTP, 'POST', { email: emailData })
        if (!data)
            return;
        setShowOTPBox(!showOTPBox)
    }

    async function handleOtpVerification() {
        reset();
        if (otpError) {
            setDisplayErrorMessage("Enter valid OTP")
            return;
        }

        if (passwordError) {
            setDisplayErrorMessage("Password must be minimum 6 digit")
            return;
        }


        if (newPasswordError) {
            setDisplayErrorMessage("Password must match")
            return;
        }

        const data = await handleAPICall(OTP_VERIFY_API, 'POST', {
            otp: otpData,
            email: emailData,
            password: passwordData
        })
        if (!data)
            return
        props.cancelBackdrop();
    }

    const {
        data: emailData,
        error: emailError,
        blurHandler: emailBlur,
        textChangeHandler: emailTextChange,
        showErrorMessage: showEmailErrorMessage
    } = useInput(data => data.includes('@'));

    const {
        data: otpData,
        error: otpError,
        blurHandler: otpBlur,
        textChangeHandler: otpTextChange,
        showErrorMessage: showOTPErrorMessage
    } = useInput(data => data.length > 5);

    const {
        data: passwordData,
        error: passwordError,
        blurHandler: passwordBlur,
        textChangeHandler: passwordTextChange,
    } = useInput(data => data.length > 6);

    const {
        data : newPasswordData,
        error: newPasswordError,
        blurHandler: newPasswordBlur,
        textChangeHandler: newPasswordTextChange,
    } = useInput(data => data.length > 6 && passwordData === data);

    useEffect(() => {
        setDisplayErrorMessage('')
    }, [otpData, passwordData, newPasswordData])


    useEffect(() => {

        if (serverError) {
            toast.error(serverError)
        }
        else if (data) {
            if (data.status === 202)
                setShowOTPBox(true);
            toast.info(data.message)
        }

    }, [serverError, data])

    return (
        <Modal removeBackdrop={props.removeBackdrop} title="Change Password" >
            <p className={classes.p}>Enter your email to receive one time verification code.</p>
            <Input input={{
                name: 'Email',
                placeholder: ' ',
                type: 'email',
                onChange: emailTextChange,
                onBlur: emailBlur,
                disabled: showOTPBox,

            }} />
            {emailError && <p className={classes.error}>Enter valid email address</p>}
            {showOTPBox && <Input input={{
                name: 'OTP',
                placeholder: ' ',
                type: 'password',
                onChange: otpTextChange,
                onBlur: otpBlur,
                disabled: !showOTPBox,

            }} />}


            {showOTPBox && <Input input={{
                name: 'New Password',
                placeholder: ' ',
                type: 'password',
                onChange: passwordTextChange,
                onBlur: passwordBlur,
                disabled: !showOTPBox,

            }} />}

            {showOTPBox && <Input input={{
                name: 'Confirm Password',
                placeholder: ' ',
                type: 'password',
                onChange: newPasswordTextChange,
                onBlur: newPasswordBlur,
                disabled: !showOTPBox,

            }} />}

            {displayErrorMessage && <p className={classes.error}>{displayErrorMessage}</p>}

            {isLoading && <p className={classes.info}>Loading, Please wait...</p>}


            <div className={classes.btnDiv}>

                {<Button onClick={() => { props.cancelBackdrop() }} disabled={isLoading} className={`${classes.btn} ${classes.cancelBtn}`}> Cancel</Button>}
                {!showOTPBox && <Button onClick={handleSendEmailVerification} disabled={isLoading || showEmailErrorMessage} className={classes.sendVerificaionBtn}>Send Verification Mail</Button>}
                {showOTPBox && <Button onClick={handleOtpVerification} disabled={isLoading || showOTPErrorMessage} className={classes.sendVerificaionBtn}>Validate</Button>}
            </div>
        </Modal>
    )

}

export default ChangePassword;