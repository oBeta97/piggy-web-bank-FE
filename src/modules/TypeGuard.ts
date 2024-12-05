/* eslint-disable @typescript-eslint/no-explicit-any */
import { IfetchError } from "../interfaces/IfetchError"


// <obj is IfetchError> tells to ts that if the return is true obj is IfetchError
export const isFetchError = (obj: any):obj is IfetchError => {
    // it use a unique property to detect the obj type
    return (obj as IfetchError).errorCode !== undefined
}