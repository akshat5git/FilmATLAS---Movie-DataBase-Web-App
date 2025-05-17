import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const BGAnimatedCard = ({ data, movieDetails }) => {
  return (
    <motion.div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPositionX: "center",
      }}
      animate={{
        backgroundPositionY: ["0%", "80%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
      className="w-full mt-[px] h-[400px] flex flex-col justify-end gap-[13px] p-[50px] relative transition-all duration-500 ease-in-out hover:shadow-2xl"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    <div className="absolute z-2 bottom-10 right-6 text-white text-6xl font-extrabold opacity-[50%] mix-blend-overlay flex items-center select-none" style={{ filter: "grayscale(100%) contrast(150%)" }}>
        <h1 className="tracking-widest">UPCOMING's <i className="ri-arrow-right-line text-white text-[9vh]"></i></h1>
      </div>
      <div className="relative z-1">
        <Link to={`/view/movie/${data.id}`} className="block">
          <h1 className="text-white text-4xl font-bold mb-2">
            {data.title || data.original_title || data.original_name || data.name}
          </h1>
        </Link>

        <p className="w-[70%] text-white text-sm mb-4">
          {data.overview.slice(0, 150)}...
          <Link to={`/view/movie/${data.id}`} className="text-blue-400 ml-1">
            more
          </Link>
        </p>

        {/* Movie Info */}
        <div className="flex flex-wrap gap-4 text-white mb-4">
          <span className="flex items-center gap-1">
            <i className="ri-calendar-2-fill text-yellow-300"></i>
            {data.release_date}
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-time-fill text-yellow-300"></i>
            {movieDetails?.runtime} min
          </span>
          {movieDetails?.vote_average > 0 ? (
            <span className="flex items-center gap-1">
              <i className="ri-star-fill text-yellow-300"></i>
              {Math.floor(movieDetails?.vote_average)}/10
            </span>
          ) : null}
          <span className="flex items-center gap-1">
            <i className="ri-album-fill text-yellow-300"></i>
            {data.original_language?.toUpperCase()}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            to={`/view/movie/${data.id}/Trailer`}
            className="bg-[#6556CD] text-sm text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-[#4a47a3]"
          >
            <i className="ri-play-fill mr-1"></i> Watch Trailer
          </Link>
          <Link
            to={`/view/movie/${data.id}`}
            className="bg-zinc-800 text-sm text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-zinc-700"
          >
            <i className="ri-information-fill mr-1"></i> More Info
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

