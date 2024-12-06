import { Irole } from "../../interfaces/Irole";

export const SET_ROLE = "SET_ROLE";
export const CLEAR_ROLE = "CLEAR_ROLE";

export const setRole = (role: Irole) => ({
    type: SET_ROLE,
    payload: role,
});

export const clearRole = () => ({
    type: CLEAR_ROLE,
});
