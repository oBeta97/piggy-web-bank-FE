

export const RESET_SELECTED_ROW = 'RESET_SELECTED_ROW';
export const SET_SELECTED_ROW = 'SET_SELECTED_ROW';

export interface IselectedRow {
    rowIndex:number,
    rowElementId: string | number | undefined
}

export const setSelectedDynamicTableRow = (selectedRow:IselectedRow) => ({
    type: SET_SELECTED_ROW,
    payload: selectedRow
})

export const resetSelectedDynamicTableRow = () => ({
    type: RESET_SELECTED_ROW,
})