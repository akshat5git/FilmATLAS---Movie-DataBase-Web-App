import { original } from '@reduxjs/toolkit'
import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown } from './dropdown'

export const Horizontaldefault = ( {data}) => {
  return (
    <div className='w-full '>
        <div className='flex gap-6 px-0 overflow-x-auto scrollbar-hide'>
        {data.map((item ,idx) => ( <Link 
  key={idx} 
  to={`/view/${item.media_type}/${item.id}`}
  className="group block"
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
    className="text-center py-4 font-bold text-lg transition-colors duration-300 group-hover:text-yellow-400"
  >
    {item.name || item.original_name || item.title || item.original_title}
  </h1>
</Link>

            
        ))}
        </div>
        </div>

  )
}
