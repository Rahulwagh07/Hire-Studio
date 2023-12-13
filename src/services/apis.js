const BASE_URL = process.env.REACT_APP_BASE_URL


//Auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }

  //job endpoints
  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  }

  export const jobEndPoints = {
    GET_ALL_APPLIEDJOBS_API: BASE_URL + "/job/getAllAppliedJobs",
    GET_JOB_DETAILS_API: BASE_URL + "/job/getJobDetails",
    CREATE_JOB_API: BASE_URL + "/job/createJob",
    GET_ALL_APPLICANTS_FOR_JOB_API: BASE_URL + "/job/getAllApplicantsForJob",
    HIRE_JOBSEEKER_API: BASE_URL + "/job/hireJobSeeker",
    GET_ALL_JOBS_BY_CREATOR_API: BASE_URL + "/job/getAllJobsByCreator",
    APPLY_FOR_JOB_API: BASE_URL +  "/job/applyForJob",
  }
//Setting page endpoints
  export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  }