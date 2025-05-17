import { tvfetch } from "../store/reducers/tvreducer";
import axiosInstance from "../axios/axios";
export const fetchDatatv =  (ID) => async (dispatch) => {
    try {
      const details= await axiosInstance.get(`/tv/${ID}`);
      const extid= await axiosInstance.get(`/tv/${ID}/external_ids`);
      const similar= await axiosInstance.get(`/tv/${ID}/similar`);
      const reviews= await axiosInstance.get(`/tv/${ID}/reviews`);
      const translations= await axiosInstance.get(`/tv/${ID}/translations`);
      const recommendations= await axiosInstance.get(`/tv/${ID}/recommendations`);
      const videos= await axiosInstance.get(`/tv/${ID}/videos`);
      const watchprovider= await axiosInstance.get(`/tv/${ID}/watch/providers`);
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
      dispatch(tvfetch(allDetails));
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };