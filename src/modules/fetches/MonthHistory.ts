import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { IfetchError } from "../../interfaces/IfetchError";
import { ImonthHistory } from "../../interfaces/ImonthHistory";
import { Ipage } from "../../interfaces/Ipage";
import { getDeleteFetch } from "./BaseFetches";


export const getMontHistory = async (page:number = 0, size:number = 10, sortBy:string = 'id'): Promise<IfetchError | IdeleteResponse | Ipage<ImonthHistory>> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/month-histories?page=${page}&size=${size}&sortBy=${sortBy}`,
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
