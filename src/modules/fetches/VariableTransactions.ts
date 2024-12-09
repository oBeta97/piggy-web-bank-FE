import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { IfetchError } from "../../interfaces/IfetchError";
import { Ipage } from "../../interfaces/Ipage";
import { IvariableTransaction, IvariableTransactionDTO } from "../../interfaces/Itransaction";
import { getDeleteFetch, putPostFetch } from "./BaseFetches";


export const getVariableTransactions = async (): Promise<IfetchError | IdeleteResponse | Ipage<IvariableTransaction>> => {
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


export const createVariableTransaction = async (newVariableTransaction:IvariableTransactionDTO): Promise<IfetchError | IvariableTransaction> => {
    try {
        return await putPostFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/variable-transactions',
            "POST",
            JSON.stringify(newVariableTransaction),
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
