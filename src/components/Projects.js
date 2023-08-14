
import ButtonWithAddIcon from '../Util/ButtonWithAddIcon';
import ProjectList from './ProjectList';
import classes from './Projects.module.css'

const Projects = () => {

    const PROJECT = [
        { name: "First Project"},
        { name: "Second Project"},
        { name: "Third Project"},
        { name: "Fourth Project"},
    ]

    return (
        <div className={classes['main']}>
            <div className={classes['side-section']}>
                <ButtonWithAddIcon />
                < ProjectList projects={PROJECT}/>
            </div>
            <div className={classes['main-section']}>
            
            </div>
        </div>
    );

}

export default Projects;