import { IfetchError } from "../../interfaces/IfetchError";
import { IsigninObj } from "../../interfaces/IsigninObj";
import { putPostFetch } from "./BaseFetches";



export const signin = async (signinObj: IsigninObj): Promise<IfetchError | IsigninObj> => {

    try {
        return await putPostFetch(
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