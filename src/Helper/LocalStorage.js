
export const initialize = () => {
    const storedData = localStorage.getItem('myData');
    const defaultData = {
        isAuthenticated: false,
        files: [],
        activeProjectId: 0,
        projects: [{id : 0, name : "Default Projet"}],
        availableFiles: []
      };
      if(!storedData)
      setDataToLocalStorage(JSON.stringify(defaultData));
}

export const getDataFromLocalStorage = () => {
    return  JSON.parse(localStorage.getItem('myData'));
    
    
}

export const setDataToLocalStorage = (data) => {
    return window.localStorage.setItem('myData', JSON.stringify(data))
}