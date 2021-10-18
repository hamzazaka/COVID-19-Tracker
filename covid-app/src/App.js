import logo from './logo.svg';
import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Infobox from './Infobox';
import Map from './Map';



function App() {

  const[countries,setCountries]=useState([]);
  const[country,setCountry]=useState('Worldwide')

  useEffect(()=>{
    const getCountriesData=async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries=data.map((country)=>({
          name:country.country,
          value:country.countryInfo.iso2
        }));
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange=async (event)=>{
    const countryCode=event.target.value;
    setCountry(countryCode);
  }

  return(

    <div className="app">
      <div className="app__left">
      <div className="app__header">
    <h1>Covid-19 Tracker</h1>
      <FormControl className='app__dropdown'>
        <Select variant='outlined' onChange={onCountryChange} value={country} >
          <MenuItem value='Worldwide'>WorldWide</MenuItem>
          {countries.map(country=>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

       </Select>
      </FormControl>
      </div>

      <div className="app__stats">
        <Infobox title="Coronavirus Cases" cases={123}  total={2000}/>
        <Infobox title="Recovered"  cases={123324324}  total={3000}/>
        <Infobox title="Deaths"  cases={12334343} total={200}/>

      </div>

      <Map/>
     </div>
     <Card className="app__right">
       <CardContent>
         <h3>Live Cases by country</h3>
         <h3>WordWide new Cases</h3>
       </CardContent>
     </Card>
    </div>
  )
  
}

export default App;
