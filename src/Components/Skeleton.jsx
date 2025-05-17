import { useState } from 'react';
const MovieImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-20 h-28 relative bg-zinc-700 border border-zinc-600 rounded-md overflow-hidden">
      {!loaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-zinc-600 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
export default MovieImage;
