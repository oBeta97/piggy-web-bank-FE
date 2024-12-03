import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { MENU_COLOR, SECONDARY_COLOR, WHITE_COLOR } from "../../modules/colors";
import { Link, useLocation } from "react-router-dom";


const UserIcon = () => {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const settings = ['Settings', 'Logout'];

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const location = useLocation();

    return (
        <Box sx={{ flexGrow: 0, display: { xs: 'none', sm: 'flex' } }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{
                    mt: '45px',
                    '& .MuiPaper-root': {
                        backgroundColor: MENU_COLOR,
                        color: WHITE_COLOR
                    },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {
                    settings.map((text) => {

                        const path: string = "/" + text.
                            replace(" ", "-").
                            replace("/", "-").
                            toLowerCase();

                        return (
                            <MenuItem key={text} onClick={handleCloseUserMenu}>
                                <Link to={path}>
                                    <Typography sx={{
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        color: location.pathname === path ? SECONDARY_COLOR : WHITE_COLOR,
                                        fontWeight: location.pathname === path ? 'bold' : '',
                                    }}>{text}</Typography>
                                </Link>
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        </Box>
    );

}


export default UserIcon;