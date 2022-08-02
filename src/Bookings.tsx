import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import User from './model/User';
import format from 'date-fns/format';
import MakeBooking from './MakeBooking';
import Grid from '@mui/material/Grid';
import "./Calendar.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import CalendarKey from './components/CalendarKey';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useAuth0 } from '@auth0/auth0-react';


function Bookings() {

  let params = useParams()
  const current_date = new Date()
  const Monthlater : Date = new Date(Date.now() + 60 * 24*60*60*1000)  
  const [driver, setDriver] = useState<User>(); 
  const [disableDays, setDisableDays] = useState<string>(); 
  const [bookedDates, setBookedDates] = useState<string[]>(); 
  const [selectDate, setSelectedDate] = useState<string>(""); 
  const Auth0 = useAuth0();

    useEffect(() => {
        getData(); 
    }, [selectDate])


  async function getData(){

    const token = await Auth0.getAccessTokenSilently();
    const Possible = await fetch(`${process.env.REACT_APP_API_URL}/Bookings/Availability/${params.id}`, { 
      method:"GET", 
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`, 
      }
    })
    const data = await Possible.json();
    
    
    setDriver(data.driver);
    setDisableDays(data.driver.days); 
    setBookedDates(data.fullyBookedDates); 
  }

  function disableDates(calendar : any){

   if (disableDays !== undefined){
    var DayArr = disableDays.match(/.{3}/g);
    var  allDays = "MonTueWedThuFriSatSun"

    DayArr?.map((e) => {
      allDays = allDays.replace(e, "")
    })

    let Unavailable = allDays.match(/.{3}/g);
    
    var days: number[] = []

    if (Unavailable !== null){
      for(let i  = 0; i < Unavailable.length; i++){
        if(Unavailable[i] === "Mon"){
          days.push(1)
        }
        else if (Unavailable[i] === "Tue"){
          days.push(2)
        }
        else if (Unavailable[i] === "Wed"){
          days.push(3)
        }
        else if (Unavailable[i] === "Thu"){
          days.push(4)
        }
        else if (Unavailable[i] === "Fri"){
          days.push(5)
        }
        else if (Unavailable[i] === "Sat"){
          days.push(6)
        }
        else if (Unavailable[i] === "Sun"){
          days.push(0)
        }
      }
    }


  for (let i=0; i < bookedDates!.length ; i++){
    const dateComponents = bookedDates![i].split("-");
    const withoutLeading0 = parseInt(dateComponents[2], 10);
    dateComponents[2] = withoutLeading0.toString()
    const withoutLeading00 = parseInt(dateComponents[1], 10);
    dateComponents[1] = withoutLeading00.toString()

    console.log(calendar.date.getMonth())

    if (calendar.date.getDate() === parseInt(dateComponents[2]) && calendar.date.getMonth() === parseInt(dateComponents[1]) - 1 ){
      return true
    }
  }
    
   if(days.includes(calendar.date.getDay()))
      return calendar.date.getDay() === calendar.date.getDay();
   }

  }
  
  function Book(value : Date){
    const date = format(value, 'yyyy-MM-dd')
    setSelectedDate(date)
  }

  return (
    <>
      <ResponsiveAppBar/> 
    <Grid spacing={3} container xs={12} mt={1}>
      <Grid item lg={4} marginLeft={5} >
        <Box>
        <Calendar
            minDate={new Date()}
            maxDate={Monthlater}
            onClickDay={(value : Date) => Book(value)}
            prev2Label={null}
            next2Label={null}
            prevLabel={<ArrowBackIosIcon/>}
            nextLabel={<ArrowForwardIosIcon/>}
            //@ts-ignore
            tileDisabled={disableDates}
            view={"month"}          
        />
        </Box>
        
        <CalendarKey/>

      </Grid>
      <Grid item lg={7}>
        {driver !== undefined ? 
          <>
            <MakeBooking 
              date={selectDate} 
              driverName={driver.name} 
              driver={driver?.auth0_Id} 
              capacity={driver?.capacity} 
              email={driver?.email} 
              inboundTime= {driver?.inboundTime}
              outboundTime={driver.outboundTime}
              phone={driver.phone}
              career={driver.career_Stage}
              address={driver.address}
              days={driver.days}
            /> 
          </>
        : 
          <>
          </>
        }
      </Grid>
    </Grid>
    </>
  )
}

export default Bookings