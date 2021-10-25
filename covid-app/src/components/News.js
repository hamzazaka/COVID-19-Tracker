import React, { useEffect, useState } from 'react'

export default function News() {
const[news,setNews]=useState();

const News='https://newsapi.org/v2/everything?qInTitle="covid-19"&language=en&sortBy=publishedAt&apiKey=3d3699fa5c1641c4ac4fac5e8cf46d27';

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
        <section className='news_body '>
            <h1 className='text-center top-heading'>Top News of Covid-19</h1>
        {news?.length > 0 && (
        <div className='row news-inner'>
            {news.map((mynews)=>{
                return(
                <div className='col-md-4 inner' key={mynews.id}>
                    <h4>Source: <span>{mynews.source.name}</span></h4>
                <img src={mynews.urlToImage==null? 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60':mynews.urlToImage} alt='Image not availale' />
               <h1 className='news_heading'> {mynews.title} - <span>{mynews.source.name}</span></h1>
               {/* <p className='news_author'>{mynews.author}</p> */}
               <p className='news_description'>{(mynews.content).slice(0,200)}....</p>
               <div className='text-center'>
                 <a href="" className='btn btn-primary'>Read More</a>
               </div>
                </div>
            )})}
        </div>
        )}
        </section>
            
    )
}

// mynews.urlToImage?.length>0 && (mynews.urlToImage)