import { Route, Routes } from "react-router-dom";
import MyNavBar from "./NavBar/MyNavBar";


const MyMainPage = () => {
    return (
        <>
            <MyNavBar />
            <Routes>
                <Route path="/" element={<h1>HOME</h1>} />
                <Route path="*" element={<h1>404 - Pagina non trovata</h1>} />
            </Routes>
        </>
    );
}

export default MyMainPage;