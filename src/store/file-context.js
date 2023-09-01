import { createContext } from "react"


const availableFilesContext = createContext({
    isAuthenticated : false,
    files : [],
    activeProjectId : 0,
    projects:[],
    availableFiles:[],
    searchFiles : () => {},
    selectedFilesFun : () => {},
    addNewProject : () => {},
    addNewFile : () => {},
    removeProject : () => {},
    updateAvailableFiles : () => {},
    updateIsAuthenticated : () => {},
})

export default availableFilesContext;