export const APP_NAME = "My-Cloud-Mate";
export const APP_EMAIL = "MyCloudMate";
export const REPLY_TO = "contact@harshit107.online";
export const PAYMENT_UNDER_DEVELOPEMENT = true;

// ======================= Storage Provider Strategy =======================
export const STORAGE_PROVIDERS = {
  FIREBASE: "FIREBASE",
  CLOUDFLARE: "CLOUDFLARE",
};

/**
 * ACTIVE STORAGE PROVIDER SWITCH:
 * Set to STORAGE_PROVIDERS.CLOUDFLARE or STORAGE_PROVIDERS.FIREBASE
 */
export const ACTIVE_STORAGE_PROVIDER = STORAGE_PROVIDERS.CLOUDFLARE;

const isLocalhost = Boolean(
  typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      ))
);

const BASE_API_URL = isLocalhost
  ? "http://localhost:3001"
  : "https://mycloudmate.api.harshit107.online";

// Auth & Users
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
export const SEND_OTP = BASE_API_URL + "/users/forget";
export const OTP_VERIFY_API = BASE_API_URL + "/users/verify/otp";
export const UPLOAD_PROFILE_IMAGE = BASE_API_URL + "/profile/image";

// Projects
export const GET_PROJECT_DATA = BASE_API_URL + "/project/get";
export const UPLOAD_NEW_PROJECT = BASE_API_URL + "/project/create";
export const DELETE_PROJECT = BASE_API_URL + "/project/delete";

export const PURCHASE_SESSION = BASE_API_URL + "/payment/checkout";

// Files
export const GET_PRESIGNED_URL_API = BASE_API_URL + "/file/presigned-url";
export const UPLOAD_NEW_File = BASE_API_URL + "/file/create";
export const DELETE_File = BASE_API_URL + "/file/delete";
export const SEMD_EMAIL = "https://email.api.harshit107.tech/public/email/notification";
