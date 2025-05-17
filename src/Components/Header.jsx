import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axios';
import { moviefetch, moviefetchreset } from '../store/reducers/moviereducer';
import { useDispatch } from 'react-redux';
import 'remixicon/fonts/remixicon.css';
import { Spinner } from './Spinner';
import { BGAnimatedCard } from './framer-bg';

export const Header = ({ data }) => {
  const [videoData, setVideoData] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const dispatch = useDispatch();

  // 🔄 Fetch Video Data
  async function fetchVideoData() {
    const response = await axiosInstance.get(`/movie/${data.id}/videos`);
    setVideoData(response.data);
  }

  // 🔄 Fetch Movie Details (Genre, Runtime, Vote Average, etc.)
  async function fetchMovieDetails() {
    const response = await axiosInstance.get(`/movie/${data.id}`);
    setMovieDetails(response.data);
  }

  // 🔄 UseEffect to Fetch Data
  useEffect(() => {
    if (data) {
      fetchVideoData();
      fetchMovieDetails();
    }
  }, [data]);

  // 🔄 Dispatch to Redux
  useEffect(() => {
    if (videoData) {
      dispatch(moviefetch(videoData));
    }
    return () => dispatch(moviefetchreset());
  }, [videoData, dispatch]);

  // 🛑 Loading State
  if (!data) {
    return (
      <div className='w-full h-[300px] bg-[#1F1E24] flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <Link
      to={`/view/movie/${data.id}`}
      >
        <BGAnimatedCard data={data} movieDetails={movieDetails} />
    </Link>
  );
};
