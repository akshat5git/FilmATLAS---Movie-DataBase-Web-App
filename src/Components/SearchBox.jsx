import MovieImage from './Skeleton';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from './Spinner';

export const SearchBox = ({ category, setinputval, setSearch, Search, inputval, placeholder }) => {
  return (
    <div className='relative left-[6.5%]'>
      <div className='flex pl-[20vw] gap-[40px] items-center max-h-[300px] h-[9vh] bg-[#1F1E24] border-zinc-700'>
        <i className='text-[20px] mt-3 text-white font-bold ri-search-2-line'></i>
        <input
          onChange={(e) => {setinputval(e.target.value);
            setSearch(null)}
          }
          className='mt-2 w-[30vw] font-normal text-lg border-white p-2 bg-transparent text-white transition-all duration-200 focus:outline-none focus:border-b-2 focus:border-blue-500'
          type='text'
          placeholder={placeholder}
          value={inputval}
        />
        {inputval ? (
          <i onClick={() => setinputval("")} className='text-[20px] text-white font-bold ri-close-fill cursor-pointer transition-transform duration-200 hover:scale-110'></i>
        ) : null}
      </div>

      <AnimatePresence>
        {inputval !== "" && 
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='absolute z-10 top-[9.5vh] left-[20vw] bg-[#2c2c30] w-[38vw] max-h-[58vh] m-auto overflow-auto text-white shadow-lg rounded-lg'
          >
          {!Search ? (
              <div className="flex justify-center items-center py-4">
                <Spinner size={50} />
              </div>
            ) : Search.results.length > 0 ? (
              Search.results.map((el, index) => (
                <SearchItem category={category} key={index} el={el} />
              ))
            ) : (
              <div className='flex justify-center items-center font-semibold my-3 text-lg'>No Results Found</div>
            )}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  );
};

const SearchItem = ({ el, category }) => {
  if(category == "multi"){
    category = el.media_type
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        to={`/view/${category}/${el.id}/`}
        className='relative flex items-center gap-4 p-2 px-4 bg-zinc-800 rounded-lg shadow-md hover:bg-zinc-700 transition duration-200'
      >
        <MovieImage
          src={el.poster_path || el.profile_path ? `https://image.tmdb.org/t/p/w500${el.poster_path || el.profile_path}` : `https://dummyimage.com/500x750/555/fff.png&text=No+Image`}
          alt={el.title || el.original_title || el.original_name || el.name}
          className='w-12 h-16 object-cover rounded-md transition-transform duration-200 hover:scale-105'
        />
        <div>
          <h1 className='text-white text-lg font-semibold'>{el.title || el.original_title || el.original_name || el.name}</h1>
          {el.release_date && (
            <p className='text-gray-400 text-sm'>({el.release_date.split("-")[0]})</p>
          )}
        </div>
        <p className='text-gray-400 text-sm absolute right-9 top-1/2 transform -translate-y-1/2'>
          {el.media_type === "movie" ? "Movie" : el.media_type === "tv" ? "TV Show" : el.media_type === "person" ? "Person" : ""}
        </p>
      </Link>
    </motion.div>
  );
};
