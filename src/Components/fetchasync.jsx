import { moviefetch } from "../store/reducers/moviereducer";
import axiosInstance from "../axios/axios";
export const fetchDatamovie =  (ID) => async (dispatch) => {
    try {
      const details= await axiosInstance.get(`/movie/${ID}`);
      const extid= await axiosInstance.get(`/movie/${ID}/external_ids`);
      const similar= await axiosInstance.get(`/movie/${ID}/similar`);
      const reviews= await axiosInstance.get(`/movie/${ID}/reviews`);
     const translations= await axiosInstance.get(`/movie/${ID}/translations`);
      const recommendations= await axiosInstance.get(`/movie/${ID}/recommendations`);
      const videos= await axiosInstance.get(`/movie/${ID}/videos`);
      const watchprovider= await axiosInstance.get(`/movie/${ID}/watch/providers`);
      const allDetails = {
          details : details.data,
          extid : extid.data,
          similar : similar.data,
          reviews : reviews.data,
            translations : translations.data,
          recommendations : recommendations.data,
          videos : videos.data.results.find((item) => item.type === "Trailer"),
          watchprovider : watchprovider.data,
      };
      console.log(allDetails);
      dispatch(moviefetch(allDetails));
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };