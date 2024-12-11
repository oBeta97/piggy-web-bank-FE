import { Irole } from "../../interfaces/Irole";
import { IuserCharacteristic } from "../../interfaces/Iuser";

export const SET_ROLE = "SET_ROLE";
export const CLEAR_ROLE = "CLEAR_ROLE";

export const SET_USERCHARACTERISTICS = "SET_USERCHARACTERISTICS";
export const CLEAR_USERCHARACTERISTICS = "CLEAR_USERCHARACTERISTICS";

export const setRole = (role: Irole) => ({
    type: SET_ROLE,
    payload: role,
});

export const clearRole = () => ({
    type: CLEAR_ROLE,
});

export const setUserCharacteristic = (uc: IuserCharacteristic) => ({
    type: SET_USERCHARACTERISTICS,
    payload: uc
});

export const clearUserCharacteristic = () => ({
    type: CLEAR_USERCHARACTERISTICS,
});

