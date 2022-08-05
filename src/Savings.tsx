import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import BarChartComponent from './components/BarChartComponent';
import ResponsiveAppBar from './ResponsiveAppBar';
import Statistics from './model/Statistics';
import { Grid, Typography } from '@mui/material';
import Metrics from './components/Metrics';

function Savings() {

    const Auth0 = useAuth0();
    const [data, setData] = useState<Statistics>(); 

    useEffect(() => {
        fetchUserData();
    },[])


    async function fetchUserData(){
      const token = await Auth0.getAccessTokenSilently();
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Users/Statistics`, { 
        method:"GET", 
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`, 
        }
      })
      const data = await response.json();
      setData(data); 
    }

  return (
    <>
    <ResponsiveAppBar/>
      <Grid container spacing={3} style={{ padding : "3%"}} >
        <Grid item xs={6}>
          {data?.address !== undefined ? <> <Metrics address={data.address} count={data.numberOfBookings}/> </> : <></>}
        </Grid>
        <Grid item xs={6}>
          {data?.chartData !== undefined ? 
          <div style={{ width : "100%", height : "100%", textAlign : "center"}}>
            <Typography variant={'h4'}>Number of Bookings per Month</Typography>
            <br></br>             <br></br>

            <BarChartComponent  
            data={data.chartData}  
            />
          </div>
          : 
          <>
            Data not loaded
          </>
          }
        </Grid>
      </Grid>
  </>
  )
}

export default Savings