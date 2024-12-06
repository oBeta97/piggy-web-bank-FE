import { Typography } from "@mui/material";
import { TEXT_COLOR } from "../../modules/Colors";
import { useSelector } from "react-redux";
import { Istore } from "../../redux/store";
import { IuserCharacteristic } from "../../interfaces/Iuser";


const HomePageTitle = () => {

    const userCharacteristc: IuserCharacteristic = useSelector((store: Istore) => store.userCharacteristc)

    return (
        <Typography
            variant="h2"
            gutterBottom
            sx={{
                color: TEXT_COLOR
            }}
        >
            Today's Credit: &nbsp;
            <Typography
                variant="h2"
                gutterBottom
                component="span"
            >
                {userCharacteristc.todayAmount}
                {userCharacteristc.currency}
            </Typography>
        </Typography>
    );
}

export default HomePageTitle;