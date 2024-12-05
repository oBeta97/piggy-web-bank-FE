import { setBackgroundError } from "../../redux/action";
import { Dispatch } from "redux";


export const dispatchBackgroundChange = (
    dispatch: Dispatch,
    isError: boolean,
    text: string,
    callback: (t: boolean) => void = () =>{}
) => {

    callback(isError);
    dispatch(
        setBackgroundError(
            {
                isError: isError,
                text: text
            }
        )
    );

    if (isError)
        throw new Error(text);

}