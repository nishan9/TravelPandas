import React, { useEffect, useState } from 'react'
import Booking from './model/Booking';

interface MakeBookingProps{
    date : string
    driver : string
    capacity : number
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
    <div>
        Book {props.date} to CarPool
        <br/>
        {booking !== undefined ? <> {booking.driver_Id} {props.capacity}</>: <p>undefined</p>}
    </div>
  )
}

export default MakeBooking