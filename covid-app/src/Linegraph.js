import React, { useState,useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';

const options={
  legend:{
      display:false,
  },
  elements:{
      point:{
          radius:0,
      },
  },
  maintainAspectRatio:false,
  tooltips:{
    mode:"index",
    intersect:false,
    callbacks:{
        label:function(tooltipItem,data){
            return numeral(tooltipItem.value).format("+0,0")
        }
    }
  },
  scales:{
      xAxes:[
          {
              type:"time",
              time:{
                  format:"MM/DD/YY",
                  tooltipFormat:"ll",
              },
          },
        ],
      yAxes:[
          {
              gridlines:{
                  display:false,
              },
              ticks:{
                  callback:function(value,index,values){
                      return numeral(value).format("0o")
                  },
              }
          }
      ]
  },
},

export default function Linegraph() {
    const [data,setData]=useState({});


      const buildChartData=(data,casesType='cases')=>{
        const chartData=[];
        let lastDataPoint;

        for(let date in data.cases){
            if(lastDataPoint){
                const newDataPoint={
                    x:date,
                    y:data[casesType][date]-lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint=data[casesType][date];
        };
        return chartData;
    }


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            let chartData=buildChartData(data,'cases');
            setData(chartData)
        })
    }, [])

  




    return (
        <div>
            <h1>I am a graph</h1>
            <Line
            options={options}
            data={{
                datasets:[{
                    backgroundColor:"rgba(204,16,0.7)",
                    borderColor:"#CC1034",
                    data:data
                }
                ]
            }}
            />
        </div>
    )
}