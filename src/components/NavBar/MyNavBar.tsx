import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavList from './NavList';
import UserIcon from './UserIcon';
import Burger from './Burger';
import logo from '../../../public/icon.png'
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';


function MyNavBar() {

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#ffffff00', boxShadow: 'none', pt: '0.5em' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: { xs: '1', sm: '0' },
                            display: 'flex',
                            justifyContent: 'center',
                            mr: 1
                        }}
                    >
                        <Link to="/">
                            <img src={logo} alt="logo" style={{
                                maxWidth: '3em',
                                height: 'auto',
                            }} />
                        </Link>
                    </Box>
                    <NavList />
                    <UserIcon />
                    <Burger />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MyNavBar;
