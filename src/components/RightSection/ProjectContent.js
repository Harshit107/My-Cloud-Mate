
import classes from './ProjectContent.module.css'
import ProjectFiles from './ProjectFiles'
import { useContext, useState } from 'react';
import availableFilesContext from '../../store/file-context';
import FileDetail from './FileDetail';


const ProjectContent = () => {

    const [projectToOpen, setProjectToOpen] = useState(null)

    const ctx = useContext(availableFilesContext);
    const files = ctx.availableFiles;

    function handleRemoveBackdrop() {
        setProjectToOpen(null)
    }

    function openProjectDetailPage(index) {
        console.log(index);
        setProjectToOpen(files[index])
    }

    return (
        <div className={classes['project-content-container']}>

            <ProjectFiles type='none' name="File Name" created={"Created On"} modified={"Last-Modified"} />
            {files.length === 0 && <p className={classes['files-not-found']}>No Files Found</p>}
            {files.length > 0 && files.map((files, index) => <ProjectFiles openProjectDetails={openProjectDetailPage.bind(null, index) }
                key={files._id} type={files.type} name={files.name}
                created={files.createdAt} modified={files.updatedAt} downloadUrl={files.downloadUrl} />)}
               {projectToOpen &&  <FileDetail removeBackdrop ={handleRemoveBackdrop} {...projectToOpen}/>}
        </div>
    )
}

export default ProjectContent;