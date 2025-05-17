import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWI1ZGQ0M2VjNzgzMzBhMThiMmMxMTRkNTM0YTU1YSIsIm5iZiI6MTc0NTExNjI1Ni4zMDQ5OTk4LCJzdWIiOiI2ODA0NWM2MDZlMWE3NjllODFlZGZmODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._HFK5vHVQajcUbCkifTMQm8KbiI_ReaNk9QuuxeMRZQ",
    Accept: "application/json",
  },
});

export default axiosInstance;
