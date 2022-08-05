interface User {
    name: string, 
    career_Stage: string, 
    auth0_Id: string, 
    email: string, 
    phone: string, 
    isDriver : boolean, 
    address: string, 
    radius: string, 
    days: string, 
    outboundTime: Date, 
    inboundTime: Date, 
    capacity: number,
    bookings : string[]
}
export default User; 