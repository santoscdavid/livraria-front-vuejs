import Axios from 'axios';

export const http = Axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    JSON: true
});

// http://localhost:5000/api/v1/
