import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useSelector ,useDispatch } from 'react-redux';
import { moviefetchreset } from '../store/reducers/moviereducer';
import { Horizontaldefault } from './horizontaldefault';
import { Spinner } from './Spinner';
import { fetchasyncPeople } from './FetchasyncPeople';
import { peoplefetchreset } from '../store/reducers/peoplereducer';
import { Dropdown } from './dropdown';
const Persondeatils = () => {
  const [Category, setCategory] = useState('combined');
  const { ID } = useParams();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    if (!ID) return;
    dispatch(fetchasyncPeople(ID));
    return () => {
        dispatch(peoplefetchreset())
    }
  }, [ID]);
   let data = useSelector((state) => state.people.info)
   
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
    console.log(data);

  return (
<div
  className={` relative text-white min-h-screen overflow-hidden`}
  style={{
    backgroundImage: `url(https://image.tmdb.org/t/p/w500${data.details.profile_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
        backgroundPositionX: '0px',
    backgroundPositionY: '-500px',
   
  }}
>
    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-70'></div>
<div className='h-screen w-screen backdrop-blur-md overflow-y-auto'>
    <i
        onClick={() => navigate(-1)}
        className="ri-arrow-left-line absolute left-10 top-6 text-white text-2xl font-bold cursor-pointer"
      ></i>
     <div className='flex gap-10 justify-end py-5 px-10 text-lg font-semibold'>
      <a target='_blank' href={`https://www.imdb.com/title/${data.extid.imdb_id}/`}>IMDB</a>
        <a target='_blank' href={`https://www.wikidata.org/wiki/${data.extid.wikidata_id}`}><i class="ri-global-line"></i></a>
        {data.extid.twitter_id ? <a target='_blank' href={`https://x.com/${data.extid.twitter_id}`}><i class="ri-twitter-x-line"></i></a> : <a target='_blank' href={`https://x.com/${data.extid.instagram_id}`}><i class="ri-instagram-line"></i></a>}
      </div>
      
      <div className='flex ml-[6vw] gap-[3vw] pt-3'>
      <div>
        <img
            className="w-[200px] max-h-[280px] rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${data.details.profile_path}`}
            alt={title || name}
          />
          <hr className='my-4 mt-7' />
          <div className='flex flex-col justify-center gap-y-2 text-lg font-light'>
            <h1 className='font-bold text-2xl'>Persoanl Info -</h1>
            {data.details.known_for_department ?<p>Known For - {data.details.known_for_department}</p> :null}
            {data.details.popularity ?<p>Popularity - {data.details.popularity}</p> :null}
           {data.details.gender? <p>Gender - {data.details.gender !=1 ? "Male" : "Female"}</p> :null}
           {data.details.birthday ?<p>Birthdate - {data.details.birthday}</p> : null}
            {data.details.place_of_birth ?<p className='w-[13vw]'>Place of Birth - <br/> {data.details.place_of_birth}</p>:null}
            
            
            {data.details.Deathday ? <p>Deathday :- {data.details.deathday}</p> :null}
            
          </div>
          
              </div>
      
          <div className=' flex flex-col gap-y-8 font-bold max-w-[45vw]'>
            
            <h1 className='min-w-[46vw] max-w-[46vw] font-extrabold text-5xl '>{original_title || original_name || name}</h1>
            {data.details.biography ? <div className='flex flex-col'><span className='mx-1 pb-2 font-semibold'>Biography -</span>
                 <h1 className='max-h-[25vh] rounded-md bg-stone-800 font-thin text-lg overflow-auto px-2 py-1 w-[46vw]'>{data.details.biography}</h1>
            </div>:null}
           
        
       
          </div>
          <div className=' w-[25vw] ml-[25px] flex flex-col gap-y-4 rounded-md bg-stone-800'> 
            <div >
               <div className='flex justify-between items-center mx-1 border-b-2 h-[8vh]'> <h1 className='font-bold text- ml-4 w-[15vw]'>🎭 Character Roles</h1>
              <Dropdown title={"Category"} options={["movie","tv"]} onclick={setCategory} />
               </div>
               <div className='overflow-auto h-[75vh] pt-1'>
                {data[Category+"credit"].cast.map((c,index) =>
                <Link to={`/view/movie/${c.id}`} className='flex gap-3 items-center mx-4 my-2 hover:bg-stone-700 rounded-md' key={index}>
                <img
  className="w-[50px] h-[70px] rounded-md object-cover shadow-sm"
  src={
    c.poster_path
      ? `https://image.tmdb.org/t/p/w500${c.poster_path}`
      : "https://dummyimage.com/50x70/555/fff.png&text=No+Image"
  }
  alt={c.title || c.name}
/>
                <div className='flex flex-col'>
                    <h1 className='font-semibold'>{c.title || c.name}</h1>
                    <p className='text-sm font-thin'>{c.character}</p>
                </div>
                </Link>
              
                )}
               </div>
               
            </div>
          </div>
          
      </div>
      <div className='flex mx-[23vw] my-6'>
      <div className='flex flex-col w-[17vw] my-[5vh] gap-2 mx-[2vw] text-lg font-semibold'>
   
        <Outlet/>
      </div>
      </div>
       </div>
        </div>

  );
};

export default Persondeatils;
