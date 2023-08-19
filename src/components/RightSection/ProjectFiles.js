import classes from './ProjectFiles.module.css'
import PdfIcon from '../../images/pdf-icon.png'
import JpgIcon from '../../images/jpg-icon.png'
import PngIcon from '../../images/png-icon.png'
import DocumentIcon from '../../images/document-icon.png'

const iconStore = {
    "PDF" : PdfIcon,
    "JPG" : JpgIcon,
    "PNG" : PngIcon
}

const ProjectFiles = (props) => {

    return (
        <div className={`${classes['project-files']} ${classes[props.type]}`}>
           {props.type !== 'none' && <img src={iconStore[props.type.toUpperCase()] ?? DocumentIcon} alt='type icon' className={classes['files-icon']} />}
           {props.type === 'none' && <div className={classes['files-icon']}></div>}
           <p className={classes['name']}>{props.name }</p>
           <p className={classes['type']}>{props.type === 'none' ? 'File-type' : props.type}</p>
           <p>{props.modified}</p>
           <p>{props.created}</p>
           {/* <p>{formattedDate(props.created)}</p> */}
          
        </div>
    )
}

export default ProjectFiles;