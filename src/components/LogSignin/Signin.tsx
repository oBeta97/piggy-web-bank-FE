import { Typography } from "@mui/material";
import ContentContainer from "../BaseComponents/ContentContainer";
import SigninBox from "./SigninBox";


const Signin = () => {
    return (
        <ContentContainer
            title={
                <Typography variant="h3">
                    SIGNIN
                </Typography>
            }
            content={
                <SigninBox />
            }
        />
    );
}

export default Signin;