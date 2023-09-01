import classes from './LoginPage.module.css'
import Input from '../Util/Input'
import Button from '../Util/Button'
import loginImage from '../images/login.gif'

const LoginPage = (props) => {



    return (
        <div className={classes.loginContainer}>
                <img src={loginImage}alt='icon' className={classes.img}/>
            <form className={classes.form}>
                <p>Login with Email and Password</p>
                <Input input = {{name : 'Email', placeholder : ' ', type : 'email', }}></Input>
                <Input input = {{name : 'Password', placeholder : ' ', type : 'password'}}/>
                <Button >Login</Button>
                <p className={classes.p}>Forget Password?</p>
                <p className={classes.createP}>Don't have a account ?<span className={classes.span} onClick={props.onStartAnimation.bind(null,'login')}>Signup</span></p>
            </form>
        </div>
    )
}

export default LoginPage;