
import ButtonWithAddIcon from '../Util/ButtonWithAddIcon';
import ProjectList from './LeftSection/ProjectList';
import ProjectMain from './RightSection/ProjectMain';
import classes from './Projects.module.css'
import PlusImage from '../images/plus.png';


const Projects = () => {

   

    return (
        <div className={classes['main']}>
            <div className={classes['side-section']}>
                <ButtonWithAddIcon image ={PlusImage} buttonName="Create Project"/>
                <ProjectList/>
            </div>
            <div className={classes['main-section']}>
                <ProjectMain />
            </div>
        </div>
    );

}

export default Projects;