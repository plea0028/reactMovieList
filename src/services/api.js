const API_KEY = "d4d3fb1becc68dbe90ba4901d206d4bd";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async() => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();

    return data.results;
}

export const searchMovies = async() => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`
    );
    const data = await response.json();

    return data.results;
}