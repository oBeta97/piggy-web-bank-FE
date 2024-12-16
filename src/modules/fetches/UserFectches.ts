import { IfetchError } from "../../interfaces/IfetchError";
import { IupdateUser, Iuser } from "../../interfaces/Iuser";
import { getDeleteFetch, putPostFetch } from "./BaseFetches";


export const getMe = async (): Promise<IfetchError | Iuser> =>{
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + 'me',
            "GET"
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }

}


export const updateUserData = async (newUserData:IupdateUser) => {
    try {
        return await putPostFetch(
            import.meta.env.VITE_BACKEND_URL + 'me',
            "PUT",
            JSON.stringify(newUserData),
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
}