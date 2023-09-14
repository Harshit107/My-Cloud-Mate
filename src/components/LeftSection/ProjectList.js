import { useContext } from 'react'
import classes from './ProjectList.module.css'
import FileContext from '../../store/file-context'

const ProjectList = () => {
    const ctx = useContext(FileContext);
    const projects = ctx.projects
    const activeProjectId = ctx.activeProjectId;
    function handleProjectClicked(id) {
        ctx.selectedFilesFun(id)
    }


    return (
        <div className={classes['project-list']}>

            {projects.length === 1 && <p className={classes['no-project-found']}>
                We've set up a default project for you to explore the features and get started. To keep your projects organized and separate, Press New Project</p>
            }
            {projects &&
                <ul className={classes['ul']}>
                    {projects.map(project => (
                        <li key={project._id}
                            className={project._id === activeProjectId ? classes['active'] : ''}
                            onClick={handleProjectClicked.bind(null, project._id)}
                        >{project.projectName}</li>
                    ))}
                </ul>
            }
        </div>

    )
}

export default ProjectList;