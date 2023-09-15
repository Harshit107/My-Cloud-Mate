import { getDataFromLocalStorage } from "./LocalStorage";


export const handleProjectData = function (data) {

    const defaultState = getDataFromLocalStorage();
    if(data) {
        defaultState.files = data.files;
        defaultState.projects = data.projects;
        defaultState.activeProjectId = getDefaultProjectId(data);
    }
    return defaultState;
}

export const getDefaultProjectId = function (data) {

    const dp = data.projects.filter(p => p.projectName === 'Default Project')
    return dp[0]._id;
}

export const convertDateToString = function (date) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    return dd + '-' + mm + '-' + yyyy;
  }
