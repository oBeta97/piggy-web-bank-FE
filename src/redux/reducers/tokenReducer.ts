import { reduxAction } from "../../interfaces/IreduxAction";
import { CLEAR_TOKEN, SET_TOKEN } from "../action/token";

// reducers/authReducer.ts
export interface AuthState {
    token: string | null
}

const initialState: AuthState = {
    token: null,
};

// Reducer
export const authReducer = (state:AuthState = initialState, action: reduxAction<AuthState>): AuthState => {
    switch (action.type) {
        case SET_TOKEN:
            return action.payload;
        case CLEAR_TOKEN:
            return { token: null };
        default:
            return state;
    }
};
