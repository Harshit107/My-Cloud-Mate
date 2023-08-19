import Button from '../Button';
import classes from './ModalCommonStyling.module.css'

const ProjectDetailModelData = (props) => {

    return (
        <div className={`${classes['flex-column']} `} >
            <p className={classes['file-p']}> <span>File Name  </span> :{props.fileName}</p>
            <p className={classes['file-p']}> <span>File Size  </span> :{props.fileSize}</p>
            <Button >Upload</Button>
        </div>
    )
}

export default ProjectDetailModelData;