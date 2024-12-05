import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PASSWORD_REGEX } from "../../modules/Regex";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { IfetchError } from "../../interfaces/IfetchError";
import { IloginObj, IloginResult } from "../../interfaces/Ilogin";
import { login } from "../../modules/fetches/LogSignin";
import { isFetchError } from "../../modules/TypeGuard";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../redux/action/token";



const LoginForm = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setUsernameError(false);
        setPasswordError(false);

        if (!password.match(PASSWORD_REGEX))
            dispatchBackgroundChange(dispatch, true, "Password not secure enough. It can't be right!", setPasswordError);

        const loginObj: IloginObj = {
            username: username,
            password: password
        }


        const res: IfetchError | IloginResult = await login(loginObj);

        if (isFetchError(res)) {
            switch (true) {
                case res.message.toLowerCase().includes('password'):
                    dispatchBackgroundChange(dispatch, true, res.message, setPasswordError);
                    break;
                case res.message.toLowerCase().includes('username'):
                    dispatchBackgroundChange(dispatch, true, res.message, setUsernameError);
                    break;
                default:
                    dispatchBackgroundChange(dispatch, true, "Unknown error!");
            }
        }

        dispatch(
            setToken((res as IloginResult).token)
        );

        dispatchBackgroundChange(dispatch, false, `Welcome back board ${username}!`)

        setTimeout(() => {
            navigate('/')
        }, 2500);

    }



    return (

        <Stack
            component='form'
            spacing={2}
            sx={{
                padding: {
                    xs: '2em',
                    md: '5em'
                }
            }}
            onSubmit={handleSubmit}
        >

            <TextField
                id="username"
                label="Username"
                required
                focused
                color="secondary"
                value={username}
                error={usernameError}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                id='password'
                label='Password'
                type="password"
                required
                focused
                color="secondary"
                value={password}
                error={passwordError}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" color="secondary" variant="contained">
                Login
            </Button>

            <Link to='/signin'>
                <Typography
                    variant="body2"
                    gutterBottom
                    sx={{
                        textDecoration:'none'
                    }}
                >
                    Are you new here? Let's register!
                </Typography>
            </Link>


        </Stack>

    );
}

export default LoginForm;