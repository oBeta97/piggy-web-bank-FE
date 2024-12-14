import { IfetchError } from "../../interfaces/IfetchError";
import { Irole } from "../../interfaces/Irole";
import { getDeleteFetch } from "./BaseFetches";
import { store } from "../../redux/store";
import { IuserCharacteristic } from "../../interfaces/Iuser";


export const meRoles = async (): Promise<IfetchError | Irole> =>{

    const localRole:Irole = store.getState().role;

    if(localRole.id > 0)
        return localRole;

    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/roles',
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

export const meUserDetails = async (): Promise<IfetchError | IuserCharacteristic> =>{
    try {
        return await getDeleteFetch(
            import.meta.env.VITE_BACKEND_URL + 'me/user-characteristics',
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