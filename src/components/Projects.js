
import ButtonWithAddIcon from '../Util/ButtonWithAddIcon';
import ProjectList from './ProjectList';
import classes from './Projects.module.css'

const Projects = () => {
    return (
        <div className={classes['side-section']}>
            <ButtonWithAddIcon/>
            < ProjectList />
        </div>
    )

}

export default Projects;