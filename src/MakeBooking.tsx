import React, { useEffect, useState } from 'react'
import Booking from './model/Booking';
import "./Calendar.css"
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import Bookings from './Bookings';
import { deepPurple, grey } from '@mui/material/colors';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CalendarKey from './components/CalendarKey';

interface MakeBookingProps{
    date : string
    driver : string
    capacity : number
    driverName : string
}

function MakeBooking(props : MakeBookingProps) {

    const [booking, setBooking] = useState<Booking>(); 

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
            alert("Not Bookings Found For that date")
            setBooking(undefined) 
        }
    }

    
  return (
    <div className="driver-profile">
         {booking !== undefined ? 
         <>
            <Typography variant={'h3'}>Reserve for {props.date} </Typography>
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
                    {booking.inboundPassengers.length >= props.capacity ? <> <Button disabled={true} variant="contained"> Fully Booked</Button> </> : <> Book Now</> }
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
                    {booking.outboundPassengers.length >= props.capacity ? <> <Button variant="contained"> Fully Booked</Button> </> : <> <Button variant="contained"> Book Now</Button> </> }
                </Grid>
            </Grid>
           
        </>
        :
        <p>No Bookings Found</p>}
    </div>
  )
}

export default MakeBooking