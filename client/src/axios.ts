import axios from 'axios';

const API = axios.create({
    baseURL:"https://hom-backend.vercel.app/api/",
    timeout:10000
})

export default API;
