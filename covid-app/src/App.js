import logo from './logo.svg';
import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util';
import Linegraph from './Linegraph';



function App() {

  const[countries,setCountries]=useState([]);
  const[country,setCountry]=useState('Worldwide');
  const[countryInfo,setcountryInfo]=useState({});
  const[tableData,setTableData]=useState([]);

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=>response.json())
    .then((data)=>{
      setcountryInfo(data);
    })
  },[])

  useEffect(()=>{
    const getCountriesData=async ()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries=data.map((country)=>({
          name:country.country,
          value:country.countryInfo.iso2
        }));
        const sortedData=sortData(data)
        setTableData(sortedData)
        setCountries(countries)
      })
    }
    getCountriesData()
  },[])

  const onCountryChange=async (event)=>{
    const countryCode=event.target.value;
    setCountry(countryCode);

    const url=countryCode==='Worldwide'? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
      setCountry(countryCode);
      setcountryInfo(data)

    })
  };

  console.log('country info', countryInfo);

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
        <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases}  total={countryInfo.cases}/>
        <Infobox title="Recovered"  cases={countryInfo.todayRecovered}  total={countryInfo.recovered}/>
        <Infobox title="Deaths"  cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>

      </div>

      <Map/>
     </div>
     <Card className="app__right">
       <CardContent>
         <h3>Live Cases by country</h3>
         <Table countries={tableData}/>

         <h3>WordWide new Cases</h3>

         <Linegraph  />
       </CardContent>
     </Card>
    </div>
  )
  
}

export default App;
