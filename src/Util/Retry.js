import classes from './TopLoading.module.css'
import retryImage from '../images/retry.gif'

const TopLoading = (props) => {

    
    return <div className={classes.retryContainer}>
        <div className={classes.retryContent}>
            <img src={retryImage} className={classes.retryImage} alt='Retry..' />
            <p className={classes.loadingDataMsg}>Something is not right, <span className='error'>{`${props.msg ||' Please try again by refreshing page...'}`}</span></p>
        </div>
    </div>
}

export default TopLoading;