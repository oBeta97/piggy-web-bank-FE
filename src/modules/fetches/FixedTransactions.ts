import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { IfetchError } from "../../interfaces/IfetchError";
import { IfixedTransaction, IfixedTransactionDTO } from "../../interfaces/IfixedTransaction";
import { getDeleteFetch, putPostPatchFetch } from "./BaseFetches";




export const getAllFixedTransactions = async (isIncome: boolean): Promise<IfetchError | IfixedTransaction[]> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/fixed-transactions/${isIncome ? 'incomes' : 'expenses'}`,
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

export const getFixedTransaction = async (transactionId: number): Promise<IfetchError | IfixedTransaction> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/fixed-transactions/${transactionId}`,
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

export const addNewFixedTransactions = async (newFixedTransaction: IfixedTransactionDTO): Promise<IfetchError | IfixedTransaction> => {
    try {
        return await putPostPatchFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/fixed-transactions',
            "POST",
            JSON.stringify(newFixedTransaction),
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
}



export const deleteFixedTransaction = async (fTransactionId: number): Promise<IfetchError | IdeleteResponse> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/fixed-transactions/${fTransactionId}`,
            "DELETE",
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
}

export const updateFixedTransactions = async (fTransactionId: number, newFixedTransaction: IfixedTransactionDTO): Promise<IfetchError | IfixedTransaction> => {
    try {
        return await putPostPatchFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/fixed-transactions/' + fTransactionId,
            "PUT",
            JSON.stringify(newFixedTransaction),
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
}