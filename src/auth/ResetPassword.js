import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Button from '../Button'
import useServer from '../../db/useServer'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Input from '../Input';
import useInput from '../../hooks/useInput';


const ChangePassword = (props) => {
    const { isLoading, handleAPICall, error, data, reset } = useServer();
    function handleBtnClick() {
        reset();
        // handleAPICall(SEND_VERIFICATION_API, 'POST', { email: props.email })
        setShowOTPBox(!showOTPBox)
    }

    const {
        data: passwordData,
        error: passwordError,
        blurHandler: passwordBlur,
        textChangeHandler: passwordTextChange,
        showErrorMessage: showPasswordErrorMessage
    } = useInput(data => data.length > 6);

    const {
        data: newPasswordData,
        error: newPasswordError,
        blurHandler: newPasswordBlur,
        textChangeHandler: newPasswordTextChange,
        showErrorMessage: showNewPasswordErrorMessage
    } = useInput(data => data.length > 6 && passwordData === data);

    useEffect(() => {

        if (error) {
            toast.error(error.message)
        }
        else if (data) {
            props.removeBackdrop();
            toast.info(data.message)
            reset()
        }

    }, [error, data, reset])

    return (
        <div className={classes.loginContainer} >
            <form className={classes.form} onSubmit={submitFormHandler}>

                <Input
                    input={{
                        name: 'Password',
                        placeholder: ' ',
                        type: 'password',
                        onChange: passwordTextChange,
                        onBlur: passwordBlur,
                        disabled: !buttonIsVisible,

                    }} >
                </Input>
                {emailError && <p className={classes.error}>Enter valid email address</p>}
                <Input
                    input={{
                        name: 'Password',
                        placeholder: ' ',
                        type: 'password',
                        onChange: newPasswordTextChange,
                        onBlur: newPasswordBlur,
                        disabled: !buttonIsVisible,

                    }}
                />

                {!emailVerified && <ResendVerificationModal removeBackdrop={() => setEmailIsVerified(true)} email={emailData} />}
                {passwordError && <p className={classes.error}>Password must be minimum 8 digit</p>}

                {buttonIsVisible && <Button disabled={formBecomeInvalid} className={classes.visible}>Login</Button>}

                {!buttonIsVisible && <div className={` ${classes['loader-container']} ${classes.visible}`}>
                    <img src={loadingImage} className={classes.loadingImg} alt='Loading..' />
                </div>}

                {showPasswordModal && <ChangePassword />}
                <p className={`${classes.p} ${classes.forget}`} onClick={() => setShowPasswordModal(true)}>Forget Password?</p>
                {serverError && <p className={classes.invalidPassword}>{serverError}</p>}

                <p className={classes.createP}>Don't have a account ?<span className={classes.span} onClick={props.onStartAnimation.bind(null, 'login')}>Signup</span></p>
            </form >
        </div>
    )

}

export default ChangePassword;