
export const initialize = () => {
    const storedData = localStorage.getItem('myData');
    const defaultData = {
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
    console.log("calling "+ data);
    return window.localStorage.setItem('myData', JSON.stringify(data))
}