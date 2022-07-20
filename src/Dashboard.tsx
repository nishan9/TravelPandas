import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { AppBar, Autocomplete, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import AddressRadius from './model/AddressRadius';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import ChipData from './model/ChipData';
import Map from './Map'; 
import TopBar from './TopBar';
import Logo from './Images/Logo.png'; 
import Distance from './Images/distance.png'; 
import Address from './Images/address.png';
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [isRegistered, setIsRegistered] = useState<string>(); 
  const Auth0 = useAuth0();
  const [distances, setDistances] = useState<any>(); 
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([ { key: 0, label: 'Monday' }, { key: 1, label: 'Tuesday' }, { key: 2, label: 'Wednesday' }, { key: 3, label: 'Thursday' }, { key: 4, label: 'Friday' }, { key: 5, label: 'Saturday' }, { key: 6, label: 'Sunday' },]);
  const navigate = useNavigate();


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    fetchAddresses(); 
  },[chipData])

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));


  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  async function fetchAddresses() {
    let days: string[] = []
    chipData.map((e)=> days.push(e.label.slice(0,3)))
    let daystring = days.join(''); 
    

    const response = await fetch(`https://localhost:5001/Bookings/`, { 
      method:"POST", 
      headers: {
          "Content-Type": "application/json",
      }, 
      body : JSON.stringify(daystring)
    })
    
    const data = await response.json()
    
    if (data.length == 0 ){
      setDistances([]);
    }else {
      getData(data); 
    }
  }

  async function getData(DriverAddressList : AddressRadius){
    const PassengerAddress = "81 OAKRIDGE ROAD, HIGH WYCOMBE, BUCKINGHAMSHIRE, HP11 2PL"; 
    const Possible = await fetch(`https://indigo-crocodile-2910.twil.io/map`, { 
      method:"POST", 
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({PassengerAddress: PassengerAddress, DriverAddressList : DriverAddressList})
    })
    setDistances(await Possible.json())
  }

  async function SelectDriver(address : String){
    navigate(`Bookings/${address}`);
  }

  return( 
    <>

        <AppBar style={{ background: '#FFFFFF' }} position="static">
          <Box style={{ display: 'flex', marginLeft: '4%', marginRight: '4%', marginTop: '1%', marginBottom:'1%', justifyContent: 'space-between'}}>

            <img src={Logo} height="50px" /> 


            <Paper
            sx={{
              display: 'flex',
              justifyContent: 'center',
              boxShadow: 'none', 
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {chipData.map((data) => {
              return (
                <ListItem key={data.key}>
                  <Chip
                    label={data.label}
                    onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                  />
                </ListItem>
              );
            })}
          </Paper>
          
          <TopBar/>

          </Box>
        </AppBar>
        
        <Divider/>

        {distances == undefined ? 
        <>
          <p>undefined</p>
        </> 
        : distances.length == 0 ? 
        <>
          <p>No drivers found</p>
        </> 
        : 
        <>

          <Grid spacing={3} container xs={12} >
            <Grid item lg={4}>
              <Stack spacing={2} p={3}>
              <Typography>{distances.length} Drivers</Typography>
                {distances.map((address : any) => (
                  <Item>
                    <Grid style={{cursor: "pointer"}} container onClick={() => SelectDriver(address.address)}>
                      <Grid item style={{display: "flex", alignItems : "center" }} lg={10}> <img height={40} src={Address}></img> {address.address} </Grid>
                      <Grid item lg={2}> {address.value} </Grid>
                    </Grid>
                  </Item>
                ))}
              </Stack>
            </Grid>  
            <Grid item lg={8}>
              <Map addressList={distances}/>
            </Grid>   
          </Grid> 
        </>
        }
    </>
  )  
}

export default Dashboard