import axios from "axios";

export default axios.create({
  baseURL: 'https://cybershop-server.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});