import axios from 'axios';

const ISLOCAL = process.env.NODE_ENV === 'development';
const VERCEL_URL = process.env.VERCEL_URL;

const BASE_URL = ISLOCAL 
  ? 'http://localhost:8080/api' 
  : `https://${VERCEL_URL}/api`;

export const BASE_URL2 = ISLOCAL 
  ? 'http://localhost:8080/api' 
  : 'https://cougarecho-4.uc.r.appspot.com/api';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});