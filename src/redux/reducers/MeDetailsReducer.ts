import { reduxAction } from "../../interfaces/IreduxAction";
import { Irole } from "../../interfaces/Irole";
import { IuserCharacteristic } from "../../interfaces/Iuser";
import { CLEAR_ROLE, CLEAR_USERCHARACTERISTICS, SET_ROLE, SET_USERCHARACTERISTICS } from "../action/meDetails";

const roleInitialState: Irole = {
    id: 0,
    name: "",
    featureList: []
}



export const roleReducer = (state: Irole = roleInitialState, action: reduxAction<Irole>): Irole => {
    switch (action.type) {
        case SET_ROLE:
            return action.payload;
        case CLEAR_ROLE:
            return roleInitialState;
        default:
            return state;
    }
};

const ucInitialState: IuserCharacteristic = {
    id: 0,
    avatar: '',
    currency: '',
    dailyAmount: 0,
    todayAmount: 0,
    minimumSavings: 0,
    user: {
        id: '',
        name: '',
        surname: '',
        username: '',
        email: '',
    },
}

export const userCharacteristicReducer = (state: IuserCharacteristic = ucInitialState, action: reduxAction<IuserCharacteristic>): IuserCharacteristic => {
    switch (action.type) {
        case SET_USERCHARACTERISTICS:
            return action.payload;
        case CLEAR_USERCHARACTERISTICS:
            return ucInitialState;
        default:
            return state;
    }
}
