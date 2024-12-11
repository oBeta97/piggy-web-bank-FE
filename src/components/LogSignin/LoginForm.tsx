import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { IfetchError } from "../../interfaces/IfetchError";
import { IloginObj, IloginResult } from "../../interfaces/Ilogin";
import { login } from "../../modules/fetches/LogSignin";
import { isFetchError } from "../../modules/TypeGuard";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../redux/action/token";
import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { Irole } from "../../interfaces/Irole";
import { meRoles } from "../../modules/fetches/meDetails";
import { setRole } from "../../redux/action/meDetails";
import { checkPasswordSecurityLevel } from "../../modules/DataChecks";
import { userCharacteristicsFetch } from "../../modules/dispatches/UserCharacteristics";



const LoginForm = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginFetch = async (loginObj: IloginObj): Promise<void> => {
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
                    dispatchBackgroundChange(dispatch, true, res.message);
            }
        }


        dispatch(
            setToken((res as IloginResult).token)
        );
    }

    const roleFetch = async (): Promise<void> => {

        const rolesFetchResult: IfetchError | IdeleteResponse | Irole = await meRoles();

        if (isFetchError(rolesFetchResult))
            dispatchBackgroundChange(dispatch, true, rolesFetchResult.message);

        dispatch(
            setRole(rolesFetchResult as Irole)
        );

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setUsernameError(false);
        setPasswordError(false);

        checkPasswordSecurityLevel(password, dispatch, setPasswordError);

        const loginObj: IloginObj = {
            username: username,
            password: password
        }


        await loginFetch(loginObj);
        await roleFetch();
        await userCharacteristicsFetch(dispatch);


        dispatchBackgroundChange(dispatch, false, `Welcome back ${username}!`)

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
                        textDecoration: 'none'
                    }}
                >
                    Are you new here? Let's register!
                </Typography>
            </Link>


        </Stack>

    );
}

export default LoginForm;