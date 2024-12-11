import { useEffect, useState } from "react";
import DynamicTable from "../BaseComponents/DynamicTable";
import { IvariableTransaction } from "../../interfaces/Itransaction";
import { getVariableTransactions } from "../../modules/fetches/VariableTransactions";
import { isFetchError } from "../../modules/TypeGuard";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { useDispatch, useSelector } from "react-redux";
import { Ipage } from "../../interfaces/Ipage";
import { IdynamicTableRow } from "../../interfaces/IdynamicTable";
import { Istore } from "../../redux/store";
import { Button } from "@mui/material";
import { isoDateTimeToLocalString } from "../../modules/Dates";
import { changeModalState } from "../../redux/action/modal";
import { ADD_NEW_VAR_TRANSACTION } from "../../modules/ModalContents";
import { IuserCharacteristic } from "../../interfaces/Iuser";
import VariableTransactionTableClickedRow from "./VariableTransactionTableClickedRow";


const VariableTransactionsTable = () => {

    const [transactions, setTransactions] = useState<IdynamicTableRow<[string, string, string]>[] | null>(null);
    const dispatch = useDispatch();

    const userCharacteristic: IuserCharacteristic = useSelector((store: Istore) => store.userCharacteristc);

    const tableTitles = {
        columns: ['Name', 'Date time', 'Amount']
    };

    useEffect(() => {
        getTransactions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCharacteristic]);

    const getTransactions = async (): Promise<void> => {

        const variableTransactionsPage = await getVariableTransactions(0,20);


        if (isFetchError(variableTransactionsPage))
            dispatchBackgroundChange(dispatch, true, variableTransactionsPage.message);

        const a: IdynamicTableRow<[string, string, string]>[] = [];

        (variableTransactionsPage as Ipage<IvariableTransaction>).content.forEach(vt => {
            a.push({
                columns: [
                    vt.name,
                    isoDateTimeToLocalString(vt.transactionDt),
                    vt.amount.toString() + userCharacteristic.currency
                ],
                elementId: vt.id
            })
        });

        setTransactions(a);

    };

    const handleAddClick = () => {
        dispatch(
            changeModalState({
                show: true,
                title: 'Add new Transaction',
                content: ADD_NEW_VAR_TRANSACTION
            })
        )
    }

    return (
        <>
            <DynamicTable
                tableTitles={tableTitles}
                tableRows={transactions as IdynamicTableRow<[string, string, string]>[]}
                onContentTableClick={<VariableTransactionTableClickedRow />}
            />
            <Button
                variant="contained"
                color="secondary"
                sx={{ mb: '1em' }}
                onClick={handleAddClick}
            >
                ADD
            </Button>
        </>
    );
}

export default VariableTransactionsTable;