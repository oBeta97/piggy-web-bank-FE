import { reduxAction } from "../../interfaces/IreduxAction"
import { ADD_BACKGROUND_ERROR, IbackgroundError } from "../action"



const initialState: IbackgroundError = {
    isError: false,
    text: ""
};


export const backgroundErrorReducer = (state: IbackgroundError = initialState, action: reduxAction<IbackgroundError>) => {

    switch (action.type) {
        case ADD_BACKGROUND_ERROR:
            return action.payload
        default:
            return state
    }


}