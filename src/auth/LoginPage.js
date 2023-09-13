import classes from './LoginPage.module.css'
import Input from '../Util/Input'
import Button from '../Util/Button'
import loginImage from '../images/login.gif'
import useInput from '../hooks/useInput'
import {  useEffect, useState } from 'react'
import loadingImage from '../images/loading.png'
import useServer from '../db/useServer';
import {  LOGIN_API } from '../config'
import { setTokenToLocalStorage } from '../Helper/LocalStorage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const LoginPage = (props) => {

    const [buttonIsVisible, setButtonIsVisible] = useState(true);
    const navigate = useNavigate();

    const {
        isLoading, error: serverError, data: serverData, handleAPICall, reset
    } = useServer();

    useEffect(() => {
        setButtonIsVisible(!isLoading)
    },[isLoading])

    const {
        data: emailData,
        error: emailError,
        blurHandler: emailBlue,
        textChangeHandler: emailTextChange,
        showErrorMessage: showEmailErrorMessage
    } = useInput(data => data.includes('@'));
    const {
        data: passwordData,
        error: passwordError,
        blurHandler: passwordBlue,
        textChangeHandler: passwordTextChange,
        showErrorMessage: showPasswordErrorMessage
    } = useInput((data) => data.length >= 7);

    let formBecomeInvalid = showEmailErrorMessage || showPasswordErrorMessage
    // let formBecomeInvalid = false

    const submitFormHandler = (e) => {
        setButtonIsVisible(false)
        e.preventDefault();
        reset();
        handleAPICall(LOGIN_API,"POST",  {
            email: emailData,
            password : passwordData
            // email: "harshit107.in@gmail.com",
            // password : "123456789"
        });
    };

    useEffect( () => {
        if(serverData) {
            setTokenToLocalStorage(serverData.token)
            toast.success(`Welcome back, ${serverData.user.name}`)
            navigate('/')
        }
    }, [serverData, navigate])





    return (
        <div className={classes.loginContainer} onSubmit={submitFormHandler}>
            <img src={loginImage} alt='icon' className={classes.img} />

            <form className={classes.form}>
                <p className={classes.p}>Login with Email and Password</p>

                <Input
                    input={{
                        name: 'Email',
                        placeholder: ' ',
                        type: 'email', onChange: emailTextChange,
                        onBlur: emailBlue,
                        disabled: !buttonIsVisible,
                        autoComplete : "email",
                        
                    }} >
                </Input>
                {emailError && <p className={classes.error}>Enter valid email address</p>}
                <Input
                    input={{
                        name: 'Password',
                        placeholder: ' ',
                        type: 'password', onChange: passwordTextChange,
                        onBlur: passwordBlue,
                        disabled: !buttonIsVisible,
                        autoComplete:"password",
                        
                    }}
                />
                {passwordError && <p className={classes.error}>Password must be minimum 8 digit</p>}

                {buttonIsVisible && <Button disabled={formBecomeInvalid} className={classes.visible}>Login</Button>}

                {!buttonIsVisible && <div className={` ${classes['loader-container']} ${classes.visible}`}>
                    <img src={loadingImage} className={classes.loadingImg}  alt='Loading..'/>
                </div>}

                <p className={classes.p}>Forget Password?</p>
                {serverError && <p className={classes.invalidPassword}>{serverError}</p>}

                <p className={classes.createP}>Don't have a account ?<span className={classes.span} onClick={props.onStartAnimation.bind(null, 'login')}>Signup</span></p>
            </form >
        </div>
    )
}

export default LoginPage;