import { createContext } from "react"


const availableFilesContext = createContext({
    files : [],
    availableFiles:[],
    searchFiles : () => {}
})

export default availableFilesContext;