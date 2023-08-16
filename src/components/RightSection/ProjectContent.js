
import classes from './ProjectContent.module.css'
import ProjectFiles from './ProjectFiles'
import { useContext } from 'react';
import availableFilesContext from '../../store/file-context';


const ProjectContent = (props) => {
    
    const ctx = useContext(availableFilesContext);
    const files = ctx.availableFiles;
    return (
        <div className={classes['project-content-container']}>
            
            <ProjectFiles type='none' name="File Name" created={"Created On"} modified={"Last-Modified"} />
            {files.length === 0 && <p className={classes['files-not-found']}>No Files Found</p>}
            {files.length > 0 && files.map(files => <ProjectFiles 
            key={files.id} type={files.type} name={files.name} 
            created={files.created} modified={files.modified} />)}
        </div>
    )
}

export default ProjectContent;