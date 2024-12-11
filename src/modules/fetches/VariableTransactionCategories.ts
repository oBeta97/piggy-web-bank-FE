import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { IfetchError } from "../../interfaces/IfetchError";
import { ItransactionCategory } from "../../interfaces/Itransaction";
import { getDeleteFetch } from "./BaseFetches";


export const getTransactionsCategories = async (): Promise<IfetchError | IdeleteResponse | ItransactionCategory[]> =>{
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/transaction-categories',
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
