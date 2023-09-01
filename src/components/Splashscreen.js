import classes from './Splashscreen.module.css'
import logoImage from '../images/my-cloud-mate-logo.gif'
import Button from '../Util/Button'
import { useNavigate } from 'react-router-dom'

const SplashScreen = () => {

    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/dashboard`; 
        navigate(path);
      }

    return <div className={classes.splashscreen}>
        <div className={classes.splashscreenBackground}></div>
            <div className={classes.container}>
                <img src={logoImage} className={classes.img} alt=''/>
                <h1 className={classes.mycloud}>MyCloud<span className={classes.mate}>Mate</span></h1>
                <p className={classes.p}><span className={classes.mate}>MyCloudMate</span> is a simple to use free service that lets you put all your photos, documents, music, and video in a single place so you can access them anywhere</p>
                <Button className={classes.startBtn} onClick = {routeChange}>Get Started</Button>
            </div>
    </div >
}
export default SplashScreen;