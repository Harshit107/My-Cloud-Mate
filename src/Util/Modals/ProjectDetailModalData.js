import React, { useContext, useCallback, useEffect } from "react";
import FileContext from "../../store/file-context";
import useFileUploader from "../../db/useFileUploader";
import { currentTimestamp } from "../../Helper/Moment";
import Button from "../Button";
import classes from "./ModalCommonStyling.module.css";
import useServer from "../../db/useServer";
import { UPLOAD_NEW_File, UPLOAD_PROFILE_IMAGE } from "../../config";
import { toast } from "react-toastify";

const fileSize = (size) => {
  const fileSizeInKb =
    size > 1000000
      ? (size / (1024 * 1024)).toFixed(2) + "Mb"
      : (size / 1024).toFixed(2) + "Kb";
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
    downloadURL,
  } = useFileUploader();

  const { error, handleAPICall } = useServer();

  function handleUploadFile(file) {
    isFileSetToDatabase = false;
    uploadMyFile(file);
  }

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const addFileDetailToDashboard = useCallback(async () => {
    const fileDetail = {
      name: props.selectedFile.name,
      size: fileSize(props.selectedFile.size),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      type: props.selectedFile.name
        .substring(props.selectedFile.name.lastIndexOf(".") + 1)
        .toLowerCase(),
      projectId: ctx.activeProjectId,
      location: "Not set yet",
      downloadUrl: downloadURL,
    };

    if (!isFileSetToDatabase) {
      isFileSetToDatabase = true;
      if (props.replaceFile) {
        const result = await handleAPICall(UPLOAD_NEW_File, "POST", fileDetail);
        if (!result) return;
        props.removeBackdrop();
        ctx.addNewFile({ ...fileDetail, ...result.file });
      }
      else if(props.isProfileImage) {
         const result = await handleAPICall(
           UPLOAD_PROFILE_IMAGE,
           "POST",
           fileDetail
         );
         if (!result) return;
         props.removeBackdrop();
         window.location.reload();
      }
      else {
         const result = await handleAPICall(
           UPLOAD_NEW_File,
           "POST",
           fileDetail
         );
         if (!result) return;
         props.removeBackdrop();
         ctx.addNewFile({ ...fileDetail, ...result.file });
      }
    }
  }, [ctx, props, handleAPICall, downloadURL]);

  useEffect(() => {
    if (uploadProgress > 1 && uploadProgress < 99.9) {
      const progressBar = document.getElementById("progress");
      progressBar.style.width = uploadProgress < 1 ? 1 : uploadProgress + "%";
      progressBar.innerHTML = uploadProgress + "%";
    }
  }, [uploadProgress, isFileUploading]);

  useEffect(() => {
    if (isUploadingCompleted) {
      addFileDetailToDashboard();
    }
  }, [isUploadingCompleted, addFileDetailToDashboard]);

  return (
    <div className={`${classes["flex-column"]} `}>
      <p className={classes["file-p"]}>
        <span>File Name </span> {props.selectedFile.name}
      </p>
      <p className={classes["file-p"]}>
        <span>File Size </span> {fileSize(props.selectedFile.size)}
      </p>

      {isFileUploading && (
        <div className={classes["progress-container"]}>
          <div className={classes["progress-bar"]} id="progress">
            {uploadProgress < 1 ? 1 : uploadProgress}%
          </div>
        </div>
      )}
      {isUploadingCompleted && (
        <p className={classes.success}>
          File Uploaded Successfully, Arranging files for you...
        </p>
      )}

      <div className={classes.btnDiv}>
        <Button
          onClick={() => props.removeBackdrop()}
          className={`${classes.btn} ${classes.cancelBtn}`}
        >
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
