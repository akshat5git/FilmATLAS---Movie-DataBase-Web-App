import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Slidenav } from './slidenav';
import { Topnav } from './Topnav';
import axios from 'axios';
import { Header } from './Header';
import MovieCard from './Skeleton';
import { HorizontalCards } from './HorizontalCards';
import axiosInstance from '../axios/axios';
import { Spinner } from './Spinner';

const Home = () => {
  document.title = 'Homepage';
  const [menu, setmenu] = useState(true);
  const [wallpaper, setwallpaper] = useState(null);
  const [trending , settrending] = useState(null);
  const [filter, setfilter] = useState("all");
    async function fetchUpcomingMovies() {
    try {
      const {data} = await axios.get("https://api.themoviedb.org/3/movie/upcoming",{
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWI1ZGQ0M2VjNzgzMzBhMThiMmMxMTRkNTM0YTU1YSIsIm5iZiI6MTc0NTExNjI1Ni4zMDQ5OTk4LCJzdWIiOiI2ODA0NWM2MDZlMWE3NjllODFlZGZmODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._HFK5vHVQajcUbCkifTMQm8KbiI_ReaNk9QuuxeMRZQ'
        }});
        /*const videoData = await axiosInstance.get(`/movie/${ID}/videos`)*/
      const results = data.results;
     // console.log("Upcoming Movies:", results); // Log the results
      const randomIndex = Math.floor(Math.random() * results.length);
  
      if (results && results.length > 0) {
        setwallpaper(results[randomIndex]); // ✅ Final result
        //console.log("✅ Found:", results[randomIndex]);
        return;
      } else {
        console.log("❌Error: No results found.");

      }
    } catch (error) {
      console.error("API error:", error);
    }
  };
  async function fetchTrending() {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/trending/${filter}/day`,{
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWI1ZGQ0M2VjNzgzMzBhMThiMmMxMTRkNTM0YTU1YSIsIm5iZiI6MTc0NTExNjI1Ni4zMDQ5OTk4LCJzdWIiOiI2ODA0NWM2MDZlMWE3NjllODFlZGZmODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._HFK5vHVQajcUbCkifTMQm8KbiI_ReaNk9QuuxeMRZQ'
        }});

      const results = response.data.results;

  
      if (response && results.length > 0) {
        settrending(results); // ✅ Final result
        return;
      } else {
        console.log("❌Error: No results found.");

      }
    } catch (error) {
      console.error("API error:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
    fetchTrending();
  }, []);
  useEffect(() => {

    fetchTrending();
  }, [filter]);

  useEffect(() => {
    setInterval(fetchUpcomingMovies , 1000 * 10);
  }, []);
  return wallpaper && trending ? (
    <> 
    <Slidenav menu={menu} setmenu={setmenu} />
    <div className='w-[100%] overflow-hidden '>
      <Topnav menu={menu} setmenu={setmenu} />
      <div className='overflow-hidden overflow-y-auto'>
          <Header data = {wallpaper} />
      <HorizontalCards data = {trending} setfilter={setfilter} />
      </div>
    
    </div>
    </>

  ) : <div className='text-white font-bold m-auto text-center'>
    <Spinner />
  </div>
}

 


export default Home