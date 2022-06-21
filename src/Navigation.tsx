import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth0 } from '@auth0/auth0-react'

function Navigation() {
    const Auth0 = useAuth0(); 
    const { loginWithRedirect } = useAuth0(); 
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Travel Pandas
            </Typography>
            <Button variant="contained" color="success" onClick={() => loginWithRedirect()}>Get Started</Button>
        </Toolbar>
        </AppBar>
    </Box>
    );
}

export default Navigation; 