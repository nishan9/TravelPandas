import { Typography, Grid, Box, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface DayPickerProps {
  days: string;
  updateDays : Function
}


function DayPicker(props: DayPickerProps) {

  const [days, setDays] = useState({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false})

  useEffect(() => {
    UpdateState(); 
  },[days])

  useEffect(() => {

    if ((props.days).includes("Mon")){
      setDays({...days, mon : true})
    }
    if ((props.days).includes("Tue")){
      setDays({...days, tue : true})
    }
    if ((props.days).includes("Wed")){
      setDays({...days, wed : true})
    }
    if ((props.days).includes("Thu")){
      setDays({...days, thu : true})
    }
    if ((props.days).includes("Fri")){
      setDays({...days, fri : true})
    }
    if ((props.days).includes("Sat")){
      setDays({...days, sat : true})
    }
    if ((props.days).includes("Sun")){
      setDays({...days, sun : true})
    }

  },[])

  function UpdateState(){

    var alldays = ""

    if (days.mon){ alldays += "Mon" } 
    if (days.tue){ alldays += "Tue" }
    if (days.wed){ alldays += "Wed" }
    if (days.thu){ alldays += "Thu" }
    if (days.fri){ alldays += "Fri" }
    if (days.sat){ alldays += "Sat" }
    if (days.sun){ alldays += "Sun" }

    props.updateDays(alldays)
  }
    

  return (
    <div style={{ paddingTop : "2%"}}>
    <Typography> Days you will be travelling to university: </Typography><br></br>
          <div style={{ width : "500px"}}>
          <Grid  item container direction="row" style={{  display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
            <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%', }}>
              <div style={{ textAlign : 'center'}}>
                <Typography style={{ paddingBottom : '10px'}}>Mon</Typography> 
                <Box m={0} style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                <Checkbox defaultChecked checked={days.mon} onChange={(e,v) => setDays({...days,mon: v})} />
              </div>
            </Grid>
            <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
              <div style={{ textAlign : 'center', paddingRight : '70%'}}>
                <Typography style={{ paddingBottom : '10px'}}>Tue</Typography> 
                <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                <Checkbox defaultChecked  checked={days.tue} onChange={(e,v) => setDays({...days,tue: v})}/>
              </div>
            </Grid>
            <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
                <div style={{ textAlign : 'center'}}>
                <Typography style={{ paddingBottom : '10px'}}>Wed</Typography> 
                <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                <Checkbox defaultChecked checked={days.wed} onChange={(e,v) => setDays({...days,wed: v})}/>
              </div>
            </Grid>
            <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
              <div style={{ textAlign : 'center'}}>
                <Typography style={{ paddingBottom : '10px'}}>Thu</Typography> 
                <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                <Checkbox defaultChecked checked={days.thu} onChange={(e,v) => setDays({...days,thu: v})}/>
              </div>
            </Grid>
            <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
              <div style={{ textAlign : 'center'}}>
                <Typography style={{ paddingBottom : '10px'}}>Fri</Typography> 
                <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                <Checkbox defaultChecked checked={days.fri} onChange={(e,v) => setDays({...days,fri: v})}/>
              </div>
            </Grid>
            <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
              <div style={{ textAlign : 'center'}}>
              <Typography style={{ paddingBottom : '10px'}}>Sat</Typography> 
              <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
              <Checkbox checked={days.sat} onChange={(e,v) => setDays({...days,sat: v})}/>
              </div>
            </Grid>
            <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
              <div style={{ textAlign : 'center', paddingRight : ''}}>
                <Typography style={{ paddingBottom : '10px'}}>Sun</Typography> 
                <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                <Checkbox checked={days.sun} onChange={(e,v) => setDays({...days,sun: v})}/>
              </div>
            </Grid>
          </Grid>
          <br></br>
          </div>
    </div>
  )
}

export default DayPicker