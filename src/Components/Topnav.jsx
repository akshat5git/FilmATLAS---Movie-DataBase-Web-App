import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchBox } from './SearchBox';

export const Topnav = ({menu,setmenu}) => {
  const [inputval, setinputval] = useState("");
  const [Search, setSearch] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/search/multi", {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWI1ZGQ0M2VjNzgzMzBhMThiMmMxMTRkNTM0YTU1YSIsIm5iZiI6MTc0NTExNjI1Ni4zMDQ5OTk4LCJzdWIiOiI2ODA0NWM2MDZlMWE3NjllODFlZGZmODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._HFK5vHVQajcUbCkifTMQm8KbiI_ReaNk9QuuxeMRZQ'
        },
        params: {
          query: inputval,
          page: 1,
          include_adult: false
        }
      });
      setSearch(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
   const fetchDebounce = setTimeout(() => {
    if (inputval) {
      fetchData();
    }},500);
    return () => clearTimeout(fetchDebounce);
  }, [inputval]);

  return (
    <div className='flex items-center w-full pb-1 border-b-[2px] border-[#404042] '>
      {!menu ? <i onClick={()=>setmenu(true)} className="ri-menu-line text-lg cursor-pointer text-white mx-[40px] pt-3"></i> : null}
      <SearchBox setSearch={setSearch} category="multi" placeholder="Search across movies, series, people, and more..." setinputval={setinputval} Search={Search} inputval={inputval} />
    </div>
  );
};

