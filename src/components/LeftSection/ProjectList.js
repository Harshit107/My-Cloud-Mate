import { useContext } from 'react'
import classes from './ProjectList.module.css'
import FileContext from '../../store/file-context'

const ProjectList = (props) => {
    const ctx = useContext(FileContext);
    console.log(ctx.projects)
    const projects = ctx.projects
    return (
        <div className={classes['project-list']}>
            {projects.length === 0 && <p className={classes['no-project-found']}>
                No Project Found</p>
                
            }
            {projects.length === 0 && <p className={classes['no-project-found']}>
                Create one project to continue</p>
                
            }
            {projects &&
                <ul className={classes['ul']}>
                    {projects.map(project => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            }
        </div>

    )
}

export default ProjectList;