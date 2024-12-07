import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { IfetchError } from "../../interfaces/IfetchError";
import { Ipage } from "../../interfaces/Ipage";
import { IvariableTransaction } from "../../interfaces/Itransaction";
import { getDeleteFetch } from "./BaseFetches";


export const getVariableTransactions = async (): Promise<IfetchError | IdeleteResponse | Ipage<IvariableTransaction>> =>{
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/variable-transactions',
            "GET",
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
