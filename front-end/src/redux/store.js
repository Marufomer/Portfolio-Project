import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoReducer";


const rootReducer = combineReducers({
    userInfo : userInfoReducer,
})


// create store

export default configureStore({reducer: rootReducer})