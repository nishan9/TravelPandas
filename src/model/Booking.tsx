import User from "./User";

interface Booking {
    date: string;
    driver_Id: string;
    inboundPassengers: User[], 
    outboundPassengers : User[],
  }
export default Booking; 