import classes from './FileDetail.module.css'
import FileDescription from './FileDescription'
import Backdrop from '../../Util/Backdrop'

const FileDetail = (props) => {

    console.log(props);
    return <Backdrop removeBackdrop={props.removeBackdrop}>
        <div className={classes.container} onClick={(event) => { event.stopPropagation(); }}>
            <div className={classes.content}>
                <FileDescription
                    {...props}
                />
            </div>
        </div>
    </Backdrop>
}


export default FileDetail;