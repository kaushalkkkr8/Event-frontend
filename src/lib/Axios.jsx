import  axios from 'axios'
const instance = axios.create({

  baseURL: 'https://event-backend-eta-one.vercel.app/', 
  // baseURL: 'https://event-backend-hztr.onrender.com/', 
  withCredentials: true,            
});

export default instance;