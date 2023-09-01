import classes from './SignupPage.module.css'

import Input from '../Util/Input'
import Button from '../Util/Button'
import loginImage from '../images/login.gif'

const SignupPage = (props) => {



    return (
        <div className={classes.loginContainer}>
            <img src={loginImage} alt='icon' className={classes.img} />
            <form className={classes.form}>
                <p>Create New Account for Free</p>
                <Input input={{ name: 'Email', placeholder: ' ', type: 'email', style: { 'marginBottom': '10px', 'borderRadius': '15px' } }}></Input>
                <Input input={{ name: 'Password', placeholder: ' ', type: 'password', style: { 'marginBottom': '10px', 'borderRadius': '15px' } }} />
                <Input input={{ name: 'Password', placeholder: ' ', type: 'password', style: { 'borderRadius': '15px' } }} />
                <Button >Signup</Button>
                <p className={classes.p}>Forget Password?</p>
                <p className={classes.createP}>Already have an account ?<span className={classes.span} onClick={props.onStartAnimation.bind(null, 'signup')}>Login</span></p>
            </form>
        </div>
    )
}

export default SignupPage;