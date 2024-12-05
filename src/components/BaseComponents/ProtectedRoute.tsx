import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"
import { Istore } from "../../redux/store";


const ProtectedRoute = () => {
    return useSelector((state: Istore) => state.auth.token) !== null ?
        <Outlet /> :
        <Navigate to='/login' />;
}

export default ProtectedRoute