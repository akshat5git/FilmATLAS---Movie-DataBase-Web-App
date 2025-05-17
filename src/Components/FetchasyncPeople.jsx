
import { peoplefetch } from "../store/reducers/peoplereducer";
import axiosInstance from "../axios/axios";
export const fetchasyncPeople =  (ID) => async (dispatch) => {
    try {
      const details= await axiosInstance.get(`/person/${ID}`);
      const combinedcredit= await axiosInstance.get(`/person/${ID}/combined_credits`);
      const extid= await axiosInstance.get(`/person/${ID}/external_ids`);
      const moviecredit= await axiosInstance.get(`/person/${ID}/movie_credits`);
      const tvcredit= await axiosInstance.get(`/person/${ID}/tv_credits`);
      const images= await axiosInstance.get(`/person/${ID}/images`);
      const allDetails = {
          details : details.data,
          extid : extid.data,
          combinedcredit : combinedcredit.data,
          moviecredit : moviecredit.data,
            tvcredit : tvcredit.data,
          images : images.data,
      };
      console.log(allDetails);
      dispatch(peoplefetch(allDetails));
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };
