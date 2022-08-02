import React, { useEffect, useState } from "react";
import Booking from "./model/Booking";
import "./Calendar.css";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import Bookings from "./Bookings";
import { deepPurple, grey } from "@mui/material/colors";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import CalendarKey from "./components/CalendarKey";
import { useSnackbar } from "notistack";
import { Player } from "@lottiefiles/react-lottie-player";
import panda from "./Images/json/panda.json";
import format from "date-fns/format";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import seatbelt from "./Images/seatbelt.png";
import smartphone from "./Images/smartphone.png";
import email from "./Images/gmail.png";
import university from "./Images/university.png";
import home from "./Images/home.png";

interface MakeBookingProps {
  date: string;
  driver: string;
  driverName: string;
  capacity: number;
  outboundTime: string;
  inboundTime: string;
  email: string;
  phone: string;
  career: string;
  address: string;
  days: string;
}

function MakeBooking(props: MakeBookingProps) {
  const [booking, setBooking] = useState<Booking>();
  const { enqueueSnackbar } = useSnackbar();
  const Auth0 = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [props.date]);

  async function getData() {
    const token = await Auth0.getAccessTokenSilently();
    const objd = { BookingDate: props.date };
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/Bookings/GetBookings/${props.driver}`,
      {
        method: "POST",
        body: JSON.stringify(objd),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      setBooking(await res.json());
    } else {
      setBooking(undefined);
    }
  }

  async function joinInbound() {
    const token = await Auth0.getAccessTokenSilently();
    const newtravller = {
      driver: props.driver,
      date: props.date,
      type: "Inbound",
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/Bookings/MakeBooking`,
      {
        method: "POST",
        body: JSON.stringify(newtravller),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      enqueueSnackbar("Congragulations! Your booking is confirmed", {
        variant: "success",
      });
      navigate(-2);
    }
  }

  async function joinOutbound() {
    const token = await Auth0.getAccessTokenSilently();
    const newtravller = {
      driver: props.driver,
      date: props.date,
      type: "Outbound",
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/Bookings/MakeBooking`,
      {
        method: "POST",
        body: JSON.stringify(newtravller),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      enqueueSnackbar("Congragulations! Your booking is confirmed", {
        variant: "success",
      });
      navigate(-1);
    }
  }

  return (
    <>
      <Grid container className="driver-profile">
        <Grid item xs={12} mb={4}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Grid item xs={6}>
              <Typography variant={"h4"} display="inline">
                {" "}
                {props.driverName}{" "}
              </Typography>{" "}
              <Typography display="inline">({props.career})</Typography>
            </Grid>
            <Grid item xs={11}>
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <img src={seatbelt} height={"90px"}></img>
              </div>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ paddingBottom: 20 }}>
            <img
              style={{ verticalAlign: "middle", paddingRight: "10px" }}
              src={email}
              height={"40px"}
            />
            {props.email}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ paddingBottom: 20 }}>
            <img
              style={{ verticalAlign: "middle", paddingRight: "10px" }}
              src={smartphone}
              height={"40px"}
            />{" "}
            {props.phone}
          </div>
        </Grid>
        <Grid item xs={6} pt={3}>
          <div style={{ paddingBottom: 20 }}>
            <Typography variant={"h5"}>Travelling to University</Typography>
            <br />
            <Typography variant={"h4"}>
              {format(new Date(props.outboundTime), "p")}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} pt={3}>
          <div style={{ paddingBottom: 20 }}>
            <Typography variant={"h5"}>Travelling to Home</Typography>
            <br />
            <Typography variant={"h4"}>
              {format(new Date(props.inboundTime), "p")}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <br></br>

      <div className="driver-profile">
        {props.date !== "" && booking !== undefined ? (
          <>
                        <Typography variant={'h4'}>Reserve for {format(new Date(props.date), 'EEEE do MMMM')} </Typography>
                      
            <br></br>

            <Grid container xs={12}>
              <Grid item xs={6}>
                <Typography variant={"h5"}>Travelling to University</Typography>
                <br></br>
                {booking.inboundPassengers.map((e) => (
                  <>
                    <Grid
                      style={{ display: "flex", alignItems: "center" }}
                      marginBottom={2}
                    >
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>PA</Avatar>
                      <Box>
                        <Typography>{e.name}</Typography>
                        <Typography style={{ color: "grey" }}>
                          {e.email}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                ))}
                {booking.inboundPassengers.length >= props.capacity ? (
                  <>
                    {" "}
                    <Button disabled={true} variant="contained">
                      {" "}
                      Fully Booked
                    </Button>{" "}
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      disabled={booking.inboundPassengers
                        .map((x) => x.auth0_Id)
                        .includes(Auth0.user?.sub!)}
                      onClick={joinInbound}
                    >
                      Join Carpooling
                    </Button>
                  </>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant={"h5"}>Travelling to Home</Typography>
                <br></br>
                {booking.outboundPassengers.map((e) => (
                  <>
                    <Grid
                      style={{ display: "flex", alignItems: "center" }}
                      marginBottom={2}
                    >
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>PA</Avatar>
                      <Box>
                        <Typography>{e.name}</Typography>
                        <Typography style={{ color: "grey" }}>
                          {e.email}
                        </Typography>
                      </Box>
                    </Grid>
                  </>
                ))}
                {booking.outboundPassengers.length >= props.capacity ? (
                  <>
                    <Button disabled={true} variant="contained">
                      {" "}
                      Fully Booked
                    </Button>{" "}
                  </>
                ) : (
                  <Button
                    variant="contained"
                    disabled={booking.outboundPassengers
                      .map((x) => x.auth0_Id)
                      .includes(Auth0.user?.sub!)}
                    onClick={joinOutbound}
                  >
                    {" "}
                    Join Carpooling
                  </Button>
                )}
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            {props.date != "" ? (
              <>
                <Typography variant={"h4"}>
                  Reserve for {format(new Date(props.date), "EEEE do MMMM")}{" "}
                </Typography>

                <Grid container xs={12}>
                  <Grid item xs={6}>
                    <Typography>Inbound</Typography>
                    <Button variant="contained" onClick={joinInbound}>
                      {" "}
                      Join Carpooling
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Outbound</Typography>
                    <Button variant="contained" onClick={joinOutbound}>
                      {" "}
                      Join Carpooling
                    </Button>
                  </Grid>
                </Grid>
                <Player
                  autoplay
                  loop
                  src={panda}
                  style={{ height: "200px" }}
                ></Player>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Typography variant={"h6"}>
                  Please select a date you would like to carpool on
                </Typography>
                <Player
                  autoplay
                  loop
                  src={panda}
                  style={{ height: "200px" }}
                ></Player>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default MakeBooking;
