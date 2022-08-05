import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip, Label } from 'recharts';

interface BarChartComponentProps{
  data : any
}
function BarChartComponent(props: BarChartComponentProps) {

    const Auth0 = useAuth0();

    return (
      <BarChart width={600} height={400} data={props.data} >
          <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear"  allowDecimals={false} >
            </XAxis>
            <YAxis >
            </YAxis>
          <Tooltip />
          <Legend aria-label=''/>
          <Bar dataKey="bookings" fill="#82ca9d" />
      </BarChart>
  )
}

export default BarChartComponent