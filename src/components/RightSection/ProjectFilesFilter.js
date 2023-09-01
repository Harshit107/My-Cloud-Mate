import classes from '../LeftSection/ProjectList.module.css'
import FileContext from '../../store/file-context'
import { useContext } from 'react'
import filterFiles, { filterAvailable } from '../../Helper/filter'

let activeFilter = 0;

const ProjectFilesFilter = () => {

    const ctx = useContext(FileContext);
    const availableFilterOption = filterAvailable(ctx.availableFiles)

    function handleFilterOptionClicked(id) {
        activeFilter = id;
        if (id === 0)
            ctx.updateAvailableFiles();
        else {
            const updatedFiles = filterFiles(ctx.availableFiles, [availableFilterOption[activeFilter]])
            ctx.updateAvailableFiles(updatedFiles)
            activeFilter = 1;
        }
    }

    // const filterOption = filterAvailable(ctx.availableFiles);



    return (
        <div className={classes['project-sort-list']}>
            <ul className={classes['ul']}>
                {availableFilterOption.map((project, index) => (
                    <li key={index}
                        className={index === activeFilter ? classes['active'] : ''}
                        onClick={handleFilterOptionClicked.bind(null, index)}
                    >{project}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectFilesFilter;