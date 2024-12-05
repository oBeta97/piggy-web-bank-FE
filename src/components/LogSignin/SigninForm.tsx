import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../modules/Regex";
import { useDispatch } from "react-redux";
import { signin } from "../../modules/fetches/LogSignin";
import { IsigninObj } from "../../interfaces/IsigninObj";
import { IfetchError } from "../../interfaces/IfetchError";
import { isFetchError } from "../../modules/TypeGuard";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { useNavigate } from "react-router-dom";


const SigninForm = () => {

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkFormValues = () => {
        if (!email.match(EMAIL_REGEX))
            dispatchBackgroundChange(dispatch, true, "Email not valid!", setEmailError);

        if (password !== confirmPassword)
            dispatchBackgroundChange(dispatch, true, "Wrong confirm password!", setPasswordError);

        if (!password.match(PASSWORD_REGEX))
            dispatchBackgroundChange(dispatch, true, "Password not secure enough!", setPasswordError);

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        setUsernameError(false);

        checkFormValues();

        const signInObj: IsigninObj = {
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password
        }

        const res: IfetchError | IsigninObj = await signin(signInObj);

        if (isFetchError(res)) {
            switch (true) {
                case res.message.toLowerCase().includes('email'):
                    dispatchBackgroundChange(dispatch, true, res.message, setEmailError);
                    break;
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

        dispatchBackgroundChange(dispatch, false, 'Welcome on board!')

        setTimeout(() => {
            navigate('/login')
        }, 2500);
    };



    return (

        <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{
                padding: {
                    xs: '2em',
                    md: '5em'
                }
            }}
        >
            <TextField
                id="name"
                label="Name"
                focused
                color="secondary"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                id="surname"
                label="Surname"
                focused
                color="secondary"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
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
                id="email"
                label="Email"
                required
                focused
                color="secondary"
                value={email}
                error={emailError}
                onChange={(e) => setEmail(e.target.value)}
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
            <TextField
                id='confirmPassword'
                label="Confirm password"
                type="password"
                required
                focused
                color="secondary"
                value={confirmPassword}
                error={passwordError}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" color="secondary" variant="contained">Signin</Button>

        </Stack>
    );
}


export default SigninForm;