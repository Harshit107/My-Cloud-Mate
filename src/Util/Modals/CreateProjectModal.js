import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Input from '../Input'
import Button from '../Button';
import { useContext, useEffect, useState } from 'react';
import FileContext from '../../store/file-context'
import useServer from '../../db/useServer';
import { UPLOAD_NEW_PROJECT } from '../../config';
import { toast } from 'react-toastify';

const CreateProjectModal = (props) => {

    const [projectName, setProjectName] = useState('')
    const [isProjectNameEmpty, setProjectNameEmpty] = useState(false)
    const { data, isLoading, error, handleAPICall} = useServer();

    const ctx = useContext(FileContext);


    function handleValueChange(e) {
        setProjectName(e.target.value);
        setProjectNameEmpty(e.target.value.trim().length === 0)
    }

    useEffect(() => {
        if(data) {
            toast.success(data.message);
        }
        else if(error) {
            toast.success(error);
        }

    }, [data, error])

    const addProjectToServer = async () => {

         const data = await handleAPICall(UPLOAD_NEW_PROJECT, 'POST', {
            projectName: projectName
        })
        ctx.addNewProject({
            _id: data._id,
            projectName: projectName
        })
        props.removeBackdrop();
        ctx.selectedFilesFun(data._id);
    }

    const handleBtnClick = () => {
        if (projectName.trim() === '') {
            setProjectNameEmpty(true)
            return;
        }
        addProjectToServer();


    }
    const inputData = {
        input: {
            name: 'Project Name',
            type: "text",
            placeholder: ' ',
            value: projectName,
            onChange: handleValueChange,
        }
    }


    return (
        <Modal removeBackdrop={props.removeBackdrop} title="Create New Project">
            <p className={classes.p}>Create projects to categorize your files like folders just like you'd arrange documents in different folders on your desk. Separate your files for quick access and easy organization.</p>
            <Input input={inputData.input} />
            {isProjectNameEmpty && <p className={classes.error}>Project Name Cannot be Empty</p>}
            {isLoading && <p className={classes.info}>Creating new project for you, please wait...</p>}
            <div className={classes.btnDiv}>
                <Button onClick={() => { props.removeBackdrop() }} disabled={isLoading} className={`${classes.btn} ${classes.cancelBtn}`}> Cancel</Button>
                <Button onClick={handleBtnClick} disabled={isLoading} className={classes.btn}> Create</Button>
            </div>
        </Modal>
    )

}

export default CreateProjectModal;