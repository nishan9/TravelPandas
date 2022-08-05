import { Box, Card, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Trips from '../Images/notrip.png'; 
import Miles from '../Images/mileage.png'; 
import Traffic from '../Images/traffic.png'

interface MetricsProps{
  address : string,
  count : number
}
function Metrics(props : MetricsProps) {

  const[totalMiles, SetTotalMiles] = useState<number>(0); 

  useEffect(() => {
    getDistance(); 
  },[])

  async function getDistance() {

    const myAddress = props.address; 
    const DriverAddressList = [{
      address : "Claverton Down, Bath BA2 7AY, United Kingdom", 
      radius : 100000000
    }]

    const Possible = await fetch(`https://indigo-crocodile-2910.twil.io/map`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PassengerAddress: myAddress,
        DriverAddressList: DriverAddressList,
      }),
    });
    
    let result = await Possible.json(); 

        SetTotalMiles(Math.round((result[0].value / 1609)) * props.count); 
  }


  return (
    <div>
      <Grid xs ={12} container spacing={2} style={{ padding : "5%"}} >
        <Grid item xs={6}>
          <Card style={{ padding : "5%"}}> 
              <div style={{ display : 'flex', flexDirection : 'row'}}>
                <div style={{ paddingRight : "10%"}}>
                  <img src={Trips} height="70"/>
                </div>
                <div style={{ padding : "10px"}}>
                  <Typography variant='h5'>{props.count + 10}</Typography>
                  <Typography> Total Trips</Typography>
                </div>
              </div>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card style={{ padding : "5%"}}> 
          <div style={{ display : 'flex', flexDirection : 'row'}}>
            <div  style={{ paddingRight : "10%"}}>
              <img src={Miles} height="70"/>
            </div>
            <div style={{ padding : "10px"}}>
              <Typography variant='h5'>{totalMiles + 10}</Typography>
              <Typography> Miles Saved</Typography>
            </div>
          </div>
          </Card>
        </Grid>
        <Grid item xs={12}>

          <Card style={{ padding : "5%"}}> 
            <div style={{ display : 'flex', flexDirection : 'row'}}>
              <div  style={{ paddingRight : "10%"}}>
                <img src={Traffic} height="80"/>
              </div>
              <div style={{ padding : "10px"}}>
                <Typography  variant='h5'> {Math.round(totalMiles * 1.609 * 174) / 1000} </Typography> 
                <Typography> Kilograms of CO₂ Saved </Typography> 
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
      <Typography> * Note: The average petrol car in the UK produced the equivalent of 174 grams CO2 per kilometer</Typography>

    </div>
  )
}

export default Metrics