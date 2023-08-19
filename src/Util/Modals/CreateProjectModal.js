import Modal from './Modal';
import classes from './ModalCommonStyling.module.css';
import Input from '../Input'
import Button from '../Button';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import FileContext from '../../store/file-context'

const CreateProjectModal = (props) => {

    const [projectName, setProjectName] = useState('')
    const [isProjectNameEmpty, setProjectNameEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const ctx = useContext(FileContext);


    function handleValueChange(e) {
        setProjectName(e.target.value);
        setProjectNameEmpty(e.target.value.trim().length === 0)
    }

    const addProjectToServer = async () => {

        const uniqueId = uuidv4();
        setIsLoading(true)
        ctx.addNewProject({
            id: uniqueId,
            name: projectName
        })

        props.removeBackdrop();
        setIsLoading(false)
        ctx.selectedFilesFun(uniqueId);
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
            <div className={classes.btnDiv}>
                <Button onClick={() => { props.removeBackdrop() }} disabled={isLoading} className={`${classes.btn} ${classes.cancelBtn}`}> Cancel</Button>
                <Button onClick={handleBtnClick} disabled={isLoading} className={classes.btn}> Create</Button>
            </div>
        </Modal>
    )

}

export default CreateProjectModal;