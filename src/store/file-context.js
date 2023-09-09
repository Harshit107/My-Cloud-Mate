import { createContext } from "react"


const availableFilesContext = createContext({
    isAuthenticated : false,
    files : [],
    activeProjectId : 0,
    projects:[],
    availableFiles:[],
    token : "",
    searchFiles : () => {},
    selectedFilesFun : () => {},
    addNewProject : () => {},
    addNewFile : () => {},
    removeProject : () => {},
    updateAvailableFiles : () => {},
    updateIsAuthenticated : () => {},
})

export default availableFilesContext;