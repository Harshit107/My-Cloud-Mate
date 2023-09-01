
import ButtonWithAddIcon from '../Util/ButtonWithAddIcon';
import ProjectList from './LeftSection/ProjectList';
import ProjectMain from './RightSection/ProjectMain';
import classes from './Projects.module.css'
import PlusImage from '../images/plus.png';
import { useState } from 'react';
import CreateProjectModal from '../Util/Modals/CreateProjectModal';


const Projects = () => {

   const [isBackdrop, setBackdrop]  = useState(false);

   function handleCreateOnClick() {
        setBackdrop(true)
   }

   function removeBackdrop() {
        setBackdrop(false)
   }

   const buttonAction = {
        action : {
            onClick : handleCreateOnClick,
        }
   }

    return (
        <div className={classes['main']}>
            {isBackdrop && <CreateProjectModal removeBackdrop = {removeBackdrop}/>}
            <div className={classes['side-section']}>
                <ButtonWithAddIcon image ={PlusImage} buttonName="New Project" action = {buttonAction.action}/>
                <ProjectList/>
            </div>
            <div className={classes['main-section']}>
                <ProjectMain />
            </div>
        </div>
    );

}

export default Projects;