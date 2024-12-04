import { getJwtToken } from '../Token'


export const putPostFetch = async (URL: string, method: "PUT" | "POST", json: string) => {

    try {

        const myToken: string | null = getJwtToken();

        if (myToken === null)
            throw new Error("Token unavailable!");

        const myHeaders: HeadersInit = {
            'Content-Type': 'application/json',
            Authorization: myToken!
        }


        const response: Response = await fetch(
            URL,
            {
                method: method,
                body: json,
                headers: myHeaders
            }
        )

        if (!response.ok)
            throw new Error(`${response.status} - ${response.statusText}`);

        return await response.json();

    } catch (err) {
        console.error('fetch error: ', err);
    }

}