import { reduxAction } from "../../interfaces/IreduxAction"
import { ADD_BACKGROUND_ERROR } from "../action"



const initialState: boolean = false;


export const backgroundErrorReducer = (state: boolean = initialState, action: reduxAction<boolean>) => {

    switch (action.type) {
        case ADD_BACKGROUND_ERROR:
            return action.payload
        default:
            return state
    }


}