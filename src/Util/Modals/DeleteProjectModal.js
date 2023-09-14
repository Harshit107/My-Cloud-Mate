import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Button from '../Button';
import { useContext, useEffect } from 'react';
import FileContext from '../../store/file-context'
import { getDefaultProjectId } from '../../Helper/Common';
import useServer from '../../db/useServer'
import { DELETE_PROJECT } from '../../config'
import { toast } from 'react-toastify';

const DeleteProjectModal = (props) => {
    const { handleAPICall, isLoading, error} = useServer();
    const ctx = useContext(FileContext);
    const isDeleteNotAllowed = props.id === getDefaultProjectId(ctx)
    
    useEffect(() => {
        if(error) {
            toast.error("Something went wrong, ",error.message)
        }
    }, [error])


    const addProjectToServer = async () => {
        const data = await handleAPICall(DELETE_PROJECT, "POST", { projectId: props.id })
        if (!data)
            return;
        ctx.removeProject(props.id)
        props.removeBackdrop();

    }

    return (
        <Modal removeBackdrop={props.removeBackdrop} title="Delete Project">
            <p className={classes.p}>Are you sure you want to delete this project? Deleting this project will result in the removal of all files associated with it. Once deleted, these files cannot be retrieved. This action is irreversible</p>
            {isDeleteNotAllowed && <p className={`${classes.error} ${classes.p}`}>We appreciate your intent, but this is a default project that cannot be deleted. It plays an important role in our system and ensures smooth functionality</p>}
            {isLoading && <p className={`${classes.info} ${classes.p}`}>Please wait, Deleting project...</p>}
            <div className={classes.btnDiv}>
                <Button onClick={() => { props.removeBackdrop() }} disabled={isLoading} className={`${classes.btn} ${classes.cancelBtn}`}> Cancel</Button>
                <Button onClick={addProjectToServer} disabled={isDeleteNotAllowed || isLoading} className={`${classes.btn} ${classes.delete}`}>Delete</Button>
            </div>
        </Modal>
    )

}

export default DeleteProjectModal;