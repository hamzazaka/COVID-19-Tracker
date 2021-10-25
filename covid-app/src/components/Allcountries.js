import React, { useEffect, useState } from 'react'

export default function Allcountries() {
const [countries,setCountries]=useState();

const URL_Countries='https://disease.sh/v3/covid-19/countries'

  const allCountries= async()=>{
     await fetch(URL_Countries)
     .then((response)=>response.json())
     .then((data)=>{
         console.log(data);
     })
  }

  useEffect(()=>{
      allCountries()
  },[])


    return (
        <div>
            <h1>hello form all countries</h1>
        </div>
    )
}
