import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { useAuth0 } from '@auth0/auth0-react';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Grid, Stack, Tooltip, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, Snackbar, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Autocomplete } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import format from 'date-fns/format';

export default function Signup() {
  const Auth0 = useAuth0();
  const [accessToken, setAccessToken] = useState('')
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [data, setData] = useState({ name: "", email: "", phone: "", career: "", radius: "2", address: "", start: new Date(), end: new Date(), capacity: ""})
  const [days, setDays] = useState({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false})
  const steps = ['Basic Details', 'Driver Availability'];
  const [fromOptions, setFromOptions] = useState<any>([]);
  const [Address, setAddress] = useState("")
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuth0();

  useEffect(() => {
    Auth0.getAccessTokenSilently().then(token => setAccessToken(token));
  },[Auth0])

  useEffect(() => {
    console.log("useEffect-fromOptions", fromOptions);
  }, [fromOptions]);

  async function SaveData(isDriver : boolean){

    const start = format(data.start, 'p'); 
    const end =  format(data.end, 'p'); 
  
    var alldays = ""

    if (days.mon){ alldays += "Mon" } 
    if (days.tue){ alldays += "Tue" }
    if (days.wed){ alldays += "Wed" }
    if (days.thu){ alldays += "Thu" }
    if (days.fri){ alldays += "Fri" }
    if (days.sat){ alldays += "Sat" }
    if (days.sun){ alldays += "Sun" }

    const postreq = (
      {
        "name": data.name,
        "career_stage": data.career,
        "email": data.email,
        "phone": data.phone,
        "isDriver": false,
        "address" : Address, 
        "radius": data.radius,
        "days": alldays,
        "outboundTime": start,
        "inboundTime": end,
        "capacity" : data.capacity, 
        "bookings" : []
      }
    );

    if (isDriver)
    {
      postreq.isDriver = true; 
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/Users`, { 
      method:"POST", 
      body: JSON.stringify(postreq),
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${accessToken}`, 
      }
    })

    if(response.ok) {
      enqueueSnackbar("Profile Created Successfully", { variant: 'success' });
      navigate("Dashboard");
    } else {
      enqueueSnackbar("An error occurred while creating the user. Please try again!", { variant: 'error' });
      console.error("Publishing failed");
    }
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

  const handleInputChange = async (e : any, v : any) => {
    const response = await fetch(
      `https://uk-address-and-postcodes.p.rapidapi.com/rapidapi/v1/autocomplete/addresses?query=${v}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": `uk-address-and-postcodes.p.rapidapi.com`,
          "X-RapidAPI-Key": `181bb4718amsh372f3d1027055c1p1f839djsn44c5497d8038`
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      const searchResults : any[] = [];
      data.result.hits.map((e : any) => {
        searchResults.push(e.suggestion);
      });
      setFromOptions(searchResults);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: "5%" }} >
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
          <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <br></br>
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
                <TextField style = {{marginBottom : 20}} id="outlined-basic" value={data.name} onChange={(e) => setData({...data, name : String(e.target.value)})} label="Full Name" variant="outlined" />
                <TextField style = {{marginBottom : 20}} id="outlined-basic" value={data.email} onChange={(e) => setData({...data, email : String(e.target.value)})} label="Email" variant="outlined" />
                <TextField style = {{marginBottom : 20}} id="outlined-basic" value={data.phone} onChange={(e) => setData({...data, phone : String(e.target.value)})} label="Phone Number" variant="outlined" />

                <Autocomplete
                  options={fromOptions}        
                  onInputChange={(event, value) => handleInputChange(event, value)}
                  getOptionLabel={(option : any) => option}
                  style={{ width: 400, marginBottom : 20}}
                  onChange={(a,b,c) => setAddress(b)}
                  renderInput={(params) => (
                    <TextField {...params} label="Address" variant="outlined" />
                  )}
                />

                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Career Stage</InputLabel>
                    <Select
                        labelId="Career Stage"
                        id="demo-simple-select"
                        value={data.career} onChange={(e) => setData({...data, career : String(e.target.value)})} 
                        label="Career Stage"
                    >
                    <MenuItem value={"PG(T) Students"}>PG(T) Students</MenuItem>
                    <MenuItem value={"PG(R) Students"}>PG(R) Students</MenuItem>
                    <MenuItem value={"Lecturers"}>Lecturers</MenuItem>
                    <MenuItem value={"Staff"}>Staff</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            : 
            <div style={{ paddingLeft : "30px"}}>
            <Typography variant={"h6"} style={{ color : "#075c18" }}> Days you will be travelling to university: </Typography>
                <br></br>
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

            <Typography variant={"h6"} style={{ color : "#075c18" }}>
              Seat capacity available in the car that you are happy for passengers to use:  
            </Typography>
            <br/>

            <TextField style = {{marginBottom : 20}} id="outlined-basic" value={data.capacity} onChange={(e) => setData({...data, capacity : String(e.target.value)})} 
                    label="Capacity" variant="outlined" />

            <Typography variant={"h6"}  style={{ color : "#075c18" }}>
              Timing that you will arrive to and from the university:  
            </Typography>

              <Box
                sx={{
                display: 'flex',
                alignItems: 'flex-start',
                flexDirection: 'row',
                borderRadius: 1,
                marginTop: 3
                }}
              >
              <Box
                marginRight={5}
                marginBottom={2}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Start Time"
                    value={data.start}
                    onChange={(e : any) => handleStartDateChange(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="End Time"
                  value={data.end}
                  onChange={(e : any) => handleEndDateChange(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

            </Box>

            <Box sx={{ width: 300 }} style={{ color : "#075c18" }}>
             <Typography variant={"h6"}  style={{ color : "#075c18" }} >Radius willing to travel to pick up another passenger</Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={2}
                valueLabelDisplay="auto"
                onChange={(e, v) => setData({...data, radius : String(v)})} 
                step={0.5}
                marks
                min={1}
                max={7}
              />
            </Box>

            </div>
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
            <Button
              onClick={() => logout()}
              >
              Logout
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ?
              <>
              <Button variant="contained" onClick={() => SaveData(true)} sx={{ mr: 1 }}>
                Save Changes as Driver
              </Button>              
              <Button variant="contained" onClick={() => SaveData(false)} sx={{ mr: 1 }}>
                Save Changes as Passenger
              </Button>
              </>
              : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}