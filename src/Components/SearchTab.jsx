import { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchBox } from './SearchBox';

export const SearchTab = ({category,placeholder}) => {
  const [inputval, setinputval] = useState("");
  const [Search, setSearch] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${category}`, {
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
      console.log(response.data);
      
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
    <>
      <SearchBox category={category} setinputval={setinputval} Search={Search} setSearch ={setSearch}  inputval={inputval} placeholder={placeholder} />
    </>
  );
};

