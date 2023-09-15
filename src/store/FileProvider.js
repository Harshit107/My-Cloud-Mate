
import FileContext from './file-context';
import { useEffect, useReducer } from 'react';
import DUMMY_FILES, { PROJECT } from '../components/DummyFiles'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../Helper/LocalStorage';
import { getDefaultProjectId } from '../Helper/Common';
import { sortedData } from '../Helper/filter';
// import filterFiles, { filterAvailable, sortedData } from '../Helper/filter';



const defaultState = getDataFromLocalStorage() || {
        files: [],
        isAuthenticated : false,
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
            projects: state.projects,
            token : state.token,
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
            token : state.token,
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
            token : state.token,
            isAuthenticated : state.isAuthenticated

        }
    }
    
    if(action.type === 'REMOVE_PROJECT') {
        const newProjects = state.projects.filter(project => project._id !== action.id);
        const activeProjectId = getDefaultProjectId(state);
        return  {
            activeProjectId: activeProjectId,
            files: state.files,
            availableFiles: state.availableFiles,
            projects : newProjects,
            token : state.token,
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
            token : state.token,
            isAuthenticated : state.isAuthenticated

        }
    }

    if(action.type === 'UPDATE_AVAILABLE_FILES') {

        return  {
            activeProjectId: state.activeProjectId,
            files: state.files,
            availableFiles: action.files,
            projects : state.projects,
            token : state.token,
            isAuthenticated : state.isAuthenticated

        }
    }

    if(action.type === 'UPDATE_ALL') {
        const sortedAvailableFiles = sortedData(action.data.files, { sortBy : "first", field : 'name'})
        return  {
            ...action.data,
            files : sortedAvailableFiles
        }
    }


    return defaultState;


}


const FileProvider = (props) => {

    const [filesStore, dispatchfiles] = useReducer(fileReducer, defaultState);
    
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

    const updateAllData = (data = getDataFromLocalStorage()) => {
        
        dispatchfiles({
            type: 'UPDATE_ALL',
            data
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
        updateAllData : updateAllData, 

    }
    useEffect(() => {
        
        selectProjectHandler(filesState.activeProjectId);
    }, [filesState.activeProjectId])


    return <FileContext.Provider value={filesState}>
        {props.children}
    </FileContext.Provider>
}

export default FileProvider;