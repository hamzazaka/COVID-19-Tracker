import { darken } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

export default function Allcountries() {
const [countries,setCountries]=useState([]);

const URL_Countries='https://disease.sh/v3/covid-19/countries'

  const allCountries= async()=>{
     await fetch(URL_Countries)
     .then((response)=>response.json())
     .then((data)=>{
         setCountries(data);
     })
  }
  console.log(countries);

  useEffect(()=>{
      allCountries()
  },[])


    return (
        <div className=' all_countries'>
            <h1 className='text-center pb-3'>All Countries</h1>
            <div className="row">
            {countries.map((mycountry)=>{
                const{countryInfo,country,cases,recovered,deaths}=mycountry;
                return(
                <div className='col-md-3 one_country'>
                <h1>{country}</h1>
                <img src={countryInfo.flag} alt="" />
                 <p><span>Cases</span>  : {cases}</p>
                 <p> <span> Recovered : </span> {recovered}</p>
                 <p><span>Deaths :</span>  {deaths}</p>
                </div>
                )
            })}
            </div>
        </div>
    )
}
