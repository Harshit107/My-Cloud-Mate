export const APP_NAME = "My-Cloud-Mate"

const BASE_API_URL = "http://localhost:3001";
// const BASE_API_URL_PROD  = "http://localhost:3001";

export const REGISTRATION_API = BASE_API_URL + "/users/create";
export const LOGIN_API = BASE_API_URL + "/users/login";
export const LOGOUT_API = BASE_API_URL + "/users/logout";
export const LOGOUT_ALL_API = BASE_API_URL + "/users/logout/all";
export const LOGOUT_ALL_EXCEPT_API = BASE_API_URL + "/users/logout/all/current";
export const LOGOUT_ALL_FROM = BASE_API_URL + "/users/logout/device";
export const IS_USER_LOGEDIN_API = BASE_API_URL + "/users/check/login";
export const PROFILE_API = BASE_API_URL + "/users/profile";
export const PROFILE_TOKEN_API = BASE_API_URL + "/users/profile/token";
export const SEND_VERIFICATION_API = BASE_API_URL + "/users/verification/email";

//project 
export const GET_PROJECT_DATA = BASE_API_URL + "/project/get";
export const UPLOAD_NEW_PROJECT = BASE_API_URL + "/project/create";
export const DELETE_PROJECT = BASE_API_URL + "/project/delete";

//project 
// export const GET_PROJECT_DATA = BASE_API_URL + "/project/get";
export const UPLOAD_NEW_File = BASE_API_URL + "/file/create";
// export const DELETE_PROJECT = BASE_API_URL + "/project/delete";

