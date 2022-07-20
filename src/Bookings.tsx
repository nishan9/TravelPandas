import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import User from './model/User';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import MakeBooking from './MakeBooking';
import Grid from '@mui/material/Grid';
import "./Calendar.css"

function Bookings() {

  let params = useParams()
  const current_date = new Date()
  const Monthlater : Date = new Date(Date.now() + 61 * 24 * 60 * 60 * 1000)  
  const [booking, setBooking] = useState(); 
  const [driver, setDriver] = useState<User>(); 
  const [disableDays, setDisableDays] = useState<string>(); 
  const [bookedDates, setBookedDates] = useState<string[]>(); 
  const [selectDate, setSelectedDate] = useState<string>(""); 

    useEffect(() => {
        getData(); 
    }, [selectDate])

  async function getData(){
    const Possible = await fetch(`${process.env.REACT_APP_API_URL}/Bookings/${params.id}`, { 
      method:"GET", 
      headers: {
          "Content-Type": "application/json",
      }
    })
    const data = await Possible.json();
    
    
    setDriver(data.driver);
    setBooking(data.booking); 
    setDisableDays(data.driver.days); 
    setBookedDates(data.fullyBooked); 
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

    if (calendar.date.getDate() === parseInt(dateComponents[2]) && calendar.date.getMonth() === parseInt(dateComponents[1])){
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
    <Grid spacing={3} container xs={12} m={2} >
      <Grid item lg={4}>
        <Calendar
            //minDate={new Date()}
            //maxDate={Monthlater}
            onClickDay={(value : Date) => Book(value)}
            prev2Label={null}
            next2Label={null}
            //@ts-ignore
            tileDisabled={disableDates}
            view={"month"}          
        />
      </Grid>
      <Grid item lg={8}>
        gfgf
      </Grid>
    </Grid>
  )
}

export default Bookings