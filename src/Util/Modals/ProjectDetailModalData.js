import React, { useContext, useCallback, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import FileContext from '../../store/file-context';
import useFileUploader from '../../db/useFileUploader';
import { currentTimestamp } from '../../Helper/Moment';
import Button from '../Button';
import classes from './ModalCommonStyling.module.css';

const fileSize = (size) => {
    const fileSizeInKb = size > 1000000 ? (size / (1024 * 1024)).toFixed(2) + 'Mb' : (size / 1024).toFixed(2) + 'Kb';
    return fileSizeInKb;
};

let isFileSetToDatabase = false;

const ProjectDetailModelData = (props) => {
    const ctx = useContext(FileContext);

    const {
        isFileUploading,
        isUploadingCompleted,
        handleUploadFile: uploadMyFile,
        uploadProgress,
    } = useFileUploader();

    function handleUploadFile(file) {
        isFileSetToDatabase = false;
        uploadMyFile(file);
    }

    const addFileDetailToDashboard = useCallback(() => {
        const fileDetail = {
            id: uuid(),
            name: props.selectedFile.name,
            size: fileSize(props.selectedFile.size),
            created: currentTimestamp,
            modified: currentTimestamp,
            type: props.selectedFile.name.substring(props.selectedFile.name.lastIndexOf('.') + 1),
            projectId: ctx.activeProjectId,
        };
        if (!isFileSetToDatabase) {
            isFileSetToDatabase = true
            props.removeBackdrop();
            ctx.addNewFile(fileDetail);
            
        }

    }, [ctx, props]);

    if (isFileUploading && uploadProgress > 5) {
        const progressBar = document.getElementById('progress')
        progressBar.style.width = uploadProgress + '%';
        progressBar.innerHTML = uploadProgress + '%';
    }

    useEffect(() => {
        if (isUploadingCompleted) {
            addFileDetailToDashboard();
        }
    }, [isUploadingCompleted, addFileDetailToDashboard]);



    return (
        <div className={`${classes['flex-column']} `}>
            <p className={classes['file-p']}>
                <span>File Name </span> {props.selectedFile.name}
            </p>
            <p className={classes['file-p']}>
                <span>File Size </span> {fileSize(props.selectedFile.size)}
            </p>

            {isFileUploading && (
                <div className={classes['progress-container']} >
                    <div className={classes['progress-bar']} id="progress" >
                        {uploadProgress}%
                    </div>
                </div>
            )}
            {isUploadingCompleted && <p className={classes.success}>File Uploaded Successfully</p>}

            <div className={classes.btnDiv}>
                <Button onClick={() => props.removeBackdrop()} className={`${classes.btn} ${classes.cancelBtn}`}>
                    Cancel
                </Button>
                <Button
                    onClick={() => handleUploadFile(props.selectedFile)}
                    className={classes.btn}
                    disabled={isFileUploading || isUploadingCompleted}
                >
                    Upload
                </Button>
            </div>
        </div>
    );
};

export default ProjectDetailModelData;
