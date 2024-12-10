import { IdeleteResponse } from "../../interfaces/IdeleteResponse";
import { IfetchError } from "../../interfaces/IfetchError";
import { Igoal } from "../../interfaces/Igoal";
import { Ipage } from "../../interfaces/Ipage";
import { getDeleteFetch } from "./BaseFetches";


export const getGoals = async (all:boolean = false, page:number = 0, size:number = 50, sortBy:string = 'id'): Promise<IfetchError | IdeleteResponse | Ipage<Igoal>> => {
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + `me/goals?page=${page}&size=${size}&sortBy=${sortBy}&all=${all}`,
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
