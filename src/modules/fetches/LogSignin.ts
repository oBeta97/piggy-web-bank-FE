import { IfetchError } from "../../interfaces/IfetchError";
import { IloginObj, IloginResult } from "../../interfaces/Ilogin";
import { IsigninObj } from "../../interfaces/IsigninObj";
import { putPostPatchFetch } from "./BaseFetches";



export const signin = async (signinObj: IsigninObj): Promise<IfetchError | IsigninObj> => {

    try {
        return await putPostPatchFetch(
            import.meta.env.VITE_BACKEND_URL + 'auth/signin',
            "POST",
            JSON.stringify(signinObj),
            true
        );
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }

}

export const login = async (loginObj: IloginObj): Promise<IfetchError | IloginResult> => {

    try {
        return await putPostPatchFetch(
            import.meta.env.VITE_BACKEND_URL + 'auth/login',
            "POST",
            JSON.stringify(loginObj),
            true
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }

}