import { reduxAction } from "../../interfaces/IreduxAction";
import { Irole } from "../../interfaces/Irole";
import { CLEAR_ROLE, SET_ROLE } from "../action/meDetails";

const initialState: Irole = {
    id: 0,
    name: "",
    featureList: []
}



export const roleReducer = (state: Irole = initialState, action: reduxAction<Irole>): Irole => {
    switch (action.type) {
        case SET_ROLE:
            return action.payload;
        case CLEAR_ROLE:
            return initialState;
        default:
            return state;
    }
};
