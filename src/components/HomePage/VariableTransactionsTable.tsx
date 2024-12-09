import { useEffect, useRef, useState } from "react";
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


const VariableTransactionsTable = () => {

    const [transactions, setTransactions] = useState<IdynamicTableRow<[string, string, string]>[] | null>(null);
    const dispatch = useDispatch();
    const isFirstRender = useRef(true);

    const userCurrency: string = useSelector((store: Istore) => store.userCharacteristc.currency)

    const tableTitles = {
        columns: ['Name', 'Date time', 'Amount']
    };


    // We will use useRef instead of:
    // useEffect(()=>{},[]);

    useEffect(() => {
        // this useEffect will be executed only when userCurrency will change and not at first render
        if (!isFirstRender.current)
            getTransactions()

        isFirstRender.current = false
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCurrency]);

    const getTransactions = async (): Promise<void> => {

        const variableTransactionsPage = await getVariableTransactions();
        if (isFetchError(variableTransactionsPage))
            dispatchBackgroundChange(dispatch, true, variableTransactionsPage.message);

        const a: IdynamicTableRow<[string, string, string]>[] = [];

        (variableTransactionsPage as Ipage<IvariableTransaction>).content.forEach(vt => {
            a.push({
                columns: [
                    vt.name,
                    isoDateTimeToLocalString(vt.transactionDt),
                    vt.amount.toString() + userCurrency]
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