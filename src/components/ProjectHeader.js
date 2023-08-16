import ButtonWithAddIcon from "../Util/ButtonWithAddIcon";
import classes from './ProjectHeader.module.css'
import uploadIcon from '../images/upload-icon.png'
import filterIcon from '../images/filter-icn.png'
import sortIcon from '../images/sort-icon.png'
import deleteIcon from '../images/delete-icon-white.png'



const ProjectHeader = (props) => {
    
    return (
        <div className={classes["project-header"]}>
            <div className={classes["project-header-action"]}>
                <ButtonWithAddIcon className={classes['button-upload-file']} image={uploadIcon} buttonName="Upload File"> </ButtonWithAddIcon>
                <ButtonWithAddIcon className={classes['button-upload-file']} image={sortIcon} buttonName="Sort"></ButtonWithAddIcon>
                <ButtonWithAddIcon className={classes['button-upload-file']} image={filterIcon} buttonName="Filter"> </ButtonWithAddIcon>
            </div>
            <div>
                <ButtonWithAddIcon 
                    className={`${classes['button-upload-file']} ${classes['project-header-action-delete']}`} 
                    image={deleteIcon} buttonName=""> 
                </ButtonWithAddIcon>
            </div>

        </div>
    );
}

export default ProjectHeader;