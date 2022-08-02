import { AppBar, Box, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import ResponsiveAppBar from './ResponsiveAppBar'
import NewBooking from './Images/newbooking.png'; 
import User from './model/User'; 
import Savings from './Images/save.png'; 
import Bookings from './Images/bookings.png'; 
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import MyBookings from './MyBookings'; 
import { UserInfo } from 'os';
import UserPicture from './Images/user.png'
function Menu() {

  const Auth0 = useAuth0();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User>(); 

  useEffect(() => {
    fetchData();
  },[])

  async function fetchData(){

    const token = await Auth0.getAccessTokenSilently();
    const Possible = await fetch(`${process.env.REACT_APP_API_URL}/Users`, { 
      method:"GET", 
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`, 
      }
    })
    console.log(token); 
    setUserInfo(await Possible.json()); 
  }

  return (
    <>
    <ResponsiveAppBar/>
    <br></br>
    <div style={{ textAlign : 'center'}}>
    <Typography variant='h3'> Holaaaaa { userInfo !== undefined ? userInfo.name : <></>} 🎉 </Typography>
    </div>
    <Grid container>
      <Grid item xs={6} style={{ padding : '40px'}}>
        <Card onClick={() => navigate('Dashboard')} style={{ cursor : 'pointer',padding : '20px', justifyContent : 'center', alignItems : 'center',  display : 'flex', flexDirection : 'column'}}> 
          <img src={NewBooking} height={'180'}/> <Typography variant='h5'> Make a new Booking  </Typography>
        </Card>
      </Grid>
      <Grid item xs={6} style={{ padding : '40px'}}>
      <Card style={{ padding : '20px', justifyContent : 'center', alignItems : 'center',  display : 'flex', flexDirection : 'column'}}> 
        <img src={UserPicture} height={'180'}/>
          <Typography variant='h5'> User Profile  </Typography>
        </Card>
      </Grid>
      <Grid item xs={6} style={{ padding : '40px'}}>
      <Card style={{ padding : '20px', justifyContent : 'center', alignItems : 'center',  display : 'flex', flexDirection : 'column'}}> 
        <img src={Savings} height={'180'}/>
          <Typography variant='h5'> My Savings </Typography>
        </Card>
      </Grid>
      <Grid item xs={6} style={{ padding : '40px'}}>
      <Card onClick={() => navigate('MyBookings')} style={{ cursor : 'pointer', padding : '20px', justifyContent : 'center', alignItems : 'center',  display : 'flex', flexDirection : 'column'}}> 
        <img src={Bookings} height={'180'}/>
          <Typography variant='h5'> My Bookings </Typography>
        </Card>
      </Grid>
    </Grid>
    </>
  )
  
}

export default Menu