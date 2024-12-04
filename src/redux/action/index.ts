import { UnknownAction } from "redux";


export const ADD_BACKGROUND_ERROR: string = 'ADD_BACKGROUND_ERROR';


export const setBackgroundError = (isError:boolean): UnknownAction => {
    return {
        type: ADD_BACKGROUND_ERROR,
        payload: isError,
    };
}