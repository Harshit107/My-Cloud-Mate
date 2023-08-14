import classes from './ProjectList.module.css'

const ProjectList = (props) => {
    return (
        <div className={classes['project-list']}>
            {!props.projects && <p>- No Project Found -</p>}
            {props.projects &&
                <ul className={classes['ul']}>
                    {props.projects.map(project => (
                        <li>{project.name}</li>
                    ))}
                </ul>
            }
        </div>

    )
}

export default ProjectList;