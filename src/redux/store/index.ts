import { combineReducers } from "redux";
import { backgroundErrorReducer } from "../reducers/BackgroundError";
import { configureStore } from "@reduxjs/toolkit";


const mergedReducers = combineReducers({
    backgroundError: backgroundErrorReducer
});


export interface Istore {
    backgroundError: boolean
}

export const store = configureStore({
    reducer: mergedReducers
});