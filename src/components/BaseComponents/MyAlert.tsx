import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { IbackgroundError } from "../../redux/action";
import { Istore } from "../../redux/store";
import { useEffect, useState } from "react";

export interface ImyAlertProps {
    severity: "warning" | "success",
    text: string
}


export const MyAlert = () => {

    const backgroundError: IbackgroundError = useSelector((store: Istore) => store.backgroundError);

    const [show, setShow] = useState<boolean>(false);


    useEffect(()=>{

        setShow(true)

        setTimeout(() => {
            setShow(false)
        }, 2000);

    }
    ,[backgroundError])


    return (
        <Alert
            variant = "filled"
            severity = {backgroundError.isError ? "error" : "success"}
            sx = {{
                zIndex: 2,
                position: "fixed",
                bottom: (show ? '1em' : '-5em'),
                right:'1em',
                transition: 'bottom 0.5s ease-out'
            }}
        >
            {backgroundError.text !== "" ? backgroundError.text : 'Welcome back!'}
        </Alert>
    );
}