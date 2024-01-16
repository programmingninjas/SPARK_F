import axios from 'axios';

const API = axios.create({
    baseURL:"https://spark-f.vercel.app/api/",
    timeout:10000
})

export default API;
