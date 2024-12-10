import { useEffect, useState } from "react";
import { getAllVariableTransactions } from "../../modules/fetches/VariableTransactions";
import DynamicTable from "../BaseComponents/DynamicTable";
import { IvariableTransaction } from "../../interfaces/Itransaction";
import { useSelector } from "react-redux";
import { Istore } from "../../redux/store";
import { IuserCharacteristic } from "../../interfaces/Iuser";
import { IdynamicTableRow } from "../../interfaces/IdynamicTable";


const TransactionByCategoryTable = () => {

    const [amountByCategory, setAmountByCategory] = useState<IdynamicTableRow<[string, string]>[] | null>(null);

    const userCharacteristics: IuserCharacteristic = useSelector((store: Istore) => store.userCharacteristc);

    const getTransactions = async () => {

        const transactions = await getAllVariableTransactions(true) as IvariableTransaction[];

        const totalsByCategory = sumByCategory(transactions);

        const res:IdynamicTableRow<[string,string]>[] = [];

        Object.keys(totalsByCategory)
        .forEach(element => {    
            res.push(
                {
                    columns:[
                        element,
                        totalsByCategory[element]
                    ]
                }
            )
        });


        setAmountByCategory(res);
    }

    const sumByCategory = (t: IvariableTransaction[]) => (
        Object.entries(
            t.reduce((acc, transaction) => {
                const categoryName = transaction.transactionCategory.name;
                if (!acc[categoryName]) {
                    acc[categoryName] = 0;
                }
                acc[categoryName] += transaction.amount;
                return acc;
            }, {} as Record<string, number>)
        )
        .sort(([, sumA], [, sumB]) => sumB - sumA)
        .reduce((acc, [category, total]) => {
            acc[category] = `${total}${userCharacteristics.currency}`;
            return acc;
        }, {} as Record<string, string>)
    )



    useEffect(() => {
        getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCharacteristics])

    return (
        <DynamicTable
            tableRows={amountByCategory as IdynamicTableRow<[string, string]>[]}
        />
    );
}

export default TransactionByCategoryTable;