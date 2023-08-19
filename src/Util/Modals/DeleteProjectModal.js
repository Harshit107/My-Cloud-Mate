import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Button from '../Button';
import { useContext, useState } from 'react';
import FileContext from '../../store/file-context'

const DeleteProjectModal = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    // const [isNotAllowed, setIsNotAllowed] = useState(true)
    const ctx = useContext(FileContext);
    const isDeleteAllowed = props.id === 0;


    const addProjectToServer = async () => {
        setIsLoading(true)
        
         setTimeout( () => {
            ctx.removeProject(props.id)
            props.removeBackdrop();
            setIsLoading(false)
        }, 1500 );

    }



    return (
       <Modal removeBackdrop = {props.removeBackdrop} title = "Delete Project">
            <p className={classes.p}>Are you sure you want to delete this project? Deleting this project will result in the removal of all files associated with it. Once deleted, these files cannot be retrieved. This action is irreversible</p>
            {isDeleteAllowed && <p className={`${classes.error} ${classes.p}`}>We appreciate your intent, but this is a default project that cannot be deleted. It plays an important role in our system and ensures smooth functionality</p> }
            <div className={classes.btnDiv}>
            <Button onClick = { () => {props.removeBackdrop()}}  disabled = {isLoading} className={`${classes.btn} ${classes.cancelBtn}`}> Cancel</Button>
            <Button onClick = {addProjectToServer} disabled = {isDeleteAllowed || isLoading} className={`${classes.btn} ${classes.delete}`}>Delete</Button>
            </div>
       </Modal>
    )

}

export default DeleteProjectModal;