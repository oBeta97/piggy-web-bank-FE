import { Grid2, Typography } from "@mui/material"
import ContentContainer from "../BaseComponents/ContentContainer"
import BaseBox from "../BaseComponents/BaseBox"
import SavingsManagementTable from "./SavingsManagementTable";
import SavingsPieChart from "./SavingsPieChart";
import { useDispatch, useSelector } from "react-redux";
import { IuserCharacteristic } from "../../interfaces/Iuser";
import { Istore } from "../../redux/store";
import { setUserCharacteristic } from "../../redux/action/meDetails";
import { meUserDetails } from "../../modules/fetches/meDetails";
import { isFetchError } from "../../modules/TypeGuard";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { useEffect, useState } from "react";
import { IfetchError } from "../../interfaces/IfetchError";
import dayjs from "dayjs";
import { IfixedTransaction } from "../../interfaces/IfixedTransaction";
import { getAllFixedTransactions } from "../../modules/fetches/FixedTransactions";



const SavingsManagementPage = () => {

    const dispatch = useDispatch();
    const userCharacteristc: IuserCharacteristic = useSelector((store: Istore) => store.userCharacteristc)

    const [dailyFixedIncomesSummed, setDailyFixedIncomesSummed] = useState<number>(0);
    const [dailyFixedExpensesSummed, setDailyFixedExpensesSummed] = useState<number>(0);
    const [dailyMinimumSavings, setDailyMinimumSavings] = useState<number>(0);

    useEffect(() => {
        checkUserCurrency()

        setFixedTransactionSummed();
        setMinimumSavingsState();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCharacteristc]);



    const checkUserCurrency = async (): Promise<void> => {
        if (!userCharacteristc.currency)
            dispatch(
                setUserCharacteristic(
                    await getUserCharacteristics()
                )
            )
    }

    const getUserCharacteristics = async (): Promise<IuserCharacteristic> => {
        const res = await meUserDetails();

        if (isFetchError(res))
            dispatchBackgroundChange(dispatch, true, res.message);

        return res as IuserCharacteristic;
    }

    const setFixedTransactionSummed = async (): Promise<void> => {

        const [fixedIncomes, fixedExpenses] = await Promise.all([
            await getAllFixedTransactions(true),
            await getAllFixedTransactions(false)
        ]);

        checkError(fixedIncomes);
        checkError(fixedExpenses);

        const summedFI = (fixedIncomes as IfixedTransaction[]).reduce((sum, item) => { return sum += (item.amount / item.period / dayjs().endOf('month').date()) }, 0);
        const summedFE = (fixedExpenses as IfixedTransaction[]).reduce((sum, item) => { return sum += (item.amount / item.period / dayjs().endOf('month').date()) }, 0);

        setDailyFixedIncomesSummed(summedFI)
        setDailyFixedExpensesSummed(summedFE)
    }

    const setMinimumSavingsState = async (): Promise<void> => {
        setDailyMinimumSavings(userCharacteristc.minimumSavings / dayjs().endOf('month').date());
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkError = (x: IfetchError | any): void => {

        if (isFetchError(x))
            dispatchBackgroundChange(dispatch, true, x.message);

    }


    return (
        <ContentContainer
            title={
                <Typography variant="h3">
                    Savings Management
                </Typography>
            }
            content={
                <BaseBox
                    medium
                    content={
                        <Grid2
                            container sx={{ width: '100%' }}
                            direction={{ xs: 'column-reverse', md: 'row' }}
                            alignItems={'center'}
                        >
                            <Grid2 size={{ xs: 12, md: 8 }}>
                                <SavingsManagementTable
                                    summedFixedExpenses={dailyFixedExpensesSummed}
                                    summedFixedIncomes={dailyFixedIncomesSummed}
                                    minimumSavings={dailyMinimumSavings}
                                    currency={userCharacteristc.currency}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                <SavingsPieChart
                                    summedFixedExpenses={dailyFixedExpensesSummed}
                                    summedFixedIncomes={dailyFixedIncomesSummed}
                                    minimumSavings={dailyMinimumSavings}
                                    currency={userCharacteristc.currency}
                                />
                            </Grid2>
                        </Grid2>
                    }
                />
            }
        />
    );
}

export default SavingsManagementPage;