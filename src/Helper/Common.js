import { getDataFromLocalStorage } from "./LocalStorage";

export const handleProjectData = function (data) {
  const defaultState = getDataFromLocalStorage();
  if (data) {
    const payload = data.data || (data.files && data.projects ? data : data.message || {});
    defaultState.files = payload.files || [];
    defaultState.projects = payload.projects || [];
    defaultState.activeProjectId = getDefaultProjectId(payload);
  }
  return defaultState;
};

export const getDefaultProjectId = function (data) {
  if (!data || !data.projects || !Array.isArray(data.projects)) {
    return '0';
  }
  const dp = data.projects.filter((p) => p.projectName === "Default Project");
  if (dp.length > 0) {
    return dp[0]._id;
  }
  if (data.projects.length > 0) {
    return data.projects[0]._id;
  }
  return '0';
};

export function convertDateToString(timestamp) {
  if (!timestamp || (typeof timestamp !== "string" && typeof timestamp !== "number")) {
    return "";
  }
  const str = String(timestamp);
  if (str.startsWith("C") || str.startsWith("L")) {
    return str;
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return str;
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}
