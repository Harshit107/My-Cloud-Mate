const defaultData = {
    isAuthenticated: false,
    files: [],
    activeProjectId: '0',
    projects: [],
    availableFiles: [],
    token: ""
};
export const initialize = () => {
    const storedData = localStorage.getItem('myData');

    if (!storedData) {
        setDataToLocalStorage((defaultData));
    }
}

export const getDataFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('myData'));
    if (!data)
        return defaultData;
    return data


}

export const setDataToLocalStorage = (data) => {
    if (data?.token === undefined) {
        if (getDataFromLocalStorage())
            data.token = getDataFromLocalStorage();
        else
            data.token = ""
    }
    return window.localStorage.setItem('myData', JSON.stringify(data))
}
export const deleteLoacalStorage = () => {
    window.localStorage.setItem('myData', JSON.stringify(defaultData))
}

export const getTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('myData'))?.token;
}

export const setTokenToLocalStorage = (token) => {
    const data = getDataFromLocalStorage();
    data.token = token;
    setDataToLocalStorage(data);

}