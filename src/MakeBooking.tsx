import React, { useEffect, useState } from 'react'
import Booking from './model/Booking';
import "./Calendar.css"
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import Bookings from './Bookings';
import { deepPurple, grey } from '@mui/material/colors';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CalendarKey from './components/CalendarKey';
import { useSnackbar } from 'notistack';
import { Player } from '@lottiefiles/react-lottie-player';
import panda from './Images/json/panda.json'
import format from 'date-fns/format';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

interface MakeBookingProps{
    date : string
    driver : string
    capacity : number
    driverName : string
}

function MakeBooking(props : MakeBookingProps) {

    const [booking, setBooking] = useState<Booking>(); 
    const { enqueueSnackbar } = useSnackbar();
    const Auth0 = useAuth0();
    const navigate = useNavigate();


    useEffect(() => {
        getData(); 

    }, [props.date])
    
    async function getData(){
        const res = await fetch(`${process.env.REACT_APP_API_URL}/Bookings/GetBookings/${props.driver}`, {
            method:"POST", 
            body : JSON.stringify(props.date), 
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (res.ok){
            setBooking(await res.json())
        }
        else 
        {
            enqueueSnackbar("Date is available", { variant: 'success' });
            setBooking(undefined)
        }
    }

    async function joinInbound(){

        const token = await Auth0.getAccessTokenSilently();
        const newtravller = {
            "driver_id": props.driver,
            "date" : props.date,
        }

        const res = await fetch(`https://localhost:5001/Bookings/Inbound`, {
            method:"POST", 
            body : JSON.stringify(newtravller), 
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`, 
            }
        })

        if (res.ok){
            enqueueSnackbar("Congragulations! Your booking is confirmed", { variant: 'success' });
            //navigate("Dashboard");
        }

    }

    async function joinOutbound(){

        const token = await Auth0.getAccessTokenSilently();
        const newtravller = {
            "driver_id": props.driver,
            "date" : props.date,
        }

        const res = await fetch(`https://localhost:5001/Bookings/Outbound`, {
            method:"POST", 
            body : JSON.stringify(newtravller), 
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`, 
            }
        })

        if (res.ok){
            enqueueSnackbar("Congragulations! Your booking is confirmed", { variant: 'success' });
            //navigate("Dashboard");
        }
    }

    
  return (
    <div className="driver-profile">
         {booking !== undefined ? 
         <>
            <Typography variant={'h4'}>Reserve for {format(new Date(props.date), 'EEEE do MMMM')} </Typography>
            <br/>
            <Typography>Driver Name: {props.driverName}</Typography>
            <Typography>Driver ID: {booking.driver_Id} </Typography>
            <Typography> Total Capacity: {props.capacity} </Typography>
            <br></br>

            <Grid container xs={12}>
                <Grid item xs={6}>
                    <Typography variant={'h5'}>Inbound Passengers</Typography>
                    <br></br>
                    <EmojiPeopleIcon fontSize='large'/> {booking.inboundPassengers.length}

                    {booking.inboundPassengers.map((e) => 
                        <>
                            <Grid style={{ display : 'flex', alignItems : "center"}} marginBottom={2}> 
                                <Avatar sx={{ bgcolor: deepPurple[500] }}>PA</Avatar>
                                <Box>
                                    <Typography>
                                        {e.name} 
                                    </Typography>
                                    <Typography style={{ color : 'grey'}}>
                                        {e.email} 
                                    </Typography>
                                </Box>
                            </Grid>
                        </>
                    )}
                    {booking.inboundPassengers.length >= props.capacity 
                    ? 
                        <> <Button disabled={true} variant="contained"> Fully Booked</Button> </> 
                    :
                    <>
                        <Button variant="contained" disabled={booking.inboundPassengers.map(x => x.auth0_Id).includes(Auth0.user?.sub!)} onClick={joinInbound}> Join Carpooling</Button> 
                    </>  
                    }

                </Grid>
                <Grid item xs={6}>
                <Typography variant={'h5'} >Outbound Passengers</Typography> 
                <br></br>
                    {booking.outboundPassengers.map((e) => 
                        <>
                            <Grid style={{ display : 'flex', alignItems : "center"}} marginBottom={2}> 
                                <Avatar sx={{ bgcolor: deepPurple[500] }}>PA</Avatar>
                                <Box>
                                    <Typography>
                                        {e.name} 
                                    </Typography>
                                    <Typography style={{ color : 'grey'}}>
                                        {e.email} 
                                    </Typography>
                                </Box>
                            </Grid>
                        </>
                    )}
                    {booking.outboundPassengers.length >= props.capacity 
                    ?
                    <><Button variant="contained"> Fully Booked</Button> </> 
                    :
                    <Button variant="contained" disabled={booking.outboundPassengers.map(x => x.auth0_Id).includes(Auth0.user?.sub!)} onClick={joinOutbound}> Join Carpooling</Button> 
                    }
                </Grid>
            </Grid>
           
        </>
        :
       <>
            {props.date != "" ? 
            <>
                <Typography variant={'h4'}>Reserve for {format(new Date(props.date), 'EEEE do MMMM')} </Typography>
                <Grid container xs={12}>
                    <Grid item xs={6}>
                        <Typography>Inbound</Typography>
                        <Button variant="contained" onClick={joinInbound}> Join Carpooling</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Outbound</Typography>
                        <Button variant="contained" onClick={joinOutbound}> Join Carpooling</Button>
                    </Grid>
                </Grid>
                <Player
                autoplay
                loop
                src={panda}
                style={{ height: '200px' }}
                >
                </Player>
            </>
            :
            <>
             Please select a date heheheheh
             <Player
                autoplay
                loop
                src={panda}
                style={{ height: '200px' }}
                >
                </Player>
            </>
            }

       </>
       
       }
    </div>
  )
}

export default MakeBooking

function enqueueSnackbar(arg0: string, arg1: { variant: string; }) {
    throw new Error('Function not implemented.');
}
