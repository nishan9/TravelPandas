import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Autocomplete, Button } from '@mui/material';
import AddressRadius from './model/AddressRadius';

function Dashboard() {

  const { logout } = useAuth0(); 
  const [isRegistered, setIsRegistered] = useState<string>(); 
  const Auth0 = useAuth0();
  const [distances, setDistances] = useState<any>(); 

  useEffect(() => {
    fetchAddresses(); 
  },[])

  async function fetchAddresses() {
    const response = await fetch(`https://localhost:5001/Bookings`, { 
      method:"GET", 
      headers: {
          "Content-Type": "application/json",
      }
    })

    getData(await response.json()); 
  }

  async function getData(DriverAddressList : AddressRadius){
    const PassengerAddress = "81 OAKRIDGE ROAD, HIGH WYCOMBE, BUCKINGHAMSHIRE, HP11 2PL"; 
    const Possible = await fetch(`/api/DistanceMatrix`, { 
      method:"POST", 
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({PassengerAddress: PassengerAddress, DriverAddressList : DriverAddressList})
    })
    setDistances(await Possible.json())
  }

  return (
    <>
      <Button variant="contained" onClick={() => logout() }> Logout </Button>

      <>
        {distances !== undefined ?  <> {distances[0].address} {distances[0].value} </> : <p>fdfdfdfd</p> }
      </>

    </>
  )
}

export default Dashboard