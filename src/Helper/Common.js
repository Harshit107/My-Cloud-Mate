import { getDataFromLocalStorage } from "./LocalStorage";


export const handleProjectData = function (data) {

    const defaultState = getDataFromLocalStorage();
    const dp = data.projects.filter(p => p.projectName === 'Default Project')
    if(data) {
        defaultState.files = data.files;
        defaultState.projects = data.projects;
        defaultState.activeProjectId = dp[0]._id;
    }
    return defaultState;
}