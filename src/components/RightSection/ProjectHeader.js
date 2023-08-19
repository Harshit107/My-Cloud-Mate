import ButtonWithAddIcon from "../../Util/ButtonWithAddIcon";
import classes from './ProjectHeader.module.css'
import uploadIcon from '../../images/upload-icon.png'
import filterIcon from '../../images/filter-icn.png'
import sortIcon from '../../images/sort-icon.png'
import deleteIcon from '../../images/delete-icon-white.png'
import FileContext from '../../store/file-context';
import React, { useContext, useRef, useState } from "react";
import DeleteProjectModal from "../../Util/Modals/DeleteProjectModal";
import FileDetailModal from "../../Util/Modals/FileDetailsModal";



const ProjectHeader = () => {
    const ctx = useContext(FileContext);
    const isFilesAvailable = ctx.availableFiles.length !== 0;
    const selectedProject = ctx.activeProjectId;
    const [isDeleteClicked, setDeleteClicked] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        event.target.value = null;
        setTimeout( () => {
            setSelectedFile(null);
        },2000)

      };
      const handleButtonClick = () => {
        // Trigger the file input click event
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };
    
      const fileInputRef = useRef();
    

    const handleDeleteProject = () => {
        setDeleteClicked(true)
    }

    return (
        <div className={classes["project-header"]}>
            <div className={classes["project-header-action"]}>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                <ButtonWithAddIcon
                    action ={{onClick : handleButtonClick}}
                    className={classes.button}
                    image={uploadIcon} buttonName="Upload File" />

                {isFilesAvailable && <ButtonWithAddIcon
                    className={classes.button}
                    image={sortIcon}
                    buttonName="Sort" />
                }

                {isFilesAvailable &&
                    <ButtonWithAddIcon className={classes.button}
                        image={filterIcon}
                        buttonName="Filter" />
                }
            </div>
            <div>
                {isDeleteClicked && <DeleteProjectModal removeBackdrop={() => setDeleteClicked(false)} id={selectedProject} />}
                {selectedFile && <FileDetailModal removeBackdrop={() => setSelectedFile(null)} id={selectedProject} />}
                <ButtonWithAddIcon
                    action={{ onClick: handleDeleteProject }}
                    className={`${classes.button} ${classes['project-header-action-delete']}`}
                    image={deleteIcon} buttonName="">
                </ButtonWithAddIcon>
            </div>

        </div>
    );
}

export default ProjectHeader;