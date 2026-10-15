import MovieCard from "../components/MovieCard" // imports the MovieCard component
import { useState, useEffect } from "react" // imports useState and useEffect
import { searchMovies, getPopularMovies } from "../services/api" // imports searchMovies and getPopularMovies
import "../css/Home.css" // imports the home page's css

function Home() { // home page
    const [ searchQuery, setSearchQuery ] = useState(""); //  stores the current search text and provides a function to update it
    const [ movies, setMovies ] = useState([]); // stores the movie displayed on the page and provides a function to update them
    const [ error, setError ] = useState(null); // stores the error displayed on the page and provides a function to update it. Starts as null because there is no pre determined error
    const [ loading, setLoading ] = useState(true); // stores the loading state and provides a function to display it. Starts as true because the page needs to load on startup

    useEffect(() => { // runs at startup, fetches and displays the popular movies. Only runs once so it doesn't make an infinite loop
        const loadPopularMovies = async () => { // loadPopularMovies function marked as async
            try { // try to get popular movies
                const popularMovies = await getPopularMovies() // variable that stores the popular movies
                setMovies(popularMovies) // updates the ui to show the popular movies
            } catch (err) { // catches any errors that may occur
                setError("Failed to load movies...") // updates the ui to show the error with text
                console.log(err) // console logs the error
            }
            finally { // finally after try/catch runs
                setLoading(false) // sets the loading state as false
            }
        }

        loadPopularMovies(); // loads the popular movies
    }, []) // nothing in array so the function only runs once

    const handleSearch = async (e) => { // handles the search
        e.preventDefault(); // prevents the default behaviour of the browser so the page doesn't refresh when searching
        if (!searchQuery.trim()) return // if the search is just a bunch of spaces it clears the search field
        if (loading) return // doesn't allow the search if the page is already loading

        setLoading(true); // sets loading state to true
        try { // try to search for movies
            const searchResults = await searchMovies(searchQuery) // searchResults component that waits for searchMovies component to run passing what the user typed into the field
            setMovies(searchResults) // updates the movie list ui with the search results
            setError(null) // marks that there are no errors
        } catch (err) { // catches any errors
            console.log(err) // console logs the errors
            setError("Failed to search movies...") // updates the ui to show the error with text
        } finally { // finally after the try/catch runs
            setLoading(false) // sets loading state to false
        }
    }

    return ( // HTML return
        <div className="home"> {/* home screen div */}
            <form onSubmit={handleSearch} className="search-form"> {/* form element that acts as search bar and runs handleSearch function */}
                <input // search bar
                    type="text" // sets search bar as "text" type
                    placeholder="Search for movies..." // shows default text in search bar
                    className="search-input" // class name of search input for CSS
                    value={searchQuery} // sets the input's value to the current search query
                    onChange={(e) => setSearchQuery(e.target.value)} // when submitting the form it updates the searchQuery with the value set in the input
                />
                <button type="submit" className="search-button">Search</button> {/* search button */}
            </form>

            {error && <div className="error-message">{error}</div>} {/* error message that shows if the error state is set */}

            {loading ? ( // loading message that shows is loading state is set to true
            <div className="loading">Loading...</div> // loading div
            ) : ( // if not loading then show this
                <div className="movies-grid"> {/* movie grid div */}
                    {movies.map((movie) => ( // creates a dynamic list of movies (going through each movie in favourites array) and passes that movie object into MovieCard
                        <MovieCard // renders a movie card of each movie
                            movie={movie} // extracts and stores the current movie in the movie variable
                            key={movie.id} // gives each card a stable key
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home // default export of home page