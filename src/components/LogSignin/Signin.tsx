import { Typography } from "@mui/material";
import ContentContainer from "../BaseComponents/ContentContainer";
import BaseBox from "../BaseComponents/BaseBox";
import SigninForm from "./SigninForm";


const Signin = () => {
    return (
        <ContentContainer
            title={
                <Typography variant="h3">
                    SIGNIN
                </Typography>
            }
            content={
                <BaseBox small content={
                    <SigninForm />
                } />
            }
        />
    );
}

export default Signin;