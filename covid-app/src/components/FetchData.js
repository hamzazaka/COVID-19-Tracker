import React, { useEffect, useState } from 'react'

import axios from 'axios';

export default function FetchData() {

    const [countries,setCountries]=useState([]);

    const URL='https://api.covid19api.com/summary';

    const fetchCountryData=  async ()=>{
        const response=await axios.get(URL);
        console.log(response);

    }


    useEffect(()=>{
        fetchCountryData()
    })

    return (
        <div>
            <h1>hello form fetch Data</h1>
        </div>
    )
}
