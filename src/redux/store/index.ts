import { combineReducers } from "redux";
import { backgroundErrorReducer } from "../reducers/BackgroundError";
import { configureStore } from "@reduxjs/toolkit";
import { IbackgroundError } from "../action";


const mergedReducers = combineReducers({
    backgroundError: backgroundErrorReducer
});


export interface Istore {
    backgroundError: IbackgroundError
}

export const store = configureStore({
    reducer: mergedReducers
});