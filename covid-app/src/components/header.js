import React, { useState } from 'react'

export default function Header({countries}) {
  
    console.log(countries);

    return (
        <div>
            <h1>Covid-19 Tracker</h1>
            <li> New Cases {countries.data.Global.NewConfirmed}</li>
            <li>Total Cases {countries.data.Global.TotalConfirmed}</li>
            <li>New Deaths {countries.data.Global.TotalConfirmed}</li><li>Total Dealths {countries.data.Global.TotalConfirmed}</li>
        </div>
    )
}
