import { Button, Typography } from "@mui/material";
import ContentContainer from "../BaseComponents/ContentContainer";
import DynamicTable from "../BaseComponents/DynamicTable";
import BaseBox from "../BaseComponents/BaseBox";
import { useEffect, useState } from "react";
import { getAllFixedTransactions } from "../../modules/fetches/FixedTransactions";
import { IdynamicTableRow } from "../../interfaces/IdynamicTable";
import { IfetchError } from "../../interfaces/IfetchError";
import { IfixedTransaction } from "../../interfaces/IfixedTransaction";
import { isFetchError } from "../../modules/TypeGuard";
import { useDispatch, useSelector } from "react-redux";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { Istore } from "../../redux/store";
import { changeModalState } from "../../redux/action/modal";
import { ADD_NEW_FIXED_TRANSACTION } from "../../modules/ModalContents";
import FixedTransactionTableClickedRow from "./FixedTransactionTableClickedRow";

interface IfixedTransactionPage {
    expenses?: boolean
    incomes?: boolean
}

const FixedTransactionsPage = (props: IfixedTransactionPage) => {

    const [fixedTransactions, setFixedTransactions] = useState<IdynamicTableRow<[string, string, string]>[] | null>(null);

    const dispatch = useDispatch();

    const userCharacteristic = useSelector((store: Istore) => store.userCharacteristc);


    const titles: IdynamicTableRow<[string, string, string]> = { columns: ['Description', 'Monthly', 'Amount'] };


    const getFixedTransactions = async (): Promise<void> => {
        const fixedTransactions: IfetchError | IfixedTransaction[] = await getAllFixedTransactions(props.incomes as boolean);

        if (isFetchError(fixedTransactions))
            dispatchBackgroundChange(dispatch, true, fixedTransactions.message);

        const res: IdynamicTableRow<[string, string, string]>[] = [];

        (fixedTransactions as IfixedTransaction[]).forEach(ft => {
            res.push({
                columns: [
                    ft.name,
                    ft.period.toString(),
                    ft.amount.toString() + userCharacteristic.currency
                ],
                elementId: ft.id
            })
        });

        setFixedTransactions(res);
    }


    useEffect(() => {
        getFixedTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.expenses, props.incomes, userCharacteristic])


    const handleAddClick = async (): Promise<void> => {
        dispatch(
            changeModalState({
                show: true,
                title: 'Add new fixed transaction',
                content: ADD_NEW_FIXED_TRANSACTION
            })
        )

    }


    return (
        <ContentContainer
            title={
                <Typography variant="h3">
                    {`Fixed ${props.expenses ? 'expenses' : props.incomes ? 'incomes' : 'ERROR!'}`}
                </Typography>
            }
            content={
                <BaseBox
                    medium
                    content={
                        <>
                            <DynamicTable
                                tableTitles={titles}
                                tableRows={fixedTransactions as IdynamicTableRow<[string, string, string]>[]}
                                onContentTableClick={<FixedTransactionTableClickedRow />}
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
                    }
                />
            }
        />
    );


}

export default FixedTransactionsPage;