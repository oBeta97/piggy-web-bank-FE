import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { MENU_COLOR, SECONDARY_COLOR, WHITE_COLOR } from "../../modules/colors";
import { Link, useLocation } from "react-router-dom";

const NavList = () => {

    const [anchorMA, setAnchorMA] = useState<null | HTMLElement>(null);

    const location = useLocation();

    const ManageAccountSub = [
        'Fixed Income',
        'Fixed Expenses',
        'Savings Managment',
        'Debt/Credit Tracking',
        'Savings Goals',
    ]

    const handleCloseMAMenu = () => {
        setAnchorMA(null);
    }

    const isManageAccount: () => boolean = () => {

        let res: boolean = false;

        ManageAccountSub.forEach(sub => {
            if (location.pathname === "/" + sub.replace(" ", "-").replace("/", "-").toLowerCase())
                res = true;
        });

        return res
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                <Link to="/">
                    <Button sx={{
                        mx: '1em',
                        color: location.pathname === '/' ? SECONDARY_COLOR : WHITE_COLOR,
                        fontWeight: location.pathname === '/' ? 'bold' : '',
                        display: 'block',
                        textDecoration: 'none'
                    }}>
                        Home
                    </Button>
                </Link>
                <Button
                    onClick={(e) => setAnchorMA(e.currentTarget)}
                    sx={{
                        mx: '1em',
                        color: isManageAccount() ? SECONDARY_COLOR : WHITE_COLOR,
                        fontWeight: isManageAccount() ? 'bold' : '',
                        display: 'block'
                    }}
                >
                    Manage Account
                </Button>
                <Link to="/statistics">
                    <Button sx={{
                        mx: '1em',
                        color: location.pathname === '/statistics' ? SECONDARY_COLOR : WHITE_COLOR,
                        fontWeight: location.pathname === '/statistics' ? 'bold' : '',
                        display: 'block'
                    }}>
                        Statistics
                    </Button>
                </Link>
            </Box>

            <Menu
                sx={{
                    mt: '35px',
                    '& .MuiPaper-root': {
                        backgroundColor: MENU_COLOR,
                        color: WHITE_COLOR
                    },
                }}
                id="menu-appbar"
                anchorEl={anchorMA}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorMA)}
                onClose={handleCloseMAMenu}
            >
                {
                    ManageAccountSub.map(sub => {

                        const path = "/" + sub.
                                replace(" ", "-").
                                replace("/", "-").
                                toLowerCase();

                        return (
                            <MenuItem
                                key={sub}
                                onClick={handleCloseMAMenu}
                            >
                                <Link to={path}>
                                    <Typography
                                        sx={
                                            {
                                                textAlign: 'center',
                                                textDecoration: 'none',
                                                color: location.pathname === path ? SECONDARY_COLOR : WHITE_COLOR,
                                                fontWeight: location.pathname === path ? 'bold' : '',
                                            }
                                        }
                                    >
                                        {sub}
                                    </Typography>
                                </Link>
                            </MenuItem>
                        )
                    }
                    )
                }

            </Menu>

        </>
    );
}

export default NavList;