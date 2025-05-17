import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { tvfetchreset } from '../store/reducers/tvreducer';
import { fetchDatatv } from './fetchasyncTV';
import { HorizontalCards } from './HorizontalCards';
import { Horizontaldefault } from './horizontaldefault';
import { Spinner } from './Spinner';

export const TrendingSeries = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!ID) return;
    dispatch(fetchDatatv(ID));
    return () => {
      dispatch(tvfetchreset());
    };
  }, [ID]);

  const data = useSelector((state) => state.tv.info);

  if (!data || !data.details) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-zinc-900 text-white">
       <Spinner />
      </div>
    );
  }

  // Destructuring with proper fallback values
  const {
    poster_path,
    original_title,
    original_name,
    name,
    genres = [],
    status,
    overview,
    first_air_date,
    vote_average,
    episode_run_time = [],
    tagline,
  } = data.details;

  // Calculating runtime
  const formattedRuntime = episode_run_time.length > 0
    ? `${Math.floor(episode_run_time[0] / 60)}h ${episode_run_time[0] % 60}m`
    : 'N/A';

  // Background styling
  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundPositionX: '0px',
    backgroundPositionY: '-500px',
  };

  return (
    <div className="text-white min-h-screen" style={backgroundStyle}>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      <div className="h-screen w-screen backdrop-blur-md relative overflow-y-auto">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line absolute left-10 top-6 text-white text-2xl font-bold cursor-pointer"
        ></i>

        <div className="flex gap-7 justify-end py-5 px-10 text-lg font-bold">
          <a target='_blank' href={`https://www.imdb.com/title/${data.extid.imdb_id}/`}>IMDB</a>
          <a target='_blank' href={`https://www.wikidata.org/wiki/${data.extid.wikidata_id}`}>
            <i className="ri-global-line"></i>
          </a>
          <a target='_blank' href={`https://x.com/${data.extid.twitter_id}`}>
            <i className="ri-twitter-x-line"></i>
          </a>
        </div>
<div>
        <div className="flex ml-[24vw] gap-[8vh] pt-5 max-h-[400px]">
          <img
            className="w-[260px] max-h-[390px] rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={original_title || original_name || name}
          />
          <div className="flex flex-col gap-y-4 font-bold max-w-[38vw]">
            <h1 className="font-extrabold text-5xl">
              {original_title || original_name || name} ({first_air_date?.split('-')[0] || 'N/A'})
            </h1>
            <div>
              <span>{status}</span> -&nbsp;&nbsp;<span>{formattedRuntime}</span>
            </div>
            <div className="text-yellow-300 text-xl">
              <h1 className="text-white">Rating</h1>
              {vote_average} <i className="ri-star-fill text-[20px]"></i>
            </div>
            <h2>
              {genres.length > 0 
                ? genres.map((el, idx) => (
                    <span key={idx} className="border border-white rounded-md px-1 mr-2">
                      {el.name}
                    </span>
                  ))
                : 'No genres available'}
            </h2>
            <h1>
              <i className="ri-album-fill"></i>
              {data.translations.translations
                .map((el) => el.english_name)
                .join(' , ')
                .slice(0, 100)}
              <span className="text-blue-400">...more</span>
            </h1>
            <h2 className="font-medium max-h-[16vh] overflow-auto w-[35vw] text-lg">
              {overview}
            </h2>
          </div>
        </div>

        {/* Watch Providers */}
        <div className='flex mx-[25vw] gap-9 '>
        <div className="flex flex-col my-[5vh] gap-2  text-lg font-semibold">
          {["buy", "flatrate", "rent"].map((type) => (
            <h1 key={type} className="flex items-center gap-3">
              {type.charAt(0).toUpperCase() + type.slice(1)} on - 
              {data.watchprovider?.results?.IN?.[type]?.length > 0 ? (
                data.watchprovider.results.IN[type].map((el, index) => (
                  <img
                    key={index}
                    title={el.provider_name}
                    src={`https://image.tmdb.org/t/p/original${el.logo_path}`}
                    alt={el.provider_name}
                    className="w-[40px] border rounded-full hover:scale-105 transition-transform"
                  />
                ))
              ) : (
                <span className="text-gray-400">Not available</span>
              )}
            </h1>
          ))}
        </div>
       <div className='my-[50px] mx-[3vw]' ><Link to={`/view/tv/${ID}/Trailer`} className='h-fit px-5 py-4 text-center rounded-lg  font-semibold bg-purple-600 '>{data.videos && data.videos.type == "Trailer" ? <span><i class="ri-play-fill"></i> Watch Trailer</span> : <span>Trailer Not Available</span> }</Link></div>
               </div>
        <div className='mx-[10vw] my-10'>
          <div className='flex justify-between'><h1 className='text-3xl font-bold mb-[50px]'>Similar & Recommended Shows</h1><i class="ri-arrow-right-line text-3xl font-bold"></i></div>
         {data.similar.results.length > 0 || data.recommendations.results.length >0 ? <Horizontaldefault data={data.recommendations.results} /> : <Horizontaldefault data={data.similar.results} />}
        </div>
        <Outlet/>
        </div>
      </div>
    </div>
  );
};
