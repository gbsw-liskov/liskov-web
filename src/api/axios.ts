import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_SPRING_API,
  withCredentials: true,
}); 

export default API;