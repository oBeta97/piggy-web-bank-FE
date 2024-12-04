import { IfetchError } from '../../interfaces/IfetchError';
import { getJwtToken } from '../Token'


export const putPostFetch = async (
    URL: string, 
    method: "PUT" | "POST", 
    json: string, 
    isSignIn: boolean = false
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<IfetchError | any> => {

    try {

        const myToken: string | null = getJwtToken();

        if (myToken === null && !isSignIn)
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

        if (!response.ok){
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