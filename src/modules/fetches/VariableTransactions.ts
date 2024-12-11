import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { IfetchError } from "../../interfaces/IfetchError";
import { Ipage } from "../../interfaces/Ipage";
import { IvariableTransaction, IvariableTransactionDTO } from "../../interfaces/Itransaction";
import { getDeleteFetch, putPostFetch } from "./BaseFetches";


export const getVariableTransactions = async (page: number = 0, size: number = 10, sortBy: string = 'id'): Promise<IfetchError | Ipage<IvariableTransaction>> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/variable-transactions?page=${page}&size=${size}&sortBy=${sortBy}`,
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

export const getVariableTransaction = async (id: number): Promise<IfetchError | IvariableTransaction> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/variable-transactions/${id}`,
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

export const createVariableTransaction = async (newVariableTransaction: IvariableTransactionDTO): Promise<IfetchError | IvariableTransaction> => {
    try {
        return await putPostFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/variable-transactions',
            "POST",
            JSON.stringify(newVariableTransaction),
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
}



export const getAllVariableTransactions = async (ofThisMonth: boolean = false): Promise<IfetchError | IvariableTransaction[]> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/variable-transactions/all?ofThisMonth=${ofThisMonth}`,
            "GET",
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
}


export const deleteVariableTransaction = async (vTransactionId: number): Promise<IfetchError | IdeleteResponse> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/variable-transactions/${vTransactionId}`,
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


export const updateVariableTransaction = async (idToUpdate: number, newTrans: IvariableTransactionDTO): Promise<IfetchError | IvariableTransaction> => {
    try {
        return await putPostFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/variable-transactions/' + idToUpdate,
            "PUT",
            JSON.stringify(newTrans),
        )
    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }

}