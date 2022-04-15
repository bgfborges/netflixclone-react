import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: process.env.REACT_APP_TMDB_API_BASE
});

export { tmdbApi };