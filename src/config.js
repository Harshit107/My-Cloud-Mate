export const APP_NAME = "My-Cloud-Mate"

const BASE_API_URL  = "http://localhost:3001";
// const BASE_API_URL_PROD  = "http://localhost:3001";

export const REGISTRATION_API =         BASE_API_URL + "/users/create";
export const LOGIN_API =                BASE_API_URL + "/users/login";
export const LOGOUT_API =               BASE_API_URL + "/users/logout";
export const IS_USER_LOGEDIN_API =        BASE_API_URL + "/users/check/login";
export const PROFILE_API =              BASE_API_URL + "/users/profile";
export const SEND_VERIFICATION_API =    BASE_API_URL + "/users/vaerification/email";
