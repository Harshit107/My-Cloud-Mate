
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
    const filesState = {
        activeProjectId: filesStore.activeProjectId,
        files: DUMMY_FILES,
        availableFiles: filesStore.availableFiles,
        projects: PROJECT,
        searchFiles: searchFileHandler,
        selectedFilesFun: selectFilesHandler
    }

    useEffect(() => {
        selectFilesHandler(0);
    }, [])


    return <FileContext.Provider value={filesState}>
        {props.children}
    </FileContext.Provider>
}

export default FileProvider;