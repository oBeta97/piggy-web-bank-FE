import { ImodalState } from "../../interfaces/ImodalState";


export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE';
export const HIDE_MODAL = 'HIDE_MODAL';

export const changeModalState = (modalState:ImodalState) => ({
    type: CHANGE_MODAL_STATE,
    payload: modalState
})

export const hideModal = () => ({
    type: HIDE_MODAL,
})