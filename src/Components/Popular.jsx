import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from './dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Spinner } from './Spinner';
import { SearchTab } from './SearchTab';

export const Popular = () => {
  const nav = useNavigate();
    document.title = 'Popular' ;
   const [Category, setCategory] = useState('movie');
   const [popular, setpopular] = useState([]);
   const [hasMore, setHasMore] = useState(true);
   const [page, setpage] = useState(1)
   async function fetchPopular() {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/${Category}/popular`, {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWI1ZGQ0M2VjNzgzMzBhMThiMmMxMTRkNTM0YTU1YSIsIm5iZiI6MTc0NTExNjI1Ni4zMDQ5OTk4LCJzdWIiOiI2ODA0NWM2MDZlMWE3NjllODFlZGZmODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._HFK5vHVQajcUbCkifTMQm8KbiI_ReaNk9QuuxeMRZQ'
        },
        params: {
          page: page,
        }
      });
  
      const results = response.data.results;
  
      if (results && results.length > 0) {
        setpopular((prev) => [...prev, ...results]);
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
      if( popular.length == 0) {
        fetchPopular();
      }
      else {
        setpage(1);
        setpopular([]);
        fetchPopular();
      }};
    useEffect(() => {
     refreshHandler();
    } , [Category]);

  return ( 
    popular.length >0 ?
    <div className='w-full h-[100vh] bg-[#1F1E24]'>
      <div className='w-full h-[70px] bg-[#1F1E24] flex justify-between items-center px-3'>
       <div className='text-white text-2xl font-bold p-6 flex items-center ' >
                      <div> <i className="ri-arrow-left-line  cursor-pointer" onClick={() => nav(-1)}></i> &nbsp;Popular</div>
                      <SearchTab category="multi" placeholder="Search popular movies and series..." />       
              </div>
       <div >
        <Dropdown title={"Category"} options={["movie","tv"]} onclick={setCategory} />
        </div>
        </div>
        <div id='targetscroll' className=' h-[89vh] w-full overflow-y-auto'>
         {popular && <InfiniteScroll
  dataLength={popular.length} //This is important field to render the next data
  next={fetchPopular}
  hasMore={hasMore}
  loader={<h4 >Loading...</h4>}
  scrollableTarget="targetscroll"
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }

>
  <div className='flex flex-wrap justify-center items-center gap-5'>
  {popular && popular.map((item ,idx) => (
    
    <Link 
  to={`/view/${Category}/${item.id}`} 
  key={idx} 
  className="w-[200px] h-[350px] bg-[#1F1E24] m-2 rounded-lg cursor-pointer flex flex-col gap-4 overflow-hidden group"
>
  <div className="relative overflow-hidden rounded-lg">
    {item.poster_path ? <img 
      src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`} 
      alt="" 
      className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
    /> : <img src='https://dummyimage.com/500x750/555/fff.png&text=No+Image`'/>}
    
    {/* Gradient Overlay for Darkening on Hover */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-lg"></div>
  </div>
  
  <h1 className="text-white text-lg text-center font-semibold transition-colors duration-300 group-hover:text-yellow-400">
    {item.title || item.original_title || item.name || item.original_name}
  </h1>
</Link>


         ))}
  </div>
   
</InfiniteScroll>}
       </div>
    </div> : <div className='flex justify-center items-center w-screen h-screen'><Spinner /></div>
  )}