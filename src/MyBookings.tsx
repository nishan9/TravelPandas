import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react'; 
import format from 'date-fns/format';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useAuth0 } from '@auth0/auth0-react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Driver Name',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Trip Date',
    width: 150,
  },
  {
    field: 'journeyType',
    headerName: 'Journey Type',
    width: 170,
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 180,
  },
  {
    field: 'passengers',
    headerName: 'Passengers',
    width: 150,
  },
];

export default function MyBookings() {

  const [datagridRows, setDatagridRows] = useState<any[]>([]); 
  const [selectedBookings, setSelectedBookings] = useState(); 
  const Auth0 = useAuth0();

  useEffect(() => {
    fetchData();
  },[])

  async function fetchData(){

    const token = await Auth0.getAccessTokenSilently();
    const Possible = await fetch(`${process.env.REACT_APP_API_URL}/Bookings/MyBookings`, { 
      method:"GET", 
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`, 
      }
    })
    const rows : any = await Possible.json();

    const newDatagrid = rows.map( (row : any, i : number)  => {
      if (row.inboundPassengers.length > 0)
      {        
        return { 
          id : i, 
          databaseId : row.id, 
          date : row.date, 
          name : row.name, 
          driver_Id : row.driver_Id, 
          time : format(new Date(row.inboundTime), 'p'), 
          passengers : row.inboundPassengers.join(" "),
          journeyType : "Inbound"
         }
      }
      if (row.outboundPassengers.length > 0) {
        return { 
          id : i, 
          databaseId : row.id, 
          date : row.date, 
          name : row.name, 
          driver_Id : row.driver_Id, 
          time : format(new Date(row.outboundTime), 'p'), 
          passengers : row.outboundPassengers.join(" "),
          journeyType : "Outbound"
         }
      }
    })
    setDatagridRows(newDatagrid); 
  }

  async function DeleteBookings(){
    const token = await Auth0.getAccessTokenSilently();
    const Possible = await fetch(`sddsdssd`, { 
      method:"POST", 
      headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`, 
      }
    })
    const data = await Possible.json();
  }

  return (
    <>
    <ResponsiveAppBar/> 
    <Grid container style={{ paddingLeft : '10%', paddingTop: '5%', paddingRight : '10%'}}>
      <Box sx={{ height: 400, width: '100%',}}>
        <Typography variant='h4'> Current Bookings</Typography>
        <br></br>
        <DataGrid
          rows={datagridRows}
          columns={columns}
          pageSize={5}
          onSelectionModelChange={(e : any, v) => console.log(e,v)}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
        <Button variant='outlined' onClick={(e) => DeleteBookings()} >Delete Shit</Button>
      </Box>
    </Grid>
    </>
  );
}
