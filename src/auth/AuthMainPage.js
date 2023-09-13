import classes from './AuthMainPage.module.css'
// import { useNavigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage';

const AuthMainPage = () => {

    

    const handleAddClickAnimation = (container) => {
        const loginContainer = document.getElementById('loginContainer');
        const signupContainer = document.getElementById('signupContainer');

        if (container === 'login') {
            loginContainer.classList.toggle(classes['animationSlideDown'])
            setTimeout(() => {
                signupContainer.style.zIndex = 1;
            }, 500)
           
        }

        if (container === 'signup') {
            signupContainer.classList.toggle(classes['animationSlideDown'])
            setTimeout(() => {
                signupContainer.style.zIndex = 0;
            }, 500)

        }

        setTimeout(() => {
            signupContainer.classList.remove(classes['animationSlideDown'])
            loginContainer.classList.remove(classes['animationSlideDown'])
        }, 1000)




    }



    return (
        <div className={classes.authContainer}>
            <main className={classes.main}>
                <div className={classes.loginContainer} id='loginContainer'><LoginPage onStartAnimation={handleAddClickAnimation} /></div>
                <div className={classes.signupContainer} id='signupContainer'><SignupPage onStartAnimation={handleAddClickAnimation} /></div>
            </main>
            <div className={classes.welcomeMessage}>
                <h1 className={classes.title}>Welcome to <span>MyClound</span><span className={classes.mate}>Mate</span></h1>
                <p className={classes.p}>MyCloud<span className={classes.mate}>Mate</span> is a simple to use free service that lets you put all your photos, documents, music, and video in a single place so you can access them anywhere</p>
            </div>

        </div >)
}
export default AuthMainPage;
