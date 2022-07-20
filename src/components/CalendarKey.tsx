import { Typography } from '@mui/material'
import React from 'react'
import "../Calendar.css"

function CalendarKey() {

  return (
    <div className='key' >
        <Typography variant='h5'> Key </Typography>
        <br/>
        <div style={{ display : 'flex', alignItems : "center", marginBottom : '20px'}}>
            <div className="circle-red" style={{ marginRight : "20px"}}>
                <p>X</p>
            </div>
            <Typography> Unavailable date: Driver not travelling or fully booked</Typography>
        </div>

        <div style={{ display : 'flex', alignItems : "center", marginBottom : '20px'}}>
            <div className="circle-white" style={{ marginRight : "20px"}} >
                <p>X</p>
            </div>
            <Typography> Available Date </Typography>
        </div>

        <div style={{ display : 'flex', alignItems : "center"}}>
            <div className="circle-blue" style={{ marginRight : "20px"}} >
                <p>X</p>
            </div>
            <Typography> Selected Date </Typography>
        </div>
    </div>
  )
}

export default CalendarKey