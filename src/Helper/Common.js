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

