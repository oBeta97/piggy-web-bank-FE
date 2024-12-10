import { Grid2, Stack } from "@mui/material";
import VariableTransactionsTable from "./VariableTransactionsTable";
import BaseBox from "../BaseComponents/BaseBox";
import TransactionByCategoryTable from "./TransactionByCategoryTable";


const HomePageContent = () => {
    return (
        <Grid2 container sx={{ width: '100%', height: '90%' }} spacing={2}>
            <Grid2 size={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Stack>
                    <BaseBox
                        title="Expenses by category"
                        content={<TransactionByCategoryTable />}
                    />
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
                <BaseBox
                    title="Transactions"
                    content={<VariableTransactionsTable />}
                />
            </Grid2>
            <Grid2 size={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                cioafaiuerfh
            </Grid2>
        </Grid2>
    );
}

export default HomePageContent;