import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useAuth0 } from '@auth0/auth0-react';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { start } from 'repl';


const steps = ['Basic Details', 'Driver Availability'];

export default function Signup() {
  const Auth0 = useAuth0();
  const [accessToken, setAccessToken] = useState('')
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [data, setData] = useState({ name: "", email: "", phone: "", career: "", radius: "", start: new Date(), end: new Date()})
  const [days, setDays] = useState({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false})

  useEffect(() => {
    Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
  },[Auth0])


  async function SaveData(){
    const start = data.start.toString()
    const end = data.end.toString()
    var alldays = ""
    if (days.mon && days.tue && days.wed && days.thu && days.fri){
      alldays = "MTWTF"; 
      console.log("dsadsa")
    }
    const postreq = (
            {
              "name": data.name,
              "email" : data.email, 
              "phone": data.phone,
              "days": alldays, 
              "career": data.career,
              "radius": data.radius,
              "start": data.start, 
              "end": data.end,
            }
  );
  console.log(postreq); 

  
  }

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleStartDateChange = (date: Date ) => {
    setData({...data, start : date});
  };

  const handleEndDateChange = (date: Date ) => {
    setData({...data, end : date});
  };
  
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', padding: "5%"}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {activeStep === 0 ? 

            <Box
                sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'column',
                p: 1,
                m: 1,
                borderRadius: 1,
                }}
            >
                <TextField style = {{marginBottom : 20}} 
                           id="outlined-basic" 
                           value={data.name} onChange={(e) => setData({...data, name : String(e.target.value)})} 
                           label="First Name" 
                           variant="outlined" />

                <TextField style = {{marginBottom : 20}} 
                           id="outlined-basic" 
                           value={data.email} onChange={(e) => setData({...data, email : String(e.target.value)})} 
                           label="Email" 
                           variant="outlined" />

                <TextField style = {{marginBottom : 20}} 
                           id="outlined-basic" 
                           value={data.phone} onChange={(e) => setData({...data, phone : String(e.target.value)})} 
                           label="Phone Number" 
                           variant="outlined" />

                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Career Stage</InputLabel>
                    <Select
                        labelId="Career Stage"
                        id="demo-simple-select"
                        value={data.career} onChange={(e) => setData({...data, career : String(e.target.value)})} 
                        label="Career Stage"
                    >
                    <MenuItem value={"PG"}>PG</MenuItem>
                    <MenuItem value={"Staff"}>Staff</MenuItem>
                    <MenuItem value={"Lecturers"}>Lecturers</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            : 
            <>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked/>} label="Monday"  checked={days.mon} onChange={(e,v) => setDays({...days,mon: v})}/>
              <FormControlLabel  control={<Checkbox defaultChecked />} label="Tuesday" checked={days.tue} onChange={(e,v) => setDays({...days,tue: v})}/>
              <FormControlLabel  control={<Checkbox defaultChecked />} label="Wednesday" checked={days.wed} onChange={(e,v) => setDays({...days,wed: v})}/>
              <FormControlLabel  control={<Checkbox defaultChecked />} label="Thursday" checked={days.thu} onChange={(e,v) => setDays({...days,thu: v})}/>
              <FormControlLabel  control={<Checkbox defaultChecked />} label="Friday" checked={days.fri} onChange={(e,v) => setDays({...days,fri: v})}/>
              <FormControlLabel  control={<Checkbox />} label="Saturday" checked={days.sat} onChange={(e,v) => setDays({...days,sat: v})}/>
              <FormControlLabel  control={<Checkbox />} label="Sunday" checked={days.sun} onChange={(e,v) => setDays({...days,sun: v})}/>
            </FormGroup>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={data.start}
                onChange={(e : any) => handleStartDateChange(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="End Time"
                value={data.end}
                onChange={(e : any) => handleEndDateChange(e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

              
            <Box sx={{ width: 300 }}>
             <Typography>Radius willing to travel to pick up another passenger</Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                onChange={(e, v) => setData({...data, radius : String(v)})} 
                step={0.5}
                marks
                min={1}
                max={7}
              />
            </Box>

            </>
          }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={SaveData} sx={{ mr: 1 }}>
                Save Changes as Passenger
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? <>Save Changes as Driver</> : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
