import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const AestheticProfileCard = ({ data, title, name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-6 p-5 bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen text-white"
    >
      <button className="text-white hover:text-gray-300">
        <ArrowLeft size={30} />
      </button>

      <Card className="flex flex-col lg:flex-row w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden">
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-[300px] max-h-[400px] object-cover"
          src={`https://image.tmdb.org/t/p/w500${data.details.profile_path}`}
          alt={title || name}
        />

        <CardContent className="flex flex-col p-6 gap-4 bg-zinc-900">
          <h1 className="text-3xl font-bold text-white">{title || name}</h1>
          <p className="text-lg leading-relaxed text-gray-300">
            {data.details.biography}
          </p>

          <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
            <h2 className="font-bold text-xl mb-2">Personal Info</h2>
            <p><span className="font-medium text-gray-400">Known For:</span> {data.details.known_for_department}</p>
            <p><span className="font-medium text-gray-400">Gender:</span> {data.details.gender !== 1 ? "Male" : "Female"}</p>
            <p><span className="font-medium text-gray-400">Birthdate:</span> {data.details.birthday}</p>
            <p><span className="font-medium text-gray-400">Place of Birth:</span> {data.details.place_of_birth}</p>
            <p><span className="font-medium text-gray-400">Popularity:</span> {data.details.popularity}</p>
            {data.details.deathday && (
              <p><span className="font-medium text-gray-400">Deathday:</span> {data.details.deathday}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AestheticProfileCard;