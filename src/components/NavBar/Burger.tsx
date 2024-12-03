import { Box, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import MyDrawer from "./MyDrawer";


const Burger = () => {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const handleOpenNavMenu = () => {
        setOpenDrawer(true);
    };

    return (
        <Box sx={
            {
                display: { xs: 'flex', sm: 'none' },
            }
        } >
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <MyDrawer openDrawer={openDrawer} drawerToggle={(isOpen: boolean) => setOpenDrawer(isOpen)} />
        </Box >
    );
}

export default Burger;