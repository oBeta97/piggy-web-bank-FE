import { meUserDetails } from "../fetches/meDetails";
import { isFetchError } from "../TypeGuard";
import { dispatchBackgroundChange } from "./BackgroundChange";
import { setUserCharacteristic } from "../../redux/action/meDetails";
import { Dispatch } from "redux";
import { IuserCharacteristic } from "../../interfaces/Iuser";



export const userCharacteristicsFetch = async (dispatch: Dispatch): Promise<void> => {
    const uc = await meUserDetails();

    if (isFetchError(uc))
        dispatchBackgroundChange(dispatch, true, uc.message);

    dispatch(
        setUserCharacteristic(uc as IuserCharacteristic)
    );
}