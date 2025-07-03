import  axios from 'axios'
const instance = axios.create({
  // baseURL: 'http://localhost:5000/', 
  baseURL: 'https://event-backend-eta-one.vercel.app/', 
  withCredentials: true,            
});

export default instance;