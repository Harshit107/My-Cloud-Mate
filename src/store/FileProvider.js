
import FileContext from './file-context';
import { useReducer } from 'react';
import DUMMY_FILES from '../components/DummyFiles'


const defaultState = {
    files : DUMMY_FILES,
    availableFiles : DUMMY_FILES
}

const fileReducer = (state, action) => {

    if(action.type === 'search') {
        const filterFiles =  state.files.filter(file => file.name.toLowerCase().includes(action.filename.toLowerCase()))
        return {
            files : state.files,
            availableFiles : filterFiles
        }
    }

    return defaultState;


}


const FileProvider = (props) => {

    const [files, dispatchfiles] = useReducer(fileReducer,defaultState);

    const searchFileHandler = (text) => {
        dispatchfiles({
            type : 'search',
            filename : text,

        })
    }

    const filesState = {
        files : DUMMY_FILES,
        availableFiles : files.availableFiles,
        searchFiles : searchFileHandler
    }
    return <FileContext.Provider value={filesState}>
            {props.children}
    </FileContext.Provider>
}

export default FileProvider;