import React, { useState } from 'react'

export default function Header({countries}) {
  
    console.log(countries);

    return (
        <div className='header'> 
            <h1 className='text-center'>Covid-19 Tracker</h1>

          <div className=' header-img row text-center'>

            <div className="col-md-6 ">
             <h2>New Cases</h2>
             <li>{countries.data.Global.NewConfirmed}</li>
            </div>
             <div className="col-md-6 ">
            <h2>Total Cases</h2>
            <li>{countries.data.Global.TotalConfirmed}</li>
            </div>

             <div className="col-md-6 ">
                <h2>New Deaths</h2>
                <li>{countries.data.Global.NewDeaths}</li>
             </div> 
            
            <div className="col-md-6 ">
              <h2>Total Deaths</h2>
              <li>{countries.data.Global.TotalDeaths}</li>
            </div>

            </div>
         </div>
    )
}
