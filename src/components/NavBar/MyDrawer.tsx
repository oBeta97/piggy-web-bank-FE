import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { MENU_COLOR, SECONDARY_COLOR, WHITE_COLOR } from "../../modules/Colors";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Istore } from "../../redux/store";

interface myDrawerProps {
    openDrawer: boolean;
    drawerToggle: (isOpen: boolean) => void;
}

const MyDrawer = (props: myDrawerProps) => {

    const topList = [
        'Home',
        'Fixed Incomes',
        'Fixed Expenses',
        'Savings Managment',
        'Debt/Credit Tracking',
        'Savings Goals',
        'Statistics'
    ]

    const bottomList = [
        'Settings'
    ]

    if(useSelector((store:Istore) => store.auth.token))
        bottomList.push('Logout');
    else{
        bottomList.push('Login');
        bottomList.push('Signin');
    }


    const location = useLocation();

    return (
        <Drawer
            open={props.openDrawer}
            onClose={() => props.drawerToggle(false)}
            anchor='right'
            sx={{
                '& .MuiPaper-root': {
                    backgroundColor: MENU_COLOR,
                    color: WHITE_COLOR
                },
            }}
        >

            <Box sx={{ width: 250 }} role="presentation" onClick={() => props.drawerToggle(false)}>
                <List>
                    {topList.map((text) => {

                        const path: string = "/" + text.
                            replace(" ", "-").
                            replace("/", "-").
                            replace("Home","").
                            toLowerCase();

                        return (
                            <ListItem key={text} disablePadding >
                                <ListItemButton>
                                    <Link to={path}>
                                        <ListItemText
                                            primary={text}
                                            sx={{
                                                textDecoration: 'none',
                                                color: location.pathname === path ? SECONDARY_COLOR : WHITE_COLOR,
                                                fontWeight: location.pathname === path ? 'bold' : '',
                                            }} />
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                    )}
                </List>
                <Divider variant="middle" flexItem sx={{ backgroundColor: SECONDARY_COLOR }} />
                <List>
                    {bottomList.map((text) => {

                        const path: string = "/" + text.
                            replace(" ", "-").
                            replace("/", "-").
                            toLowerCase();

                        return (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <Link to={path}>
                                        <ListItemText
                                            primary={text}
                                            sx={{
                                                textDecoration: 'none',
                                                color: location.pathname === path ? SECONDARY_COLOR : WHITE_COLOR,
                                                fontWeight: location.pathname === path ? 'bold' : '',
                                            }} />
                                    </Link>
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>

        </Drawer>
    );
}

export default MyDrawer;