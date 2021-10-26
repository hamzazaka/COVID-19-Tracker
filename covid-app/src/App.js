import logo from './logo.svg';
import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import { useEffect, useState } from 'react';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util';
import Linegraph from './Linegraph';
import 'leaflet/dist/leaflet.css';
import { prettyPrintStat } from './util';
import Header from './components/Header';
import Navbar from './components/Navbar';
import News from './components/News';
import Allcountries from './components/Allcountries';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {

  const[countries,setCountries]=useState([]);
  const[country,setCountry]=useState('Worldwide');
  const[countryInfo,setcountryInfo]=useState({});
  const[tableData,setTableData]=useState([]);
  const[mapCenter,setMapCenter]=useState({lat:34.80746, lng:-40.4796});
  const [mapZoom,setMapZoom]=useState(1);
  const[mapCountries,setmapCountries]=useState([]);
  const[casesTypes,setCasesType]=useState('cases');



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
        setTableData(sortedData);
        setmapCountries(data)
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

      setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
      setMapZoom(2)

    })
  };

  console.log('country info', countryInfo);

  return(
    <Router>
    <>
    <Navbar/>
    <Switch>
    <Route path='/news'>
    <News/>
    </Route>
    <Route path='/allcountries'>
    <Allcountries/>
    </Route>
    <Route path='/hamza'> 
      <Header/>
      <h1 className='text-center blue-cl'>World Wide Data</h1>
    <div className="app">
      <div className="app__left">
      <div className="app__header">
    <h1 className='cl-blue'>Covid-19 Data </h1>
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
        <Infobox
        isRed
        active={casesTypes==='cases'}
        onClick={e=>setCasesType('cases')}
        title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)}  total={countryInfo.cases}/>
        <Infobox
        isRed
        active={casesTypes==='recovered'}

        onClick={e=>setCasesType('recovered')}  
        title="Recovered"  cases={prettyPrintStat(countryInfo.todayRecovered)}  total={countryInfo.recovered}/>
        <Infobox
        isRed
        active={casesTypes==='deaths'}
        onClick={e=>setCasesType('deaths')}
        title="Deaths"  cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths}/>

      </div>

      <Map casesType={casesTypes} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
     </div>
     <Card className="app__right">
       <CardContent>
         <h3>Live Cases by country</h3>
         <Table countries={tableData}/>

         <h3>{country} new {casesTypes}</h3>

         <Linegraph casesType={casesTypes}  />
       </CardContent>
     </Card>
    </div>
    </Route>
    </Switch>
     
    </>
  </Router>
  )
  
}

export default App;
