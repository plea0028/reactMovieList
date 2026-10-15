const API_KEY = "d4d3fb1becc68dbe90ba4901d206d4bd"; // unique API key variable
const BASE_URL = "https://api.themoviedb.org/3"; // baseURL variable

export const getPopularMovies = async() => { // popular movies fetch handler (async so it can await the API fetch)
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`); // response object that fetches the movies
    const data = await response.json(); // variable that awaits the response of the API and converts it to json

    return data.results; // returns the results to the data variable
}

export const searchMovies = async(query) => { // search movies handler (async so it can await the API fetch) that passes the users text entered as "query"
    const response = await fetch( // variable named response that sends HTTP request to url and pauses the async function until request finishes
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent( // `` allow JS to insert variables into string, tells TMDB to search for the movie and converting the user's search text into UR:-compatible text
            query // the text entered by the user
        )}`
    );
    const data = await response.json(); // variable that awaits the response of the API and converts it to json

    return data.results; // returns the results to the data variable
}