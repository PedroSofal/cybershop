import axios from 'axios';

const storeAPI = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const dbAPI = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://cybershop-server.onrender.com'
    : 'http://192.168.1.8:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
});

export { storeAPI, dbAPI }