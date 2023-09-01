import classes from '../LeftSection/ProjectList.module.css'
import FileContext from '../../store/file-context'
import { useContext } from 'react'
import {  sortedData } from '../../Helper/filter'
const sortingOption = [
    {field : "name",name: "Name ( A - Z )", sortBy : 'first'},
    {field : "name",name: "Name ( Z - A )", sortBy : 'last'},
    {field : "created",name: "Created Date (Newest First)", sortBy : 'first'},
    {field : "created",name: "Created Date (Oldest First)", sortBy : 'last'},
    {field : "modified",name: "Modified Date (Newest First)", sortBy : 'first'},
    {field : "modified",name: "Modified Date (Oldest First)", sortBy : 'last'},
]
let activeSort = 0;

const ProjectFilesSort = () => {

    const ctx = useContext(FileContext);
    function handleProjectClicked(id) {
        activeSort = id;
        const availableFiles = sortedData(ctx.availableFiles,sortingOption[activeSort])
        ctx.updateAvailableFiles(availableFiles)
    }
    
    // const filterOption = filterAvailable(ctx.availableFiles);

    

    return (
        <div  className={classes['project-sort-list']}>
            <ul className={classes['ul']}>
                {sortingOption.map((project, index )=> (
                    <li key={index}
                        className={index === activeSort ? classes['active'] : ''}
                        onClick={handleProjectClicked.bind(null, index)}
                    >{project.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default ProjectFilesSort;