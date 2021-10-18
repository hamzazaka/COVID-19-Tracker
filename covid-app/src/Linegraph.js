import React, { useState, useEffect}from 'react';
import {Line} from 'react-chartjs-2'

export default function Linegraph() {
    const [data,setData]=useState({});

    
    const buildChartData=(data,casesType="cases")=>{
        const chartData=[];
        let lastDataPoint;
        
        for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint={
                    x:date,
                    y:data[casesType][date]-lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint=data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {
        const fetchData=async ()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            const chartData=buildChartData(data);
            setData(chartData);
        });
    }
    fetchData();
    }, []);
    
    
    return (
        <div>
            <Line data={{
                datasets:[
                    {
                        backgroundColor:'rgba(204,16,52,0.7)',
                        borderColor:"#CC1034",
                    data:data,
                }]
            }} />
            
        </div>
    )
}
