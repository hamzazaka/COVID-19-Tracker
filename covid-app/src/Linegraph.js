import React, { useState,useEffect } from 'react';
import {Line} from 'react-chartjs-2'

export default function Linegraph() {
    const [data,setData]=useState({});


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
        })
    }, [])

    const buildChartData=(data)=>{
        const chartData=[];
        let lastDataPoint;

        data.cases
    }




    return (
        <div>
            <h1>I am a graph</h1>
            {/* <Line
            data
            options
            /> */}
        </div>
    )
}
