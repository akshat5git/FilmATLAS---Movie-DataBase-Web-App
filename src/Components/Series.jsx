import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from './dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { Spinner } from './Spinner';
import { SearchTab } from './SearchTab';

export const Series = () => {
    const nav = useNavigate();
      document.title = 'Series' ;
     const [Category, setCategory] = useState('airing_today');
     const [Series, setSeries] = useState([]);
     const [hasMore, setHasMore] = useState(true);
     const [page, setpage] = useState(1)
     async function fetchSeries() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${Category}`, {
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
          setSeries((prev) => [...prev, ...results]);
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
        if( Series.length == 0) {
          fetchSeries();
        }
        else {
          setpage(1);
          setSeries([]);
          fetchSeries();
        }};
      useEffect(() => {
       refreshHandler();
      } , [Category]);
  
    return (
      Series.length >0 ?
      <div className='w-full h-[100vh] bg-[#1F1E24]'>
        <div className='w-full h-[70px] bg-[#1F1E24] flex justify-between items-center px-3'>
         <div className='text-white text-2xl font-bold p-6 flex items-center ' >
             <div> <i className="ri-arrow-left-line  cursor-pointer" onClick={() => nav(-1)}></i> &nbsp;Popular</div>
             <SearchTab category="tv" placeholder="Search TV series and web shows..." />       
          </div>
         <div >
          <Dropdown title={"Category"} options={["airing_today","on_the_air","top_rated","popular"]} onclick={setCategory} />
          </div>
          </div>
          <div id='targetscroll' className=' h-[89vh] w-full overflow-y-auto'>
           {Series && <InfiniteScroll
    dataLength={Series.length} //This is important field to render the next data
    next={fetchSeries}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    scrollableTarget="targetscroll"
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
  
  >
    <div className='flex flex-wrap justify-center items-center gap-5'>
    {Series && Series.map((item ,idx) => (
      
     <Link 
  to={`/view/tv/${item.id}`} 
  key={idx} 
  className="w-[200px] h-[400px] m-2 mb-0 rounded-lg cursor-pointer flex flex-col group relative overflow-hidden"
>
  <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
    <img 
      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
      alt="" 
      className="w-full h-full rounded-lg transition-transform duration-300 transform group-hover:scale-105"
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-lg"></div>
  </div>
  
  <h1 
    className="text-white text-lg text-center font-semibold m-auto flex justify-center items-center transition-colors duration-300 group-hover:text-yellow-400"
  >
    {item.name || item.original_name}
  </h1>
</Link>

           ))}
    </div>
     
  </InfiniteScroll>}
         </div>
      </div> : <div className='flex justify-center items-center w-screen h-screen'><Spinner /></div>
    )}

