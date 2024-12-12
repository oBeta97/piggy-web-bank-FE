import { Route, Routes } from "react-router-dom";
import MyNavBar from "./NavBar/MyNavBar";
import Signin from "./LogSignin/Signin";
import Login from "./LogSignin/Login";
import ProtectedRoute from "./BaseComponents/ProtectedRoute";
import Logout from "./LogSignin/Logout";
import HomePage from "./HomePage/HomePage";
import FixedTransactionsPage from "./FixedTransactions/FixedTransactionsPage";


const MyMainPage = () => {

    return (
        <>
            <MyNavBar />
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<h1>404 - Pagina non trovata</h1>} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/fixed-income" element={< FixedTransactionsPage incomes />} />
                    <Route path="/fixed-expenses" element={< FixedTransactionsPage expenses />} />
                </Route>
            </Routes>
        </>
    );
}

export default MyMainPage;