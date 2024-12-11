import { Button, TableCell, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import {  resetSelectedDynamicTableRow } from "../../redux/action/dynamicTable";
import { changeModalState } from "../../redux/action/modal";
import { DELETE_TRANSACTION_BUTTONS, UPDATE_VARIABLE_TRANSACTION_FORM } from "../../modules/ModalContents";



const VariableTransactionTableClickedRow = () => {

    const dispatch = useDispatch();

    const handleCancelButtonClick = () => {
        dispatch(resetSelectedDynamicTableRow())
    }

    const handleDeleteButtonClick = () => {
        dispatch(
            changeModalState({
                show: true,
                title: 'Are you sure to continue?',
                content: DELETE_TRANSACTION_BUTTONS
            })
        )

    }

    const handleEditButtonClick = async () => {
        dispatch(
            changeModalState({
                show: true,
                title: 'Update transaction',
                content: UPDATE_VARIABLE_TRANSACTION_FORM
            })
        )
    }


    return (
        <TableRow
            key={'r' + 999}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center">
                <Button
                    size="small"
                    sx={{ py: '1px', px: '5px', fontSize: '0.8em', minWidth: '0px' }}
                    variant="contained"
                    color="secondary"
                    onClick={handleEditButtonClick}
                >
                    edit
                </Button>
            </TableCell>
            <TableCell align="center">
                <Button
                    size="small"
                    sx={{ py: '1px', px: '5px', fontSize: '0.8em', minWidth: '0px' }}
                    variant="contained"
                    color="warning"
                    onClick={handleDeleteButtonClick}
                >
                    delete
                </Button>
            </TableCell>
            <TableCell align="center">
                <Button
                    size="small"
                    sx={{ py: '1px', px: '5px', fontSize: '0.8em', minWidth: '0px' }}
                    variant="contained"
                    color="primary"
                    onClick={handleCancelButtonClick}
                >
                    cancel
                </Button>
            </TableCell>
        </TableRow>
    );
}

export default VariableTransactionTableClickedRow;