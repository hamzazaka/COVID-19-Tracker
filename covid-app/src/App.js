import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react';
import axios from 'axios';


import Header from './components/header';

function App() {

  const [countries,setCountries]=useState([]);
  const[isPending,setisPending]=useState(true)

    const URL= 'https://api.covid19api.com/summary'

    useEffect(() => {

  const fetchCountriesData=async ()=>{
    const response=await axios.get(URL);
    console.log(response);
    setCountries(response);
    setisPending(false)
  }
  fetchCountriesData()
},[])
 
  // console.log(countries);

  return (
    <div className="App">
      {isPending===true?
       <h1>Loading.....</h1>:
      <Header countries={countries}/>
      }
      <h1>hello world</h1>
      
    </div>
  );
}

export default App;
