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


const VariableTransactionsTable = () => {

    const [transactions, setTransactions] = useState<IdynamicTableRow<[string,string,string]>[] | null>(null);
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
        if(!isFirstRender.current)
            getTransactions()

        isFirstRender.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCurrency]);

    const getTransactions = async (): Promise<void> => {

        const variableTransactionsPage = await getVariableTransactions();
        if (isFetchError(variableTransactionsPage))
            dispatchBackgroundChange(dispatch, true, variableTransactionsPage.message);

        const a: IdynamicTableRow<[string,string,string]>[] = [];

        (variableTransactionsPage as Ipage<IvariableTransaction>).content.forEach(vt => {
            a.push({
                columns: [
                    vt.name, 
                    vt.transactionDt, 
                    vt.amount.toString() + userCurrency]
            })
        });

        setTransactions(a);

        console.log(transactions);

    };


    return (
        <DynamicTable
            tableTitles={tableTitles}
            tableRows={transactions as IdynamicTableRow<[string,string,string]>[]}
        />
    );
}

export default VariableTransactionsTable;