import axios from "axios";

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://cybershop-client.onrender.com'
  : 'http://192.168.1.8:3000';   

export default axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});