import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from './dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Spinner } from './Spinner';
import axiosInstance from '../axios/axios';
import { Topnav } from './Topnav';
import { SearchTab } from './SearchTab';

export const People = () => {
  const nav = useNavigate();
    document.title = 'People' ;
   const [People, setPeople] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const [page, setpage] = useState(1)
   async function fetchPeople() {
    try {
      const response = await axiosInstance.get(`/person/popular`,{
        params: {
          page: page,
        }
      });
  
      const results = response.data.results;
      console.log(results);
  
      if (results && results.length > 0) {
        setPeople((prev) => [...prev, ...results]);
        setpage((prev) => prev + 1);
        // Check if it's the last page (total_pages is available from TMDb)
        if (page >= response.data.total_pages) {
          setHasMore(false);
        }
      } else {
        setHasMore(false); // No results = no more pages
      }
    } catch (error) {
      console.error("API error:", error);
      setHasMore(false); // Stop trying if error occurs
    }
   };  
    const refreshHandler = () => {
      if( People.length == 0) {
        fetchPeople();
      }};
    useEffect(() => {
     refreshHandler();
    } , []);

  return ( 
    People.length >0 ?
    <div className='w-full h-[100vh] bg-[#1F1E24]'>
      <div className='w-full h-[70px] bg-[#1F1E24] flex justify-between items-center px-3'>
      <div className='text-white text-2xl font-bold p-6 flex items-center ' >
        <div> <i className="ri-arrow-left-line  cursor-pointer" onClick={() => nav(-1)}></i> &nbsp;People</div>
        <SearchTab category="person" placeholder="Search for actors, directors, and crew..." />
 
</div>
        </div>
        <div id='targetscroll' className=' h-[89vh] w-full pt-2 overflow-y-auto'>
         {People && <InfiniteScroll
  dataLength={People.length} //This is important field to render the next data
  next={fetchPeople}
  hasMore={hasMore}
  loader={<h4 >Loading...</h4>}
  scrollableTarget="targetscroll"
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }

>
  <div className='flex flex-wrap justify-center items-center gap-5 px-5'>
  {People && People.map((item ,idx) => (
    
   <Link 
  to={`/view/person/${item.id}`} 
  key={idx} 
  className="w-[200px] h-[325px] bg-[#1F1E24] m-2 rounded-lg cursor-pointer flex flex-col gap-4 overflow-hidden group"
>
  <div className="relative overflow-hidden rounded-lg">
    <img 
      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} 
      alt={item.name || item.original_name} 
      className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
    />
    
    {/* Gradient Overlay for Darkening on Hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-lg"></div>
  </div>
  
  <h1 className="text-white text-lg text-center font-semibold transition-transform duration-300 group-hover:translate-y-[-5px] group-hover:text-yellow-400">
    {item.name || item.original_name}
  </h1>
</Link>

         ))}
  </div>
   
</InfiniteScroll>}
       </div>
    </div> : <div className='flex justify-center items-center w-screen h-screen'><Spinner /></div>
  )}