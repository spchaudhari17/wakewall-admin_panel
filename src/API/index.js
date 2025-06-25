import axios from "axios";


const API = axios.create({
  // baseURL: "http://50.18.20.170:3000",  //live server url
  baseURL: "http://54.176.15.46:3000",  // testing
  // baseURL: "http://localhost:3000", 
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
