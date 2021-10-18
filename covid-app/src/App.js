import logo from './logo.svg';
import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';



function App() {

  const[countries,setCountries]=useState(['usa','uk','pk']);

  useEffect(()=>{
    const getCountriesData=async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        
      })
    }
  },[])

  return(

    <div className="app">
      <div className="app__header">
    <h1>Covid-19 Tracker</h1>
      <FormControl className='app__dropdown'>
        <Select variant='outlined' value='abc'>
          {
            countries.map(country=>(
              <MenuItem value={country}>{country}</MenuItem>
            ))
          }

       </Select>
      </FormControl>
      </div>
     
    </div>
  )
  
}

export default App;
