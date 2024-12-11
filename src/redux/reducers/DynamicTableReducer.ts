import { reduxAction } from "../../interfaces/IreduxAction";
import { IselectedRow, RESET_SELECTED_ROW, SET_SELECTED_ROW } from "../action/dynamicTable";

const selectedRowInitialState: IselectedRow = {
    rowIndex: -1,
    rowElementId: ''
}


export const selectedDynamicTableRowReducer = (state: IselectedRow = selectedRowInitialState, action: reduxAction<IselectedRow>): IselectedRow => {
    switch (action.type) {
        case SET_SELECTED_ROW:
            return action.payload;
        case RESET_SELECTED_ROW:
            return selectedRowInitialState;
        default:
            return state;
    }
}