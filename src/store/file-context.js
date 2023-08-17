import { createContext } from "react"


const availableFilesContext = createContext({
    files : [],
    activeProjectId : 0,
    projects:[],
    availableFiles:[],
    searchFiles : () => {},
    selectedFilesFun : () => {},
})

export default availableFilesContext;