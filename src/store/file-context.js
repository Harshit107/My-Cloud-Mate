import { createContext } from "react"


const availableFilesContext = createContext({
    files : [],
    activeProjectId : 0,
    projects:[],
    availableFiles:[],
    searchFiles : () => {},
    selectedFilesFun : () => {},
    addNewProject : () => {},
    addNewFile : () => {},
    removeProject : () => {},
})

export default availableFilesContext;