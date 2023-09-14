import classes from './TopLoading.module.css'
import loadingImg from '../images/loading-main.svg'

const TopLoading = (props) => {

    
    return <div className={classes.container}>
        <div className={classes.loadingContent}>
            <img src={loadingImg} className={classes.loadingImg} alt='Loading..' />
            <p className={classes.loadingDataMsg}>{props.message || 'Loading data,'}<span className='mate'>{' please wait...'}</span></p>
        </div>
    </div>
}

export default TopLoading;