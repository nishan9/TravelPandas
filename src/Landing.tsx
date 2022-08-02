import { useAuth0 } from '@auth0/auth0-react'
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react'
import AppBar from './Navigation';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Panda from "./Images/panda.jpg"; 
import Money from './Images/salary.png'; 
import Friends from './Images/laugh.png'; 
import Emissions from './Images/traffic.png'; 
import ResponsiveAppBarStart from './ResponsiveAppBarStart';

function Landing() {
    return (
        <>
            <ResponsiveAppBarStart/>
            <Grid container spacing={3} style={{ padding: '3% 15% 3% 15%' }}>
                <Grid item xs={12} md={5} >
                    <Typography variant="h3" style={{ fontWeight: 'bold' }}>
                        Lorem ipsum dolor sit amet, consectetur
                    </Typography>
                    <Typography variant="h6" style={{ paddingTop: '3%', paddingBottom: '3%' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing sed do eiusmod tempar.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={7} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <img src={Panda} height="400"/>
                </Grid>
            </Grid>
            <Grid container spacing={10} style={{ padding: '3% 15% 5% 15%' }}>
                <Grid item xs={12} paddingBottom="2%">
                    <Typography variant="h6" style={{ fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', display: 'flex', textAlign : 'center'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Typography>
                </Grid>
                <Grid item xs={1} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }}>
                    <Typography>
                        <img src={Money} height="80"/>
                    </Typography>
                </Grid> 
                <Grid item xs={4} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }} >
                    <Typography >
                        Join for free and find both drivers or passengers to share with
                    </Typography>
                </Grid> 
                <Grid item xs={2}>
                </Grid>   
                <Grid item xs={1} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }}>
                    <Typography>
                        <img src={Emissions} height="80"/>
                    </Typography>
                </Grid> 
                <Grid item xs={4} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }} >
                    <Typography >
                        Be part of the bigger picture and help to reduce CO2 emissions
                    </Typography>
                </Grid>  
                <Grid item xs={1} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }}>
                    <Typography>
                        <img src={Friends} height="80"/>
                    </Typography>
                </Grid> 
                <Grid item xs={4} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }} >
                    <Typography >
                        Join for free and find both drivers or passengers to share with
                    </Typography>
                </Grid> 
                <Grid item xs={2}>
                </Grid>   
                <Grid item xs={1} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }}>
                    <Typography>
                        <img src={Money} height="80"/>
                    </Typography>
                </Grid> 
                <Grid item xs={4} style={{ justifyContent: 'left', alignItems: 'left', display: 'flex' }} >
                    <Typography >
                        Be part of the bigger picture and help to reduce CO2 emissions
                    </Typography>
                </Grid>     
            </Grid>

        </>
    )
}

export default Landing