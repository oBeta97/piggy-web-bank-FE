import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { Istore } from "../../redux/store";
import { IuserCharacteristic } from "../../interfaces/Iuser";
import { userCharacteristicsFetch } from "../../modules/dispatches/UserCharacteristics";


const ProtectedRoute = () => {

    const dispatch = useDispatch();

    const uc: IuserCharacteristic | undefined = useSelector((store: Istore) => store.userCharacteristc)
    if(uc.id === 0)
        userCharacteristicsFetch(dispatch)

    return useSelector((state: Istore) => state.auth.token) !== null ?
        <Outlet /> :
        <Navigate to='/login' />;
}

export default ProtectedRoute