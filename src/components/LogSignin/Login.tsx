import { Typography } from "@mui/material";
import ContentContainer from "../BaseComponents/ContentContainer";
import BaseBox from "../BaseComponents/BaseBox";
import LoginForm from "./LoginForm";


const Login = () => {
    return (
        <ContentContainer
            title={
                <Typography variant="h3">
                    Login
                </Typography>
            }
            content={
                <BaseBox
                    content={
                        <LoginForm />
                    }
                />
            }
        />
    );
}

export default Login;