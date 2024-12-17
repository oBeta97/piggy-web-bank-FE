import { Typography } from "@mui/material";
import ContentContainer from "../BaseComponents/ContentContainer";
import BaseBox from "../BaseComponents/BaseBox";
import SettingsButtonList from "./SettingsButtonList";


const SettingsPage = () => {
    return (
    <ContentContainer
            title={
                <Typography variant="h3">
                    Settings
                </Typography>
            }
            content={
                <BaseBox
                    small
                    content={
                        <SettingsButtonList />
                    }
                />
            }
        />
    );
}

export default SettingsPage;