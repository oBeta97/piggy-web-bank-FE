import { useEffect, useState } from "react";
import { IfetchError } from "../../interfaces/IfetchError";
import { isFetchError } from "../../modules/TypeGuard";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { useDispatch, useSelector } from "react-redux";
import { getAllFixedTransactions } from "../../modules/fetches/FixedTransactions";
import { IfixedTransaction } from "../../interfaces/IfixedTransaction";
import dayjs from "dayjs";
import { Istore } from "../../redux/store";
import { IuserCharacteristic } from "../../interfaces/Iuser";
import { IdynamicTableRow } from "../../interfaces/IdynamicTable";
import DynamicTable from "../BaseComponents/DynamicTable";
import { SECONDARY_COLOR } from "../../modules/Colors";



const SavingsManagementTable = () => {

    const [tableContent, setTableContent] = useState<IdynamicTableRow<[string,string,string]>[]>([]);

    const dispatch = useDispatch();
    const userCharacteristc: IuserCharacteristic = useSelector((store: Istore) => store.userCharacteristc)

    const setFixedTransactionSummed = async (): Promise<[number,number]> => {

        const [fixedIncomes, fixedExpenses] = await Promise.all([
            await getAllFixedTransactions(true),
            await getAllFixedTransactions(false)
        ]);

        checkError(fixedIncomes);
        checkError(fixedExpenses);

        return[
            (fixedIncomes as IfixedTransaction[]).reduce((sum, item) => { return sum += (item.amount / item.period / dayjs().endOf('month').date()) }, 0),
            (fixedExpenses as IfixedTransaction[]).reduce((sum, item) => { return sum += (item.amount / item.period / dayjs().endOf('month').date()) }, 0)
        ];
    }

    const setMinimumSavings = async (): Promise<number> => {
        return userCharacteristc.minimumSavings / dayjs().endOf('month').date();
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkError = (x: IfetchError | any): void => {

        if (isFetchError(x))
            dispatchBackgroundChange(dispatch, true, x.message);

    }

    const setDynamicTable = async (): Promise<void> => {
        const [dailyFixedIncomesSummed, dailyFixedExpensesSummed] = await setFixedTransactionSummed();
        const dailyMinimumSavings = await setMinimumSavings();

        const lastDayOfThisMonth = dayjs().endOf('month').date();

        const tc: IdynamicTableRow<[string, string, string]>[] = [];
        

        const monthlyFixedIncome = (dailyFixedIncomesSummed * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Fixed Incomes',
                `${dailyFixedIncomesSummed.toFixed(2)}${userCharacteristc.currency}`,
                `${monthlyFixedIncome}${userCharacteristc.currency}`
            ]
        });

        const monthlyFixedExpenses = (dailyFixedExpensesSummed * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Fixed Expenses',
                `${dailyFixedExpensesSummed.toFixed(2)}${userCharacteristc.currency}`,
                `${monthlyFixedExpenses}${userCharacteristc.currency}`
            ]
        });

        const dailyAvailable = (dailyFixedIncomesSummed - dailyFixedExpensesSummed).toFixed(2);
        const monthlyAvailable = (Number(dailyAvailable) * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Available',
                `${dailyAvailable}${userCharacteristc.currency}`,
                `${monthlyAvailable}${userCharacteristc.currency}`
            ],
            customStyle: {
                isNotAmount: true,
            }
        });

        const dailyUsable = Number(dailyAvailable) - userCharacteristc.minimumSavings;
        const monthlyUsable = (dailyUsable * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Usable',
                `${dailyUsable}${userCharacteristc.currency}`,
                `${monthlyUsable}${userCharacteristc.currency}`
            ],
            customStyle: {
                isNotAmount: true,
            }
        });
        

        tc.push({
            columns: [
                'Minimum savings',
                `${dailyMinimumSavings}${userCharacteristc.currency}`,
                `${userCharacteristc.minimumSavings}${userCharacteristc.currency}`
            ],
            customStyle: {
                isNotAmount: true,
                textColor: SECONDARY_COLOR
            }
        });

        setTableContent(tc);

    }


    useEffect(() => {
        setDynamicTable()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <DynamicTable 
            tableRows={tableContent}
        />
    );
}

export default SavingsManagementTable;