import { Route, Routes } from "react-router-dom";
import MyNavBar from "./NavBar/MyNavBar";
import Signin from "./LogSignin/Signin";
import Login from "./LogSignin/Login";
import ProtectedRoute from "./BaseComponents/ProtectedRoute";
import Logout from "./LogSignin/Logout";
import HomePage from "./HomePage/HomePage";
import FixedTransactionsPage from "./FixedTransactions/FixedTransactionsPage";
import { Typography } from "@mui/material";
import SavingsManagementPage from "./SavingsManagement/SavingsManagementPage";


const MyMainPage = () => {

    return (
        <>
            <MyNavBar />
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Typography variant="h2">404 - Page not found</Typography>} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/fixed-incomes" element={<FixedTransactionsPage incomes />} />
                    <Route path="/fixed-expenses" element={<FixedTransactionsPage expenses />} />
                    <Route path="/savings-managment" element={<SavingsManagementPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default MyMainPage;