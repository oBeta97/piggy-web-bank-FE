import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";


const LogSigninButtons = () => {
    return (
        <Box
            sx={{
                display: {xs: 'none', sm: 'flex'},
                gap: '0.5em'
            }}
        >
            <Link to="/login">
                <Button variant="outlined">Login</Button>
            </Link>
            <Link to="/signin">
                <Button variant="contained" color="secondary">Signin</Button>
            </Link>
        </Box>
    );
}

export default LogSigninButtons;