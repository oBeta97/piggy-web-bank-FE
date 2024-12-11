import { Grid2, Stack } from "@mui/material";
import VariableTransactionsTable from "./VariableTransactionsTable";
import BaseBox from "../BaseComponents/BaseBox";
import TransactionByCategoryTable from "./TransactionByCategoryTable";
import GoalBar from "./GoalBar";
import SavingsChart from "./SavingsChart";


const HomePageContent = () => {
    return (
        <Grid2 container sx={{ width: { xs: '98%', sm: '100%' }, height: '90%' }} justifyContent={"space-evenly"} >
            <Grid2 size={4} sx={{ display: { xs: 'none', lg: 'block' } }} container alignItems={"center"} justifyContent={"center"}>
                <Stack spacing={3} height='100%' alignItems={'center'} justifyContent={'center'}>
                    <BaseBox
                        title="Expenses by category"
                        content={<TransactionByCategoryTable />}
                    />
                    <BaseBox
                        secondary
                        content={<GoalBar />}
                    />
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }} container alignItems={"center"} justifyContent={"center"}>
                <BaseBox
                    title="Transactions"
                    content={<VariableTransactionsTable />}
                />
            </Grid2>
            <Grid2 size={4} sx={{ display: { xs: 'none', lg: 'flex' } }} container alignItems="center" justifyContent="center">
                <BaseBox
                    title="Savings Chart"
                    content={<SavingsChart />}
                />
            </Grid2>
        </Grid2>
    );
}

export default HomePageContent;