import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../modules/Regex";
import { useDispatch } from "react-redux";
import { setBackgroundError } from "../../redux/action";
import { signin } from "../../modules/fetches/LogSignin";
import { IsigninObj } from "../../interfaces/IsigninObj";


const SigninForm = () => {

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        dispatch(setBackgroundError(false));


        if (!email.match(EMAIL_REGEX)) {
            console.error("Email not valid!")
            setEmailError(true);
            dispatch(setBackgroundError(true));
            return;
        }

        if (password !== confirmPassword) {
            console.error("Wrong confirm password!")
            setPasswordError(true);
            dispatch(setBackgroundError(true));
            return;
        }

        if (!password.match(PASSWORD_REGEX)) {
            console.error("Password not secure enough!")
            setPasswordError(true);
            dispatch(setBackgroundError(true));
            return;
        }


        console.log({
            name,
            surname,
            username,
            email,
            password,
            confirmPassword
        });


        const signInObj: IsigninObj = {
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password
        }


        console.log(await signin(signInObj));

    };



    return (

        <Stack 
        component="form" 
        spacing={2} 
        onSubmit={handleSubmit}
        sx={{
            py:{
                xs:'2em',
                md:'5em'
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

            <Box
                sx={{
                    display: "flex",
                    justifyContent: 'space-between'
                }}
            >
                <Button variant="outlined">Cancel</Button>
                <Button type="submit" color="secondary" variant="contained">Signin</Button>
            </Box>
        </Stack>
    );
}


export default SigninForm;