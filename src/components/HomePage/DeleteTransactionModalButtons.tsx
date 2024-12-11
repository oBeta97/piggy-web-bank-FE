import { Button, Grid2 } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/action/modal";
import { deleteVariableTransaction } from "../../modules/fetches/VariableTransactions";
import { isFetchError } from "../../modules/TypeGuard";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { userCharacteristicsFetch } from "../../modules/dispatches/UserCharacteristics";
import { Istore } from "../../redux/store";
import { IselectedRow, resetSelectedDynamicTableRow } from "../../redux/action/dynamicTable";



const DeleteTransactionModalButtons = () => {

    const dispatch = useDispatch();
    const selectedDynamicTableRow: IselectedRow = useSelector((store: Istore) => store.selectedDynamicTableRow)


    const handleCancelClick = ():void => {
        dispatch(
            hideModal()
        )
    };


    const handleDeleteClick = async ():Promise<void> => {

        const deleteRes = await deleteVariableTransaction(selectedDynamicTableRow.rowElementId as number)

        if (isFetchError(deleteRes))
            dispatchBackgroundChange(dispatch, true, deleteRes.message);

        dispatchBackgroundChange(dispatch, false, 'Transaction deleted!')


        userCharacteristicsFetch(dispatch);
        dispatch(resetSelectedDynamicTableRow());
        dispatch(hideModal());

    }

    return (
        <Grid2 container sx={{ width: '100%', mt: '1em' }} justifyContent={"space-evenly"}>
            <Grid2>
                <Button
                    variant="contained"
                    onClick={handleCancelClick}
                >
                    cancel
                </Button>
            </Grid2>
            <Grid2>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleDeleteClick}
                >
                    delete
                </Button>
            </Grid2>
        </Grid2>
    );
}

export default DeleteTransactionModalButtons;