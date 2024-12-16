import { useState } from "react";
import { useDispatch } from "react-redux";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { PASSWORD_REGEX } from "../../modules/Regex";
import { Button, Stack, TextField } from "@mui/material";
import { IchangePassword, updateUserPassword } from "../../modules/fetches/UserFectches";
import { IfetchError } from "../../interfaces/IfetchError";
import { isFetchError } from "../../modules/TypeGuard";
import { hideModal } from "../../redux/action/modal";





const UpdatePassword = () => {
    const dispatch = useDispatch()

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [passwordError, setPasswordError] = useState<boolean>(false);


    const checkFormValues = (): void => {

        setPasswordError(false);

        if (password !== confirmPassword)
            dispatchBackgroundChange(dispatch, true, "Wrong confirm password!", setPasswordError);

        if (!password.match(PASSWORD_REGEX))
            dispatchBackgroundChange(dispatch, true, "Password not secure enough!", setPasswordError);

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
    
            checkFormValues();
    
            const newPassword: IchangePassword = {
                password: password
            }
    
            const res: IfetchError | IchangePassword = await updateUserPassword(newPassword);
    
            if (isFetchError(res)) {
                switch (true) {
                    case res.message.toLowerCase().includes('password'):
                        dispatchBackgroundChange(dispatch, true, res.message, setPasswordError);
                        break;
                    default:
                        dispatchBackgroundChange(dispatch, true, "Unknown error!");
                }
            }
    
            dispatchBackgroundChange(dispatch, false, 'Password updated!')
    
            setTimeout(() => {
                dispatch(hideModal());
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

export default UpdatePassword;