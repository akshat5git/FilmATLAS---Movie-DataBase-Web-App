import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Spinner } from './Spinner';

export const Trailer = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const category = useLocation().pathname.split('/')[2];
    const data = useSelector((state) => state[category].info.videos);
  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black'>
       <i onClick={()=>(navigate(-1))} class="ri-close-line absolute top-10 left-10 text-3xl z-[10] cursor-pointer"></i>
       {loading && data ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <Spinner /> {/* Your spinner or loading text */}
          <p className="text-white ml-2">Loading...</p>
        </div>) : null }
        {data && data.type === 'Trailer' ? <ReactPlayer controls={true} onReady={()=>setloading(false)} height={600} width={1200} url={`https://www.youtube.com/watch?v=${data.key}`} /> : <div className='text-center font-bold text-3xl'>Trailer Not Available</div>}
    </div>
  )
}
