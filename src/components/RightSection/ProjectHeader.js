import ButtonWithAddIcon from "../../Util/ButtonWithAddIcon";
import classes from './ProjectHeader.module.css'
import uploadIcon from '../../images/upload-icon.png'
import filterIcon from '../../images/filter-icn.png'
import sortIcon from '../../images/sort-icon.png'
import deleteIcon from '../../images/delete-icon-white.png'
import FileContext from '../../store/file-context';
import { useContext } from "react";



const ProjectHeader = () => {
    const ctx = useContext(FileContext);
    const isFilesAvailable = ctx.availableFiles.length !== 0;
    return (
        <div className={classes["project-header"]}>
            <div className={classes["project-header-action"]}>
                
                <ButtonWithAddIcon className={classes['button-upload-file']} image={uploadIcon} buttonName="Upload File"/>
                { isFilesAvailable && <ButtonWithAddIcon 
                    className={classes['button-upload-file']}
                    image={sortIcon} 
                    buttonName="Sort"/>
                } 
                
                { isFilesAvailable && 
                    <ButtonWithAddIcon className={classes['button-upload-file']}
                    image={filterIcon}
                    buttonName="Filter"/>
                }
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