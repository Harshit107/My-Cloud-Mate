import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Button from '../Button';
import { useContext, useEffect } from 'react';
import FileContext from '../../store/file-context'
import useServer from '../../db/useServer'
import { DELETE_File, } from '../../config'
import { toast } from 'react-toastify';

const DeleteFileModal = (props) => {
  const { handleAPICall, isLoading, error, reset } = useServer();
  const ctx = useContext(FileContext);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong, ", error.message);
    }
  }, [error]);

  const removeFilefromServer = async () => {
    reset();
    const data = await handleAPICall(DELETE_File, "POST", {
      fileId: props._id,
    });
    if (!data) return;
    ctx.removeFile(props._id);
    props.removeBackdrop();
  };

  return (
    <Modal removeBackdrop={props.removeBackdrop} title="Delete Project">
      <p className={classes.p}>
        Are you sure you want to delete this file? Deleting will
        result in the removal of this file and once deleted, cannot be
        retrieved. This action is irreversible
      </p>
      {isLoading && (
        <p className={`${classes.info} ${classes.p}`}>
          Please wait, Deleting file...
        </p>
      )}
      <div className={classes.btnDiv}>
        <Button
          onClick={() => {
            props.cancelClicked();
          }}
          disabled={isLoading}
          className={`${classes.btn} ${classes.cancelBtn}`}
        >
          Cancel
        </Button>
        <Button
          onClick={removeFilefromServer}
          disabled={isLoading}
          className={`${classes.btn} ${classes.delete}`}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteFileModal;