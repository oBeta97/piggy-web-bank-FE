import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { meUserDetails, updateUserMinimumSavings } from "../../modules/fetches/meDetails";
import { isFetchError } from "../../modules/TypeGuard";
import { dispatchBackgroundChange } from "../../modules/dispatches/BackgroundChange";
import { useDispatch } from "react-redux";
import { IupdateMinimumSavings, IuserCharacteristic } from "../../interfaces/Iuser";
import { hideModal } from "../../redux/action/modal";
import { userCharacteristicsFetch } from "../../modules/dispatches/UserCharacteristics";


const SetMinimumSavings = () => {

    const dispatch = useDispatch();

    const [minimumSavings, setMinimumSavings] = useState<number>(0);
    const [minimumSavingsError, setMinimumSavingsError] = useState<boolean>(false);

    const fetchMinimumSavings = async ():Promise<void> =>{

        const res = await meUserDetails();

        if(isFetchError(res))
            dispatchBackgroundChange(dispatch, true, res.message);

        setMinimumSavings((res as IuserCharacteristic).minimumSavings);

    }


    useEffect(()=>{
        fetchMinimumSavings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(minimumSavings < 0)
            dispatchBackgroundChange(dispatch, true, 'Minimum savings must be positive!',setMinimumSavingsError);

        const newMinimumSavings:IupdateMinimumSavings = {
            minimumSavings: minimumSavings
        }

        const res = await updateUserMinimumSavings(newMinimumSavings);

        if(isFetchError(res))
            dispatchBackgroundChange(dispatch, true, res.message);

        dispatchBackgroundChange(dispatch, false, 'Minimum savings updated!');
        userCharacteristicsFetch(dispatch);
        
        setTimeout(() => {
            dispatch(hideModal());
        }, 2500);

    }


    return (
        <Stack
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            sx={{ my: '2em', }}
        >

            <TextField
                id="minimumSavings"
                label="Amount"
                focused
                color="secondary"
                type="number"
                slotProps={{
                    htmlInput: {
                        step: 0.5,
                    },
                }}
                required
                value={minimumSavings}
                error={minimumSavingsError}
                onChange={(e) => setMinimumSavings(Number(e.target.value))}
            />

            <Button type="submit" color="secondary" variant="contained">
                update
            </Button>
        </Stack>


    );
}


export default SetMinimumSavings;