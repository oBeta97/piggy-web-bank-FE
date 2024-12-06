import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "../../redux/action/token";
import { clearRole, clearUserCharacteristic } from "../../redux/action/meDetails";



const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(
            clearToken(),
        );
        dispatch(
            clearRole()
        );
        dispatch(
            clearUserCharacteristic()
        );


        navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate])

    return null;

}

export default Logout;