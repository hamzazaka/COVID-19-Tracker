import React, { useEffect, useState } from 'react'

import axios from 'axios';

export default function FetchData() {
    const [countries,setCountries]=useState([]);

    const URL= 'https://api.covid19api.com/summary'

    const fetchCountriesData= async ()=>{
        const response=await axios.get(URL)
        console.log(response.data.Countries);
        setCountries(response.data.Countries);
    }

    useEffect(() => {
        fetchCountriesData()
    }, [])

    return(
        <div>
            <h1>{countries.length} Countires</h1>
            <section>
                {countries.map((country)=>{
                    const {ID,Country,CountryCode,NewConfirmed,TotalConfirmed,NewDealths}=country

                    return(
                        <article key={ID}>
                            <h2>{Country} {CountryCode}</h2>
                            <ul>
                                <li>{NewConfirmed}</li>
                                <li>{TotalConfirmed}</li>
                                <li>{NewDealths}</li>


                            </ul>
                        </article>
                    )
                })}
            </section>
        </div>
    )
    

}

