import { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import parse from 'date-fns/parse';
import User from './model/EditUser';
import DayPicker from './components/DayPicker';
import { format } from 'date-fns';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function Profile() {

    const Auth0 = useAuth0();
    const [data, setData] = useState<User>(); 
    const [fromOptions, setFromOptions] = useState<any>([]);
    const [Address, setAddress] = useState("")
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(); 
    }, [])
    

    const handleStartDateChange = (date: Date ) => {
      if (data !== undefined){
        setData({...data, inboundTime : date});
      }
    };
  
    const handleEndDateChange = (date: Date ) => {
      if (data !== undefined){
        setData({...data, outboundTime : date});
      }
    };
  
    async function fetchData(){
        const token = await Auth0.getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Users`, { 
          method:"GET", 
          headers: {
              "Content-Type": "application/json",
              "Authorization" : `Bearer ${token}`, 
          }
        })
        if (response.ok)
        {
          const profileData = await response.json() 
          setData({ ...profileData, inboundTime : parse(profileData.inboundTime, "p", new Date()) , outboundTime : parse(profileData.outboundTime, "p", new Date())})
          setAddress(profileData.address)
        }
      }

      async function SaveData(){
        const token = await Auth0.getAccessTokenSilently();

        if (data !== undefined){
          const postreq = (
            {
              "name": data.name,
              "career_stage": data?.career_Stage,
              "email": data?.email,
              "phone": data?.phone,
              "isDriver": data?.isDriver,
              "address" : data?.address, 
              "radius": data.radius,
              "days": data?.days,
              "outboundTime": format(data.inboundTime, 'p'),
              "inboundTime": format(data.outboundTime, 'p'),
              "capacity" : data.capacity, 
              "bookings" : []
            }
          );

          console.log(postreq); 

          const response = await fetch(`${process.env.REACT_APP_API_URL}/Users`, { 
            method:"PATCH", 
            body : JSON.stringify(postreq), 
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`, 
            }
          })
          if (response.ok)
            {
              enqueueSnackbar("Congragulations! Your profile has been updated", {
                variant: "success",
              });
              navigate(-1);
            }
        }
      }

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
    <>
    <ResponsiveAppBar/>
    <div style={{ padding : "5%"}}>
        {data !== undefined 
        ? 
            <>
                <TextField style = {{marginBottom : 20, paddingRight : '10%'}} id="outlined-basic" value={data.name} onChange={(e) => setData({...data, name : String(e.target.value)})} label="Full Name" variant="outlined" />
                <TextField style = {{marginBottom : 20, paddingRight : '10%'}} id="outlined-basic" value={data.email} onChange={(e) => setData({...data, email : String(e.target.value)})} label="Email" variant="outlined" />
                <TextField style = {{marginBottom : 20}} id="outlined-basic" value={data.phone} onChange={(e) => setData({...data, phone : String(e.target.value)})} label="Phone Number" variant="outlined" />
            
                <Autocomplete
                  options={fromOptions}      
                  onInputChange={(event, value) => handleInputChange(event, value)}
                  getOptionLabel={(option : any) => option}
                  defaultValue={Address}
                  style={{ width: 400, marginBottom : 20}}
                  //@ts-ignore
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
                        value={data.career_Stage} onChange={(e) => setData({...data, career_Stage : String(e.target.value)})} 
                        label="Career Stage"
                    >
                    <MenuItem value={"PG(T) Students"}>PG(T) Students</MenuItem>
                    <MenuItem value={"PG(R) Students"}>PG(R) Students</MenuItem>
                    <MenuItem value={"Lecturers"}>Lecturers</MenuItem>
                    <MenuItem value={"Staff"}>Staff</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ width: 300, paddingTop : "20px"}} >
                  <br></br>
                  <Typography>Radius willing to travel to pick up another passenger</Typography>
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
                <br></br>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="Start Time"
                      value={data.inboundTime}
                      onChange={(e : any) => handleStartDateChange(e)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="End Time"
                    value={data.outboundTime}
                    onChange={(e : any) => handleEndDateChange(e)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
               
                <DayPicker 
                  days={data.days} 
                  updateDays= {(x : any) => { setData({...data, days : x })}}
                />
                <Button variant="contained" onClick={() => SaveData()}>Save Changes</Button>
            </>
        :
            <></>
        }
     </div>
     </>
  )
}

export default Profile