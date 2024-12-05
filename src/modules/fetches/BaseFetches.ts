import { IdeleteResponse } from '../../interfaces/IdeleteResponse';
import { IfetchError } from '../../interfaces/IfetchError';
import { store } from '../../redux/store';


export const putPostFetch = async (
    URL: string,
    method: "PUT" | "POST",
    json: string,
    withoutValidation: boolean = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<IfetchError | any> => {

    try {

        const myToken: string | null = store.getState().auth.token;

        if (myToken === null && !withoutValidation)
            return {
                errorCode: '400',
                message: "Token unavailable!",
                dt: new Date().toISOString().toString()
            };


        const myHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            Authorization: myToken ? myToken : ""
        }


        const response: Response = await fetch(
            URL,
            {
                method: method,
                body: json,
                headers: myHeaders
            }
        )

        if (!response.ok) {
            const responseBody: IfetchError = await response.json();
            return {
                errorCode: responseBody.errorCode,
                message: responseBody.message,
                dt: new Date().toISOString().toString()
            };
        }

        return await response.json();

    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }

}



export const getDeleteFetch = async (
    URL: string,
    method: "GET" | "DELETE",
    withoutValidation: boolean = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<IfetchError | IdeleteResponse | any> => {
    try {

        const myToken: string | null = store.getState().auth.token;

        if (myToken === null && !withoutValidation)
            return {
                errorCode: '400',
                message: "Token unavailable!",
                dt: new Date().toISOString().toString()
            };


        const response = await fetch(
            URL,
            {
                method: method,
                headers: {
                    Authorization: myToken ? myToken : "",
                }
            }
        )

        if (!response.ok) {
            const responseBody: IfetchError = await response.json();
            return {
                errorCode: responseBody.errorCode,
                message: responseBody.message,
                dt: new Date().toISOString().toString()
            };
        }

        const res = await response.json();

        if (method === "DELETE")
            return {
                responseCode: (res as IdeleteResponse).responseCode,
                text: (res as IdeleteResponse).text
            };


        return res;


    } catch (err) {
        return {
            errorCode: '400',
            message: err instanceof Error ? err.message : String(err),
            dt: new Date().toISOString().toString()
        };
    }
};