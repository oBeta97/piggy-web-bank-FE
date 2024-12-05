import { UnknownAction } from "redux";


export const ADD_BACKGROUND_ERROR: string = 'ADD_BACKGROUND_ERROR';

export interface IbackgroundError {
    isError: boolean,
    text: string
}


export const setBackgroundError = (payload:IbackgroundError): UnknownAction => {
    return {
        type: ADD_BACKGROUND_ERROR,
        payload: payload,
    };
}