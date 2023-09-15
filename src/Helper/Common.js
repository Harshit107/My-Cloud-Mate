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

export function convertDateToString(timestamp) {
        if(!timestamp || timestamp.startsWith('C') || timestamp.startsWith('L')) return timestamp;
        
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);  // Take the last two digits of the year
    
        return `${day}-${month}-${year}`;
    }