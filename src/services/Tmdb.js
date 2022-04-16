import { tmdbApi } from './tmdbApi';

/*
* NETFLIX ORIGINALS,
* RECOMENDEDS
* TOP RATED (TRENDING)
* ACTION
* COMEDY
* HORROR
* ROMANCE
* DOCUMENTARIES
*/

const basicFatch = async (endpoint, genre = '') => {
    const { data } = await tmdbApi.get(endpoint + 'language=en-US&api_key=' + process.env.REACT_APP_TMDB_API_KEY + genre);
    return data;
}

export const Tmdb = {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Netflix Originals',
                items: await basicFatch('/discover/tv?with_networks=213&')
            },
            {
                slug: 'trending',
                title: 'For You',
                items: await basicFatch('/trending/all/week?')
            },
            {
                slug: 'toprated',
                title: 'Top Rated',
                items: await basicFatch('/movie/top_rated?')
            },
            {
                slug: 'action',
                title: 'Action',
                items: await basicFatch('/discover/tv?', '&with_genres=10759')
            },
            {
                slug: 'comedy',
                title: 'Comedy',
                items: await basicFatch('/discover/tv?', '&with_genres=35')
            },
            {
                slug: 'horror',
                title: 'Crime',
                items: await basicFatch('/discover/tv?', '&with_genres=80')
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFatch('/discover/tv?', '&with_genres=10749')
            },
            {
                slug: 'documentary',
                title: 'Documentary',
                items: await basicFatch('/discover/tv?', '&with_genres=99')
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if(movieId && type) {
            switch(type) {
                case 'movie':
                    info = await basicFatch(`/movie/${movieId}?`);
                break;
                case 'tv':
                    info = await basicFatch(`/tv/${movieId}?`);
                break;
                default:
                    info = null
            }
        }
        return info;
    }
}