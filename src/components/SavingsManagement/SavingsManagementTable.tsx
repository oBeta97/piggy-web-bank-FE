import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { IdynamicTableRow } from "../../interfaces/IdynamicTable";
import DynamicTable from "../BaseComponents/DynamicTable";
import { SECONDARY_COLOR } from "../../modules/Colors";
import { IsavingsManagementComponentProps } from "../../interfaces/IsavingsManagementComponentProps";


const SavingsManagementTable = (props: IsavingsManagementComponentProps) => {

    const [tableContent, setTableContent] = useState<IdynamicTableRow<[string, string, string]>[]>([]);
    
    const setDynamicTable = async (): Promise<void> => {

        const lastDayOfThisMonth = dayjs().endOf('month').date();

        const tc: IdynamicTableRow<[string, string, string]>[] = [];


        const monthlyFixedIncome = (props.summedFixedIncomes * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Fixed Incomes',
                `${props.summedFixedIncomes.toFixed(2)}${props.currency}`,
                `${monthlyFixedIncome}${props.currency}`
            ]
        });

        const monthlyFixedExpenses = (props.summedFixedExpenses * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Fixed Expenses',
                `${props.summedFixedExpenses.toFixed(2)}${props.currency}`,
                `${monthlyFixedExpenses}${props.currency}`
            ]
        });

        const dailyAvailable = (props.summedFixedIncomes + props.summedFixedExpenses).toFixed(2);
        const monthlyAvailable = (Number(dailyAvailable) * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Available',
                `${dailyAvailable}${props.currency}`,
                `${monthlyAvailable}${props.currency}`
            ],
            customStyle: {
                isNotAmount: true,
            }
        });

        const dailyUsable = (Number(dailyAvailable) - props.minimumSavings).toFixed(2);
        const monthlyUsable = (Number(dailyUsable) * lastDayOfThisMonth).toFixed(2);

        tc.push({
            columns: [
                'Usable',
                `${dailyUsable}${props.currency}`,
                `${monthlyUsable}${props.currency}`
            ],
            customStyle: {
                isNotAmount: true,
            }
        });


        tc.push({
            columns: [
                'Minimum savings',
                `${(props.minimumSavings).toFixed(2)}${props.currency}`,
                `${(props.minimumSavings * lastDayOfThisMonth).toFixed(2)}${props.currency}`,
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
    }, [props]);



    return (
        <DynamicTable
            tableRows={tableContent}
        />
    );
}

export default SavingsManagementTable;