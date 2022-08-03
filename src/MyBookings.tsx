import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import { IconButton, Typography } from '@mui/material';
import { useState, useEffect } from 'react'; 
import ResponsiveAppBar from './ResponsiveAppBar';
import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Player } from '@lottiefiles/react-lottie-player';
import panda from './Images/json/panda.json'
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'driverName',
    headerName: 'Driver Name',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Trip Date',
    width: 150,
  },
  {
    field: 'type',
    headerName: 'Journey Type',
    width: 170,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 150,
  }
];

export default function MyBookings() {

  const [datagridRows, setDatagridRows] = useState<any[]>([]); 
  const [selectedBookings, setSelectedBookings] = useState<any[]>(); 
  const Auth0 = useAuth0();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  },[])

  async function fetchData(){

    const token = await Auth0.getAccessTokenSilently();
    const Possible = await fetch(`${process.env.REACT_APP_API_URL}/Users/MyBookings`, { 
      method:"GET", 
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`, 
      }
    })
    const rows : any = await Possible.json();
    setDatagridRows(rows); 
  }

  async function DeleteBookings(){
    const token = await Auth0.getAccessTokenSilently();
    const deleteBookings = await fetch(`${process.env.REACT_APP_API_URL}/Bookings/DeleteBookings`, { 
      method:"POST", 
      body : JSON.stringify({ ids : selectedBookings}), 
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`, 
      }
    })
    if (deleteBookings.ok) {
      enqueueSnackbar("Congragulations! Your Booking has been deleted", {
        variant: "info",
      });
      navigate(-1);
    }

  }


  return (
    <>
    <ResponsiveAppBar/> 
    <Grid container style={{ paddingLeft : '10%', paddingTop: '5%', paddingRight : '10%'}}>
      <Grid item xs={7}> 
        <Box sx={{ height: 400, width: '100%', marginBottom : '70px' }}>
          <Typography variant='h4'> Current Bookings</Typography>
          <br/>
          <DataGrid
            rows={datagridRows}
            columns={columns}
            pageSize={5}
            onSelectionModelChange={(e) => setSelectedBookings(e)}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
        <IconButton aria-label="delete" size="large" onClick={e => DeleteBookings()}> 
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Grid>
      <Grid item xs={5}>
        <br></br>
        <br></br>
        <Player
        autoplay
        loop
        src={panda}
        style={{ width: '100%' }}
        >
        </Player>
      </Grid>

    </Grid>
    <div>




    </div>
    </>
  );
}
