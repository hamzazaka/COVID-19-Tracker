import React, { useEffect, useState } from 'react'

export default function News() {
const[news,setNews]=useState();

const News='https://newsapi.org/v2/everything?qInTitle="covid-19"&from=2021-10-24&language=en&sortBy=publishedAt&apiKey=3d3699fa5c1641c4ac4fac5e8cf46d27';

const newsData= async ()=>{
        await fetch(News)
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data);
            setNews(data.articles)
        })
    }
    console.log(news);
 useEffect(()=>{
     newsData()
 },[])



    return (
        <section>
            {news?.length > 0 && (
        <div className='all-news'>
            {news.map((mynews)=>{
                return(
                <div className='news inner'>
                <img src={mynews.urlToImage} alt="hello" />
               <p>{mynews.author}</p>
               <p>{mynews.description}</p>
                </div>
            )})}
        </div>
            )}
        </section>
            
    )
}