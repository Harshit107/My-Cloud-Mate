
import FileContext from './file-context';
import { useEffect, useReducer } from 'react';
import DUMMY_FILES, { PROJECT } from '../components/DummyFiles'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../Helper/LocalStorage';
// import filterFiles, { filterAvailable, sortedData } from '../Helper/filter';



const defaultState = getDataFromLocalStorage() || {
        files: [],
        isAuthenticated : false,
        activeProjectId: 0,
        projects: PROJECT,
        availableFiles: DUMMY_FILES
    }

// const defaultState = {
//     files: [],
//     activeProjectId: 0,
//     projects: PROJECT,
//     availableFiles: DUMMY_FILES
// }

const fileReducer = (state, action) => {

    if (action.type === 'search') {
        const filterFiles = state.files.filter(file => (
            file.name.toLowerCase().includes(action.filename.toLowerCase())
                 && file.projectId === state.activeProjectId))

        return {
            activeProjectId: state.activeProjectId,
            files: state.files,
            availableFiles: filterFiles,
            projects: state.projects,
            isAuthenticated : state.isAuthenticated
        }
    }

    if (action.type === 'SELECT_PROJECT') {
        const filterFiles = state.files.filter(file => file.projectId === action.id)
        return {
            activeProjectId: action.id,
            files: state.files,
            availableFiles: filterFiles,
            projects: state.projects,
            isAuthenticated : state.isAuthenticated

        }
    }

    if(action.type === 'ADD_PROJECT') {

        const newProjects = state.projects.concat(action.project);
        return  {
            activeProjectId: state.activeProjectId,
            files: state.files,
            availableFiles: state.availableFiles,
            projects : newProjects,
            isAuthenticated : state.isAuthenticated

        }
    }
    
    if(action.type === 'REMOVE_PROJECT') {
        const newProjects = state.projects.filter(project => project.id !== action.id);
        const activeProjectId = 0;
        return  {
            activeProjectId: activeProjectId,
            files: state.files,
            availableFiles: state.availableFiles,
            projects : newProjects,
            isAuthenticated : state.isAuthenticated

        }
    }

    if(action.type === 'ADD_FILE') {

        const allFiles = state.files.concat(action.file);
        const availableFiles = state.availableFiles.concat(action.file);
        return  {
            activeProjectId: state.activeProjectId,
            files: allFiles,
            availableFiles: availableFiles,
            projects : state.projects,
            isAuthenticated : state.isAuthenticated

        }
    }

    if(action.type === 'UPDATE_AVAILABLE_FILES') {

        return  {
            activeProjectId: state.activeProjectId,
            files: state.files,
            availableFiles: action.files,
            projects : state.projects,
            isAuthenticated : state.isAuthenticated

        }
    }


    return defaultState;


}


const FileProvider = (props) => {

    const [filesStore, dispatchfiles] = useReducer(fileReducer, defaultState);
    // console.log(sortedData(filesStore.files, {field : 'name', sortBy : 'last'}));
    // const availableFileType =  filterAvailable(filesStore.files);
    // console.log(filterFiles(filesStore.files,['PDF']));

    setDataToLocalStorage(filesStore)

    const searchFileHandler = (text) => {
        dispatchfiles({
            type: 'search',
            filename: text,

        })
    }
    const selectProjectHandler = (id) => {
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
    

    const updateAvailableFilesHandler = (files) => {
        if(!files)
            return selectProjectHandler(filesStore.activeProjectId)
        
        dispatchfiles({
            type: 'UPDATE_AVAILABLE_FILES',
            files
        })
    }


    const updateIsAuthenticatedHandler = (isUser = false) => {
        
        dispatchfiles({
            type: 'AUTH',
            isUser
        })
    }



    const filesState =   {
        activeProjectId: filesStore.activeProjectId,
        files: filesStore.files,
        availableFiles: filesStore.availableFiles,
        projects: filesStore.projects,
        isAuthenticated : filesStore.isAuthenticated,
        searchFiles: searchFileHandler,
        selectedFilesFun: selectProjectHandler,
        addNewProject : addNewProjectHandler,
        addNewFile : addNewFileHandler,
        removeProject : removeProjectHandler,
        updateAvailableFiles : updateAvailableFilesHandler,
        updateIsAuthenticated : updateIsAuthenticatedHandler, 

    }
    useEffect(() => {
        selectProjectHandler(filesState.activeProjectId);
    }, [filesState.activeProjectId])


    return <FileContext.Provider value={filesState}>
        {props.children}
    </FileContext.Provider>
}

export default FileProvider;