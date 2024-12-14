import { Grid2, Typography } from "@mui/material"
import ContentContainer from "../BaseComponents/ContentContainer"
import BaseBox from "../BaseComponents/BaseBox"
import SavingsManagementTable from "./SavingsManagementTable";



const SavingsManagementPage = () => {
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
                        >
                            <Grid2 size={{ xs: 12, md: 8 }}>
                                <SavingsManagementTable />
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 4 }}>
                                ciao 4
                            </Grid2>
                        </Grid2>
                    }
                />
            }
        />
    );
}

export default SavingsManagementPage;