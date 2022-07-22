import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Checkbox, Divider, Grid, Stack, Tooltip, Typography } from "@mui/material";
import AddressRadius from "./model/AddressRadius";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import ChipData from "./model/ChipData";
import Map from "./Map";
import AccountMenu from "./AccountMenu";
import Logo from "./Images/Logo.png";
import Distance from "./Images/distance.png";
import Address from "./Images/address.png";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Player } from "@lottiefiles/react-lottie-player";
import panda from './Images/json/panda.json'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Dashboard() {

  const [isRegistered, setIsRegistered] = useState<string>();
  const Auth0 = useAuth0();
  const [distances, setDistances] = useState<any>();
  const navigate = useNavigate();
  const [availableDays, setAvailableDays] = useState(
    { 
      Monday : true, 
      Tuesday : true, 
      Wednesday : true, 
      Thursday : true, 
      Friday : true, 
      Saturday : false,
      Sunday : false 
    }); 
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop : 20,  
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

  useEffect(() => {
    fetchAddresses();
  }, [availableDays]);

  async function fetchAddresses() {

    var daystring = ""
    if (availableDays.Monday == true){
      daystring = daystring + "Mon"; 
    }
    if (availableDays.Tuesday == true){
      daystring = daystring + "Tue"; 
    }
    if (availableDays.Wednesday == true){
      daystring = daystring + "Wed"; 
    }
    if (availableDays.Thursday == true){
      daystring = daystring + "Thu"; 
    }
    if (availableDays.Friday == true){
      daystring = daystring + "Fri"; 
    }
    if (availableDays.Saturday == true){
      daystring = daystring + "Sat"; 
    }
    if (availableDays.Sunday == true){
      daystring = daystring + "Sun"; 
    }

    const response = await fetch(`https://localhost:5001/Bookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(daystring),
    });

    const data = await response.json();

    if (data.length == 0) {
      setDistances([]);
    } else {
      getData(data);
    }
  }

  async function getData(DriverAddressList: AddressRadius) {
    const PassengerAddress = "81 OAKRIDGE ROAD, HIGH WYCOMBE, BUCKINGHAMSHIRE, HP11 2PL";
    const Possible = await fetch(`https://indigo-crocodile-2910.twil.io/map`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PassengerAddress: PassengerAddress,
        DriverAddressList: DriverAddressList,
      }),
    });
    let result = await Possible.json(); 
    result = result.filter((e : any) => e.value !== 0); 
    setDistances(result); 
  }

  async function SelectDriver(address: String) {
    navigate(`Bookings/${address}`);
  }

  return (
    <>
      <ResponsiveAppBar/>
      <Grid spacing={3} container xs={12}>
        <Grid item lg={4}>
          <Stack spacing={2} p={3}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                <Typography style={{color:"#31C48A"}} variant='h6'>Select days you wish to carpool</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid  item container direction="row" style={{  display : 'flex', alignItems : 'center', justifyContent : 'center'}}>
                <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%', }}>
                  <div style={{ textAlign : 'center'}}>
                    <Typography style={{ paddingBottom : '10px'}}>Mon</Typography> 
                    <Box m={0} style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                    <Checkbox defaultChecked={true} checked={availableDays.Monday} onChange={e => setAvailableDays({...availableDays, Monday : e.target.checked})} />
                  </div>
                </Grid>
                <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
                <div style={{ textAlign : 'center', paddingRight : '70%'}}>
                <Typography style={{ paddingBottom : '10px'}}>Tue</Typography> 
                    <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                    <Checkbox defaultChecked={true} checked={availableDays.Tuesday} onChange={e => setAvailableDays({...availableDays, Tuesday : e.target.checked})} />
                  </div>
                </Grid>
                <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
                <div style={{ textAlign : 'center'}}>
                <Typography style={{ paddingBottom : '10px'}}>Wed</Typography> 
                    <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                    <Checkbox  defaultChecked={true} checked={availableDays.Wednesday} onChange={e => setAvailableDays({...availableDays, Wednesday : e.target.checked})} />
                  </div>
                </Grid>
                <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
                  <div style={{ textAlign : 'center'}}>
                    <Typography style={{ paddingBottom : '10px'}}>Thu</Typography> 
                    <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                    <Checkbox defaultChecked={true} checked={availableDays.Thursday} onChange={e => setAvailableDays({...availableDays, Thursday : e.target.checked})} />
                  </div>
                </Grid>
                <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
                  <div style={{ textAlign : 'center'}}>
                    <Typography style={{ paddingBottom : '10px'}}>Fri</Typography> 
                    <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                    <Checkbox  defaultChecked={true} checked={availableDays.Friday} onChange={e => setAvailableDays({...availableDays, Friday : e.target.checked})} />
                  </div>
                </Grid>
                <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
                  <div style={{ textAlign : 'center'}}>
                  <Typography style={{ paddingBottom : '10px'}}>Sat</Typography> 
                  <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                  <Checkbox  defaultChecked={false} checked={availableDays.Saturday} onChange={e => setAvailableDays({...availableDays, Saturday : e.target.checked})} />
                  </div>
                </Grid>
                <Grid item container direction="column" alignItems={'center'} xs={1} style={{   paddingTop : '2%'}}>
                  <div style={{ textAlign : 'center', paddingRight : ''}}>
                    <Typography style={{ paddingBottom : '10px'}}>Sun</Typography> 
                    <Box style={{height : '5px', width: '100%', color : 'red', borderTop : '2px solid black' }}></Box>
                    <Checkbox defaultChecked={false} checked={availableDays.Sunday} onChange={e => setAvailableDays({...availableDays, Sunday : e.target.checked})} />
                  </div>
                </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Stack> 
          { distances == undefined ?
            <>
              <Typography>Loading</Typography>
              <Player
              autoplay
              loop
              src={panda}
              style={{ height: '200px' }}
              >
              </Player>
            </>
          : distances.length == 0 ? 
            <div style={{ textAlign : 'center', paddingTop : '50px'}}>
              <Typography variant="h5">No Drivers Found</Typography>
              <Player
              autoplay
              loop
              src={panda}
              style={{ height: '400px' }}
              >
              </Player>
            </div>
          : 
          <div style={{ textAlign : 'center', padding : '14px'}}>
            <Typography style={{color:"#31C48A"}} variant="h6"> Hoooraayy! We've found {distances.length} Drivers </Typography>
            {distances.map((address: any) => (
              <Item>
                <Grid
                  style={{ cursor: "pointer" }}
                  container
                  onClick={() => SelectDriver(address.address)}
                >
                  <Grid item
                    style={{ display: "flex", alignItems: "center" }}
                    lg={10}
                  >
                    <img height={40} src={Address}></img> {address.address}{" "}
                  </Grid>
                  <Grid item lg={2}> {(address.value / 1609).toFixed(2)} miles
                  </Grid>
                </Grid>
              </Item>
            ))}
          </div>
          }
        </Grid>
        <Grid item lg={8}>
        { distances !== undefined ?  <Map addressList={distances}/> :             
        <>
              <Typography>Map Not Found</Typography>
              <Player
              autoplay
              loop
              src={panda}
              style={{ height: '200px' }}
              >
              </Player>
          </>
          }
       
              
        </Grid> 
      </Grid>
    </>
  );

}
export default Dashboard;