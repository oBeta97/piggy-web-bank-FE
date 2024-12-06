import { Dispatch } from "redux";
import { dispatchBackgroundChange } from "./dispatches/BackgroundChange";
import { PASSWORD_REGEX } from "./Regex";


export const checkPasswordSecurityLevel = (
    psw: string, 
    dispatch: Dispatch,
    callback: (t: boolean) => void = () =>{}
):void =>{
    if (!psw.match(PASSWORD_REGEX))
        dispatchBackgroundChange(dispatch, true, "Password not secure enough. It can't be right!", callback);
}