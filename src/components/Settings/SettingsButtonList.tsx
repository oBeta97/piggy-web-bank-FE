import { Button, Stack } from "@mui/material";
import { CHANGE_PASSWORD, SET_MINIMUM_SAVINGS, UPDATE_USER_DATA } from "../../modules/ModalContents";
import { useDispatch } from "react-redux";
import { changeModalState } from "../../redux/action/modal";



const SettingsButtonList = () => {

    const dispatch = useDispatch();

    const buttons: string[] = [
        UPDATE_USER_DATA,
        CHANGE_PASSWORD,
        SET_MINIMUM_SAVINGS,
        // ADD_TRANS_CATEGORY
    ];

    const handleClick = (e: React.MouseEvent<HTMLElement>):void =>{

        const targetKey = e.currentTarget.dataset.key as string;

        dispatch(changeModalState({
            show:true,
            title: targetKey.replace(/_/g, ' '),
            content: targetKey
        }))


    }

    return (
        <Stack sx={{ width: '80%', my: '2em' }} spacing={2}>

            {
                buttons.map(buttonData => (
                    <Button
                        key={buttonData}
                        variant="outlined"
                        color="secondary"
                        onClick={handleClick}
                        data-key={buttonData}
                    >
                        {
                            buttonData.replace(/_/g, ' ')
                        }
                    </Button>
                ))
            }
        </Stack>
    );
}

export default SettingsButtonList;