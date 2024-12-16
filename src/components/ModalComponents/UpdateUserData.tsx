import { useEffect, useState } from "react";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { useDispatch } from "react-redux";
import { EMAIL_REGEX } from "../../modules/Regex";
import { Button, Stack, TextField } from "@mui/material";
import { isFetchError } from "../../modules/TypeGuard";
import { IfetchError } from "../../interfaces/IfetchError";
import { IsigninObj } from "../../interfaces/IsigninObj";
import { IupdateUser, Iuser } from "../../interfaces/Iuser";
import { hideModal } from "../../redux/action/modal";
import { getMe, updateUserData } from "../../modules/fetches/UserFectches";



const UpdateUserData = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [emailError, setEmailError] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<boolean>(false);

    const getMeData = async():Promise<void> =>{

        const meData = await getMe();

        if(isFetchError(meData))
            dispatchBackgroundChange(dispatch, true, meData.message);

        setName((meData as Iuser).name);
        setSurname((meData as Iuser).surname);
        setUsername((meData as Iuser).username);
        setEmail((meData as Iuser).email);
    }


    useEffect(()=>{
        getMeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const checkFormValues = (): void => {

        setEmailError(false);
        setUsernameError(false);

        if (!email.match(EMAIL_REGEX))
            dispatchBackgroundChange(dispatch, true, "Email not valid!", setEmailError);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        checkFormValues();

        const updatedUser: IupdateUser = {
            name: name,
            surname: surname,
            username: username,
            email: email,
        }

        const res: IfetchError | IsigninObj = await updateUserData(updatedUser);

        if (isFetchError(res)) {
            switch (true) {
                case res.message.toLowerCase().includes('email'):
                    dispatchBackgroundChange(dispatch, true, res.message, setEmailError);
                    break;
                case res.message.toLowerCase().includes('username'):
                    dispatchBackgroundChange(dispatch, true, res.message, setUsernameError);
                    break;
                default:
                    dispatchBackgroundChange(dispatch, true, "Unknown error!");
            }
        }

        dispatchBackgroundChange(dispatch, false, 'Yuor user has been updated!')
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
                padding: '2em'
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

            <Button type="submit" color="secondary" variant="contained">update</Button>

        </Stack>
    );
}


export default UpdateUserData;