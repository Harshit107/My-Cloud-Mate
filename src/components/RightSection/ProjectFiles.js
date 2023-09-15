import classes from './ProjectFiles.module.css'
import PdfIcon from '../../images/pdf-icon.png'
import JpgIcon from '../../images/jpg-icon.png'
import PngIcon from '../../images/png-icon.png'
import DocumentIcon from '../../images/document-icon.png'
import { convertDateToString } from '../../Helper/Common'

const iconStore = {
    "PDF": PdfIcon,
    "JPG": JpgIcon,
    "PNG": PngIcon
}

const ProjectFiles = (props) => {

    function handleFileClick() {
        if (props.downloadUrl)
            window.open(props.downloadUrl, '_blank');
    }

    return (
        <div className={`${classes['project-files']} ${classes[props.type]}`} onClick={handleFileClick}>
            {props.type !== 'none' && <img src={iconStore[props.type.toUpperCase()] ?? DocumentIcon} alt='type icon' className={classes['files-icon']} />}
            {props.type === 'none' && <div className={classes['files-icon']}></div>}
            <p className={classes['name']}>{props.name}</p>
            <p className={classes['type']}>{props.type === 'none' ? 'File-type' : props.type}</p>
            <p>{convertDateToString(props.modified)}</p>
            <p>{convertDateToString(props.created)}</p>
            {/* <p>{formattedDate(props.created)}</p> */}

        </div>
    )
}

export default ProjectFiles;