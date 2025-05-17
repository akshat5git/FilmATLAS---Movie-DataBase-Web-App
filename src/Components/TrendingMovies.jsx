import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { fetchDatamovie } from './fetchasync';
import { moviefetchreset } from '../store/reducers/moviereducer';
import { Horizontaldefault } from './horizontaldefault';
import { Spinner } from './Spinner';
const TrendingMovies = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    if (!ID) return;
    dispatch(fetchDatamovie(ID));
    return () => {
        dispatch(moviefetchreset())
    }
  }, [ID]);
   let data = useSelector((state) => state.movie.info)

  if (!data || !data.details) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-zinc-900 text-white">
        <Spinner />
      </div>
    );
  }

  const {
    poster_path,
    title,
    original_title,
    name,
    original_name,
    overview,
  } = data.details;

  return (
<div
  className={` relative text-white min-h-screen overflow-hidden transition-all duration-1000 ease-out`}
  style={{
    backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
        backgroundPositionX: '0px',
    backgroundPositionY: '-500px',
   
  }}
>
    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
<div className='h-screen w-screen backdrop-blur-md overflow-y-auto'>
    <i
        onClick={() => navigate(-1)}
        className="ri-arrow-left-line absolute left-10 top-6 text-white text-2xl font-bold cursor-pointer"
      ></i>
     <div className='flex gap-7 justify-end py-5 px-10 text-lg font-bold'>
      <a target='_blank' href={`https://www.imdb.com/title/${data.extid.imdb_id}/`}>IMDB</a>
        <a target='_blank' href={`https://www.wikidata.org/wiki/${data.extid.wikidata_id}`}><i class="ri-global-line"></i></a>
        <a target='_blank' href={`https://x.com/${data.extid.twitter_id}`}><i class="ri-twitter-x-line"></i></a>
      </div>
      
      <div className='flex ml-[24vw] gap-[8vh] pt-5'>
      <img
            className="w-[260px] max-h-[390px] rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title || name}
          />
          <div className=' flex flex-col gap-y-4 font-bold max-w-[35vw]'> <h1 className='font-extrabold text-5xl '>{original_title || original_name || name} ({data.details.release_date.split('-')[0]})</h1>
          <div><span>{data.details.status}</span> -&nbsp;&nbsp;<span>{data.details.runtime >60 ? `${Math.floor(data.details.runtime/60)}h ${data.details.runtime%60}m `: data.details.runtime}</span> 
          </div>
          <div className='text-yellow-300 text-xl'><h1 className='text-white'>Rating</h1>
             {data.details.vote_average} <i class="ri-star-fill text-[20px]"></i> &nbsp; &nbsp;
          </div>
          <h2>{data.details.genres.map(el=><span className='border border-white rounded-md px-1 mr-2'>{el.name}</span>)}</h2>
          <h1><i class="ri-album-fill"></i> {data.translations.translations.map(el=>el.english_name).join(' , ').slice(0,100)}<span className='text-blue-400'>...more</span></h1>
            <h2 className=' font-medium max-h-[16vh] overflow-auto w-[35vw] text-lg'>{overview}</h2>
       
          </div>
          
      </div>
      <div className='flex mx-[23vw] my-6'>
      <div className='flex flex-col w-[17vw] my-[5vh] gap-2 mx-[2vw] text-lg font-semibold'>
      <h1 className='flex items-center gap-3'>Buy on -  
  {data.watchprovider?.results?.IN?.buy?.length > 0 
    ? data.watchprovider.results.IN.buy.map((el, index) => (
        <img 
          key={index}
          title={el.provider_name}
          src={`https://image.tmdb.org/t/p/original${el.logo_path}`} 
          alt={el.provider_name}
          className="w-[40px] border rounded-full hover:scale-105 transition-transform" 
        />
      ))
    : <span className="text-gray-400">Not available</span>
  }
</h1>

<h1 className='flex items-center gap-3'>Streaming On - 
  {data.watchprovider?.results?.IN?.flatrate?.length > 0 
    ? data.watchprovider.results.IN.flatrate.map((el, index) => (
        <a key={index} target='_blank' rel="noopener noreferrer" href={data.watchprovider.results.IN.link}>
          <img 
            title={el.provider_name}
            className='w-[40px] border rounded-full hover:scale-105 transition-transform' 
            src={`https://image.tmdb.org/t/p/original${el.logo_path}`} 
            alt={el.provider_name}
          />
        </a>
      ))
    : <span className="text-gray-400">Not available</span>
  }
</h1>

<h1 className='flex items-center gap-3'>Rent on -  
  {data.watchprovider?.results?.IN?.rent?.length > 0 
    ? data.watchprovider.results.IN.rent.map((el, index) => (
        <img 
          key={index}
          title={el.provider_name}
          src={`https://image.tmdb.org/t/p/original${el.logo_path}`} 
          alt={el.provider_name}
          className="w-[40px] border rounded-full hover:scale-105 transition-transform"
        />
      ))
    : <span className="text-gray-400">Not available</span>
  }
</h1>
</div>
      <div> <div className='my-[50px] mx-[1vw]' ><Link to={`/view/movie/${ID}/Trailer`} className='h-fit px-5 py-4 text-center rounded-lg  font-semibold bg-purple-600 '>{data.videos && data.videos.type == "Trailer" ? <span><i class="ri-play-fill"></i> Watch Trailer</span> : <span>Trailer Not Available</span> }</Link></div>
        </div>
        </div>
        <div className='mx-[10vw] my-10'>
          <div className='flex justify-between'><h1 className='text-3xl font-bold mb-[50px]'>Similar & Recommended Movies</h1><i class="ri-arrow-right-line text-3xl font-bold"></i></div>
         {data.similar.results.length > 0 || data.recommendations.results.length >0 ? <Horizontaldefault data={data.recommendations.results} /> : <Horizontaldefault data={data.similar.results} />}
        </div>
        <Outlet/>
      </div>
      </div>
    
  );
};

export default TrendingMovies;
