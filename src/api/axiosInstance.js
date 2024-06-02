import axios from "axios";

export const baseApi = axios.create({
  baseURL: "https://jobs-api14.p.rapidapi.com",
  headers: {
    'X-RapidAPI-Key': 'f9de39c317mshf82c0abebdf8984p1db501jsn4cd865b67fe9',
    'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
  },
});
