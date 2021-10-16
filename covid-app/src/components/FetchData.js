import React, { useEffect, useState } from 'react'

import axios from 'axios';

export default function FetchData() {
    const [countries,setCountries]=useState([]);

    const URL= 'https://api.covid19api.com/summary'

    const fetchCountriesData= async ()=>{
        const response=await axios.get(URL)
        console.log(response.data.Countries[0].Country);
        setCountries(response.data.Countries);
    }

    useEffect(() => {
        fetchCountriesData()
    }, [])

    return(
        <div>
            <h1>{countries.Country}</h1>
        </div>
    )
    

}

