import { Route, Routes } from "react-router-dom";
import MyNavBar from "./NavBar/MyNavBar";
import Signin from "./LogSignin/Signin";


const MyMainPage = () => {
    return (
        <>
            <MyNavBar />
            <Routes>
                <Route path="/" element={<h1>{import.meta.env.VITE_BACKEND_URL}</h1>} />
                <Route path="/signin" element={<Signin />} />
                <Route path="*" element={<h1>404 - Pagina non trovata</h1>} />
            </Routes>
        </>
    );
}

export default MyMainPage;