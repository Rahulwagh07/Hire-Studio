import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import jobReducer from "../slices/jobSlice"
import saveJobSlice from "../slices/saveJobSlice";
import themeSlice from "../slices/themeSlice";
const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    job: jobReducer,
    saveJob: saveJobSlice,
    theme: themeSlice,

})

export default rootReducer;