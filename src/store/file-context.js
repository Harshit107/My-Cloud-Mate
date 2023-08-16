import { createContext } from "react"


const availableFilesContext = createContext({
    files : [],
    projects:[],
    availableFiles:[],
    searchFiles : () => {}
})

export default availableFilesContext;