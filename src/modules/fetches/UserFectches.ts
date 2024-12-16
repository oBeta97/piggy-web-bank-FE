import { IfetchError } from "../../interfaces/IfetchError";
import { IupdateUser, Iuser } from "../../interfaces/Iuser";
import { getDeleteFetch, putPostPatchFetch } from "./BaseFetches";


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


export const updateUserData = async (newUserData:IupdateUser): Promise<IfetchError | Iuser> => {
    try {
        return await putPostPatchFetch(
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

export interface IchangePassword{
    password:string
}

export const updateUserPassword = async (newPassword:IchangePassword) => {
    try {
        return await putPostPatchFetch(
            import.meta.env.VITE_BACKEND_URL + 'me',
            "PATCH",
            JSON.stringify(newPassword),
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
}