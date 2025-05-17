import { original } from '@reduxjs/toolkit'
import React, { use, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from './dropdown'

export const HorizontalCards = ( {data ,setfilter}) => {
  let ref = useRef(null);
  const [scrollReset, setscrollReset] = useState(false);
   function sliding() {
    if (ref.current) {
      setscrollReset(true);
      ref.current.scrollBy({
        left: 200, // Adjust this value for how much to scroll
        behavior: "smooth" // Smooth scrolling
      });
    }
  }
  function resetScroll() {
    setscrollReset(false);
    if (ref.current) {
      ref.current.scrollTo({
        left: 0, // Reset to the starting position
        behavior: "smooth"
      });
    }
  }
  return (
    <div className='w-full h-[40vh] relative '>
      <div className='flex justify-between items-center py-0 px-7'>
      <h1 className='px-4 py-[20px] text-2xl font-semibold text-zinc-400'>Trending</h1>
      <Dropdown title="Filter" options={["tv","movie","all"]} onclick={setfilter} />
      </div>
      <i onClick={sliding} className="ri-arrow-right-line text-white font-bold text-center w-11 h-11 absolute right-8 bottom-[55px] bg-black py-2 pt-[7px] text-[20px] rounded-full cursor-pointer"></i>
     {scrollReset ? <i onClick={resetScroll} className="ri-arrow-left-line text-white font-bold text-center w-11 h-11 absolute left-8 bottom-[55px] bg-black py-2 pt-[7px] text-[20px] rounded-full cursor-pointer"></i> : null}
        <div ref={ref} style={{ scrollBehavior: "smooth" }} className='flex gap-6 px-6 pt-2 overflow-x-auto scrollbar-hide'>
        {data.map((item ,idx) => ( <Link 
  className="group" 
  key={idx} 
  to={`/view/${item.media_type}/${item.id}`}
>
  <div 
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} 
    className="w-[180px] h-[250px] bg-white transition-transform duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:brightness-90 rounded-lg"
  ></div>
  <h1 
    className="text-white text-lg font-bold text-center py-4 transition-colors duration-300 group-hover:text-yellow-400"
  >
    {item.title || item.original_title || item.name}
  </h1>
</Link>
        ))}
        
        </div>
        <div className='w-10 h-10'></div>
        </div>

  )
}
