import ProjectContent from './ProjectContent';
import ProjectHeader from './ProjectHeader';
import classes from './ProjectMain.module.css';


const ProjectMain = () => {

    return (
        <div className={classes['project-main-layout']}>

            <ProjectHeader/>
            <ProjectContent />
        </div>
    )
}

export default ProjectMain;