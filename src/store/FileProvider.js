
import FileContext from './file-context';
import { useEffect, useReducer } from 'react';
import DUMMY_FILES, { PROJECT } from '../components/DummyFiles'



const defaultState = {
    files: DUMMY_FILES,
    activeProjectId: 0,
    projects: PROJECT,
    availableFiles: DUMMY_FILES
}

const fileReducer = (state, action) => {

    if (action.type === 'search') {
        const filterFiles = state.files.filter(file => (
            file.name.toLowerCase().includes(action.filename.toLowerCase())
                 && file.projectId === state.activeProjectId))

        return {
            activeProjectId: state.activeProjectId,
            files: state.files,
            availableFiles: filterFiles,
            projects: state.projects
        }
    }

    if (action.type === 'SELECT_PROJECT') {
        const filterFiles = state.files.filter(file => file.projectId === action.id)
        return {
            activeProjectId: action.id,
            files: state.files,
            availableFiles: filterFiles,
            projects: state.projects
        }
    }

    if(action.type === 'ADD_PROJECT') {

        const newProjects = state.projects.concat(action.project);
        return  {
            activeProjectId: state.activeProjectId,
            files: state.files,
            availableFiles: state.availableFiles,
            projects : newProjects
        }
    }

    if(action.type === 'REMOVE_PROJECT') {
        const newProjects = state.projects.filter(project => project.id !== action.id);
        const activeProjectId = 0;
        return  {
            activeProjectId: activeProjectId,
            files: state.files,
            availableFiles: state.availableFiles,
            projects : newProjects
        }
    }

    return defaultState;


}


const FileProvider = (props) => {

    const [filesStore, dispatchfiles] = useReducer(fileReducer, defaultState);

    const searchFileHandler = (text) => {
        dispatchfiles({
            type: 'search',
            filename: text,

        })
    }
    const selectFilesHandler = (id) => {
        dispatchfiles({
            type: 'SELECT_PROJECT',
            id: id,
        })
    }
    

    const addNewFileHandler = (file) => {
        dispatchfiles({
            type: 'ADD_FILE',
            file: file,
        })
    }

    const addNewProjectHandler = (project) => {
        dispatchfiles({
            type: 'ADD_PROJECT',
            project: project,
        })
    }

    

    const removeProjectHandler = (id) => {
        dispatchfiles({
            type: 'REMOVE_PROJECT',
            id: id,
        })
    }



    const filesState = {
        activeProjectId: filesStore.activeProjectId,
        files: DUMMY_FILES,
        availableFiles: filesStore.availableFiles,
        projects: filesStore.projects,
        searchFiles: searchFileHandler,
        selectedFilesFun: selectFilesHandler,
        addNewProject : addNewProjectHandler,
        addNewFile : addNewFileHandler,
        removeProject : removeProjectHandler

    }

    useEffect(() => {
        selectFilesHandler(0);
    }, [])


    return <FileContext.Provider value={filesState}>
        {props.children}
    </FileContext.Provider>
}

export default FileProvider;