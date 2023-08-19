import Button from '../Button';
import classes from './ModalCommonStyling.module.css'
import {currentTimestamp} from '../../Helper/Moment';
import FileContext from '../../store/file-context'
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
const ProjectDetailModelData = (props) => {

    const ctx = useContext(FileContext)

    const fileSize = (size) => {

        if(size > 1000000)
            return (size/(1024*1024)).toFixed(2) + 'Mb'
        else
            return (size/ 1024).toFixed(2) + " Kb"
    }

    function uploadFile() {

        const fileDetail = {
            id: uuid(),
            name : props.selectedFile.name,
            size : fileSize(props.selectedFile.size),
            created : currentTimestamp,
            modified : currentTimestamp,
            type : props.selectedFile.name.substring(props.selectedFile.name.lastIndexOf('.') + 1),
            projectId : ctx.activeProjectId
        }

        ctx.addNewFile(fileDetail)
        props.removeBackdrop();

    }

    return (
        <div className={`${classes['flex-column']} `} >
            <p className={classes['file-p']}> <span>File Name  </span>  {" "+props.selectedFile.name}</p>
            <p className={classes['file-p']}> <span>File Size  </span>  {" "+fileSize(props.selectedFile.size) }</p>
            <div className={classes.btnDiv}>
                <Button onClick = { () => {props.removeBackdrop()}} className={`${classes.btn} ${classes.cancelBtn}`}> Cancel</Button>
                <Button onClick = {uploadFile} className={classes.btn}> Upload</Button>
            </div>
        </div>
    )
}

export default ProjectDetailModelData;