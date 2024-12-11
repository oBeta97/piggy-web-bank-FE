import { ImodalState } from "../../interfaces/ImodalState";
import { reduxAction } from "../../interfaces/IreduxAction";
import { HIDE_MODAL, CHANGE_MODAL_STATE } from "../action/modal";


const modalInitialState: ImodalState = {
    show: false,
    title: '',
    content: null
}


export const modalReducer = (state: ImodalState = modalInitialState, action: reduxAction<ImodalState>): ImodalState => {
    switch (action.type) {
        case CHANGE_MODAL_STATE:
            return action.payload;
        case HIDE_MODAL:
            return modalInitialState;
        default:
            return state;
    }
}